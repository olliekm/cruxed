import Dither from "@/components/Dither";

export default function Home() {
  return (
    <div className="w-full h-screen bg-neutral-900 flex justify-center items-center">
        <Dither
        className="fixed top-0 left-0 w-full h-full z-0"
        waveColor={[0.5, 0.5, 0.5]}

        disableAnimation={false}

        enableMouseInteraction={true}

        mouseRadius={0.3}

        colorNum={4}

        waveAmplitude={.1}

        waveFrequency={3}

        waveSpeed={0.05}

        />
      <div className="fixed flex flex-col space-y-4">
        <h1 className="text-5xl font-semibold">cruxed</h1>
        <h2>Compare climbing shoe prices across websites</h2>
        <div className="flex shadow-2xl bg-neutral-800 rounded-2xl divide-x-[1px] divide-black">
          <input type="text" placeholder="Search shoes..." className=" p-4 w-96 focus:outline-none" />
          <button className="px-4 cursor-pointer">Search</button>
        </div>
      </div>

    </div>
  );
}
