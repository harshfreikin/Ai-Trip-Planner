import { Button } from "@/components/ui/button";
import React from "react";
import { IoIosSend } from "react-icons/io";

function InfoSection({ trip }) {
  console.log("Trip passed to InfoSection:", trip);

  return (
    <div>
      <img
        src="/landing.png"
        className="h-[340px] w-full object-cover rounded-xl"
        alt="trip visual"
      />
      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="text-2xl font-bold">
            {trip?.userSelection?.location?.label || "Location not available"}
          </h2>
          <div className="flex gap-5">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              🗓️ {trip.userSelection?.noOfDays} Days
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              💰 {trip.userSelection?.Budget} Budget
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              🥂 No. of Traveler :- {trip.userSelection?.Traveler} People
            </h2>
          </div>
        </div>
        <Button><IoIosSend /></Button>
      </div>
    </div>
  );
}

export default InfoSection;
