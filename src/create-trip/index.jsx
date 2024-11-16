import React, { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

function CreateTrip() {
  const [place, setplace] = useState();
  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <h2 className="font-bold text-3xl">
        Tell us your travel preferences 🏕️🌴
      </h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>

      <div className="mt-20 flex flex-col gap-10">
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is Destination of choice?
          </h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setplace(v);
                console.log(v);
              },
            }}
          />
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">
          How many days are you planning for your trip?
          </h2>
          <input placeholder="Ex. 3" type="number" className="border border-gray-300 p-2 rounded w-full bg-white"/>
        </div>
      </div>
    </div>
  );
}

export default CreateTrip;
