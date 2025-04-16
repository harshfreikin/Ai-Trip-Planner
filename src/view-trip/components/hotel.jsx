import React from "react";
import { Link } from "react-router-dom";

function Hotel({ trip }) {
  const hotels = trip?.TripData?.hotels || [];

  if (hotels.length === 0) {
    return (
      <div className="mt-10">
        <h2 className="font-bold text-xl mt-5">Hotel Recommendations</h2>
        <p className="text-gray-500 mt-2">No hotel recommendations available for this trip.</p>
      </div>
    );
  }

  return (
    <div className="mt-10">
      <h2 className="font-bold text-2xl mt-5"> 🏨 Hotel Recommendations</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {hotels.map((hotel, index) => (
          <Link 
            key={index}
            to={'https://www.google.com/maps/search/?api=1&query='+hotel?.name+','+hotel?.address}
            target='_blank'
          >
            <div className="hover:scale-110 transition-all cursor-pointer">
              <img src="/landing.png" alt={hotel.name} className="rounded-xl" />
              <div className="my-2 flex flex-col gap-2">
                <h2 className="font-medium">{hotel?.name}</h2>
                <h2 className="text-gray-500 text-xs">📍 {hotel?.address}</h2>
                <h2 className="text-sm">💵 {hotel?.estimatedCost}</h2>
                <h2 className="text-gray-500 text-xs">⭐ {hotel?.rating}</h2>
                <h2 className="text-gray-500 text-xs">📋 {hotel?.description}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Hotel; 