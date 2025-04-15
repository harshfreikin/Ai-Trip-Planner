import React from 'react'

function Hotel(trip) {
  return (
    <div>
      <h2 className='font-bold text-xl mt-5'>Hotel Recommendation</h2>
      <div>
        {trip?.TripData?.accommodation?.hotel?.map((item,index)=>(
            <div>
                <img src="/landing.png" className='rounded-xl' />

            </div>
        ))}
      </div>
    </div>
  )
}

export default Hotel
