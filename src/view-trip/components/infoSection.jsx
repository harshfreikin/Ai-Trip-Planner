import { Button } from "@/components/ui/button";
import { GetPlaceDetails, getPhotoUrl } from "@/services/GlobalApi"; // use getPhotoUrl helper
import React, { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";

function InfoSection({ trip }) {
  console.log("Trip passed to InfoSection:", trip);

  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
    if (trip) {
      getPlacePhoto();
    }
  }, [trip]);

  const getPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label,
    };

    try {
      const response = await GetPlaceDetails(data);
      const photos = response?.data?.places?.[0]?.photos;
      
      if (photos && photos.length > 0) {
        const photoName = photos[0].name; // use the first photo safely
        const url = getPhotoUrl(photoName);
        setPhotoUrl(url);
      } 
    } catch (error) {
      console.error("Error fetching place photo:", error);
      setPhotoUrl(null);
    }
  };

  return (
    <div>
      <img
        src={photoUrl || "/No Image.jpg"}
        className="h-[340px] w-full object-cover rounded-xl"
        alt="trip visual"
        onError={(e) => { e.target.onerror = null; e.target.src = "/No Image.jpg"; }}
      />
      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="text-2xl font-bold">
            {trip?.userSelection?.location?.label}
          </h2>
          <div className="flex gap-5">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              🗓️ {trip?.userSelection?.noOfDays} Days
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              💰 {trip?.userSelection?.Budget} Budget
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              🥂 No. of Travelers: {trip?.userSelection?.Traveler} People
            </h2>
          </div>
        </div>
        <Button><IoIosSend /></Button>
      </div>
    </div>
  );
}

export default InfoSection;
