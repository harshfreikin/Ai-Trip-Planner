import React, { useEffect, useState } from 'react';
import { GetPlaceDetails, getPhotoUrl } from "@/services/GlobalApi";

function PlacesToVisit({ trip }) {
  const itinerary = trip.TripData?.itinerary || {};
  const [photoUrls, setPhotoUrls] = useState({});

  const sortedDays = Object.keys(itinerary).sort((a, b) => {
    const dayA = parseInt(a.replace('day', ''));
    const dayB = parseInt(b.replace('day', ''));
    return dayA - dayB;
  });

  useEffect(() => {
    const fetchPlacePhotos = async () => {
      const newPhotoUrls = {};

      for (const day of sortedDays) {
        for (const item of itinerary[day]) {
          const data = { textQuery: item.placeName };
          const response = await GetPlaceDetails(data);
          const photos = response?.data?.places?.[0]?.photos;

          if (photos && photos.length > 0) {
            const photoName = photos[0].name;
            newPhotoUrls[item.placeName] = getPhotoUrl(photoName);
          } else {
            newPhotoUrls[item.placeName] = "/default_placeholder.jpg";
          }
        }
      }

      setPhotoUrls(newPhotoUrls);
    };

    fetchPlacePhotos();
  }, [itinerary, sortedDays]);

  return (
    <div className='p-6'>
      <h2 className='font-bold text-2xl mb-4'>🗺️ Places To Visit</h2>

      {sortedDays.map((day, index) => (
        <div key={index} className='mb-6 p-4 rounded-lg bg-white shadow-md'>
          <h3 className='text-xl font-bold mb-4 capitalize text-black'>{day}</h3>

          <ul className='flex flex-wrap gap-4'>
            {itinerary[day].map((item, idx) => {
              const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.placeName)}`;

              return (
                <a
                  href={mapLink}
                  target='_blank'
                  rel='noopener noreferrer'
                  key={idx}
                  className='block w-80'
                >
                  <li className='flex flex-col gap-2 p-4 border rounded-lg hover:shadow-lg transition duration-200 cursor-pointer h-[420px] overflow-hidden'>
                    {/* Image */}
                    <div className='w-full h-40 bg-gray-200 rounded-md overflow-hidden'>
                      <img
                        src={photoUrls[item.placeName] || "/No Image.jpg"}
                        alt={item.placeName}
                        className='w-full h-full object-cover'
                      />
                    </div>

                    {/* Info */}
                    <div className='text-left text-xs text-gray-700 flex flex-col gap-1 overflow-hidden'>
                      <h1 className=' text-xl font-bold text-black truncate'>
                        📍 {item.placeName}
                      </h1>
                      <p><strong>🕐 Best Time:</strong> {item.bestTimeToVisit}</p>
                      <p className='line-clamp-2'><strong>💬Description:</strong> {item.description}</p>
                      <p><strong>💰Cost:</strong> {item.estimatedCost}</p>
                      <p><strong>⏳Duration:</strong> {item.suggestedDuration}</p>
                      <p className='line-clamp-2'><strong>🎒Tips:</strong> {item.tips}</p>
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
