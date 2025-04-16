import React from 'react';

function PlacesToVisit({ trip }) {
  const itinerary = trip.TripData?.itinerary || {};

  // Sort days like day1, day2, ...
  const sortedDays = Object.keys(itinerary).sort((a, b) => {
    const dayA = parseInt(a.replace('day', ''));
    const dayB = parseInt(b.replace('day', ''));
    return dayA - dayB;
  });

  return (
    <div className='p-6'>
      <h2 className='font-bold text-2xl mb-4'>🗺️ Places To Visit</h2>

      {sortedDays.map((day, index) => (
        <div key={index} className='mb-6 p-4 rounded-lg bg-white shadow-md'>
          <h3 className='text-xl font-bold mb-4 capitalize text-black '>{day}</h3>
          
          <ul className='flex flex-wrap gap-4'>
            {itinerary[day].map((item, idx) => {
              const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                item.placeName
              )}`;

              return (
                <a
                  href={mapLink}
                  target='_blank'
                  rel='noopener noreferrer'
                  key={idx}
                  className='block w-80'
                >
                  <li className='flex flex-col gap-2 p-4 border rounded-lg hover:shadow-lg transition duration-200 cursor-pointer'>
                    {/* Image */}
                    <div className='w-full h-40 bg-gray-200 rounded-md overflow-hidden'>
                      <img
                        src="/landing.png"
                        alt={item.placeName}
                        className='w-full h-full object-cover'
                      />
                    </div>

                    {/* Info */}
                    <div className='text-left text-sm text-gray-700'>
                      <p className='text-base font-bold text-black'>
                        📍 {item.placeName}
                      </p>
                      <p><strong>🕐 Best Time:</strong> {item.bestTimeToVisit}</p>
                      <p><strong>💬 Description:</strong> {item.description}</p>
                      <p><strong>💰 Cost:</strong> {item.estimatedCost}</p>
                      <p><strong>⏳ Duration:</strong> {item.suggestedDuration}</p>
                      <p><strong>🎒 Tips:</strong> {item.tips}</p>
                    </div>
                  </li>
                </a>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default PlacesToVisit;
