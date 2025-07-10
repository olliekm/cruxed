import React from 'react'
import ShoeListing from '@/components/ShoeListing'

function page() {
  return (
    <div className='p-4 space-y-4'>
      <ShoeListing name={'Scarpa Drago LV'} lowestPrice={"209.95"} outlets={['MEC', 'REI', 'Climb Smart Shop']} />
      <ShoeListing name={'Scarpa Instinct VSR LV'} lowestPrice={"220.00"} outlets={['MEC', 'REI', 'Climb Smart Shop']} />
      <ShoeListing name={'Scarpa Origin VS'} lowestPrice={"164.99"} outlets={['MEC', 'REI', 'Climb Smart Shop']} />

      <ShoeListing name={'Scarpa Drago LV'} lowestPrice={120} outlets={['MEC', 'REI', 'Climb Smart Shop']} />

    </div>
  )
}

export default page