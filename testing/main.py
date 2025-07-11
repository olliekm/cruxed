from bs4 import BeautifulSoup
import time
import random
import requests
from playwright.sync_api import sync_playwright

"""
Scraping product information from mec.com
"""


HEADERS = {
    "User-Agent": "Mozilla/5.0 (compatible; ClimbPriceBot/1.0)"
}

BASE_URL = "https://www.mec.ca/en/products/climbing/climbing-footwear"


def fetch_with_playwright(url):
    with sync_playwright() as pw:
        browser = pw.chromium.launch(headless=True)
        page    = browser.new_page()
        page.goto(url, wait_until="networkidle")
        html = page.content()
        browser.close()
        return html

def fetch_html(url):
    resp = requests.get(url, headers=HEADERS, timeout=10)
    resp.raise_for_status()
    return resp.text

def parse_all_listings(html):
    soup = BeautifulSoup(html, "html.parser")
    listings = []

    # 1) grab every <li> whose class includes "searchHitsItem"
    ## make sure inner article is not class PTT_wrapper__jNoBS
    for li in soup.select("li[class*='searchHitsItem']"):
        # 2) title + relative href    
        article = li.find("article")
        # if this <article> has the PTT class, skip it
        if article and "PTT_wrapper__jNoBS" in article.get("class", []):
            continue
        
        a_title = li.select_one("a[class*='Hit_hitTitle']")
        title = a_title.get_text(strip=True) if a_title else None
        href  = a_title["href"]         if a_title else None
        listings.append(href)
    return listings

def parse_products_from_listings(listings):
    products = []
    for href in listings:
        if href is None:
            continue
        html = fetch_with_playwright("https://www.mec.ca" + href)
        soup = BeautifulSoup(html, "html.parser")
        a_title = soup.select_one("h1[class*='Product_productName__tJ1B2 Heading_heading3__cn__v']")
        title = a_title.get_text(strip=True) if a_title else None
        a_brand = soup.select_one("div[class*='Product_brandURL__RcEW_'] > a")
        a_brand = a_brand.get_text(strip=True) if a_title else None
        price = soup.select_one("strong[class*='ProductPrice_actualPrice__s6LXi']")
        price = price.get_text(strip=True) if price else None
        if price:
            price = price.replace("$", "").replace(",", "")
        else:
            price = None
        print(price)
        select_tag = soup.find("select", id="pdpSizeSelect")
        size_options = [opt for opt in select_tag.find_all("option") if not opt.has_attr("disabled")]
        available_sizes = []
        for opt in size_options:
            val = opt.get("value")
            text = opt.get_text(strip=True)
            # skip the “Select size” placeholder which often has value="0"
            if val and val != "0":
                available_sizes.append(text)
                # 3) fetch each listing
        product = {
            "name": title,
            "href": href,
            "price": price, 
            "available_sizes": available_sizes
        }
        products.append(product)
    return products


if __name__ == "__main__":
    html     = fetch_html(BASE_URL)
    listings = parse_all_listings(html)
    products = parse_products_from_listings(listings)
    print(f"Found {len(products)} products.")
    for product in products:
        print(product)


