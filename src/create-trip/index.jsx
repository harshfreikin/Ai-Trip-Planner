import { Button } from "@/components/ui/button";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelesList,
} from "@/constants/options";
import { chatSession } from "@/services/AiModel";
import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/services/firebaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function CreateTrip() {
  const [place, setplace] = useState();
  const [formData, setFormData] = useState({});
  const [openDailog, setOpenDailog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log("Form Data:", formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => {
      console.log("Login success:", codeResp);
      //localStorage.setItem("user", JSON.stringify(codeResp));
      //setOpenDailog(false);
      GetUserProfile(codeResp);
    },
    onError: (error) => console.log("Login error:", error),
  });

  const onGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDailog(true);
      return;
    }

    if (
      !formData?.location ||
      !formData?.noOfDays ||
      !formData?.Budget ||
      !formData?.Traveler
    ) {
      toast("Please fill in all fields before generating the trip.");
      return;
    }
    setLoading(true);

    const FINAL_PROMT = AI_PROMPT.replace(
      "{location}",
      formData?.location?.label
    )
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.Traveler)
      .replace("{budget}", formData?.Budget);
    const result = await chatSession.sendMessage(FINAL_PROMT);
    console.log("--", result?.response?.text());
    setLoading(false);
    SaveAiTrip(result?.response?.text());

    // try {
    //   const result = await chatSession.sendMessage(FINAL_PROMT);
    //   const text = await result?.response?.text();
    //   console.log("AI Response:", text);
    // } catch (err) {
    //   console.error("Error generating trip:", err);
    //   toast("Something went wrong while generating the trip!");
    // }
  };

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDailog(false);
        onGenerateTrip();
      })
      .catch((err) => {
        console.error("Failed to fetch user profile:", err);
      });
  };

  const SaveAiTrip = async (TripData) => {
    try {
      setLoading(true);
      const userStr = localStorage.getItem("user");
      
      if (!userStr) {
        toast.error("User data not found. Please sign in again.");
        setOpenDailog(true);
        return;
      }
      
      const user = JSON.parse(userStr);
      
      if (!user || !user.email) {
        toast.error("User email not found. Please sign in again.");
        setOpenDailog(true);
        return;
      }
      
      const docId = Date.now().toString();

      await setDoc(doc(db, "Ai-Trip", docId), {
        userSelection: formData,
        TripData: JSON.parse(TripData),
        userEmail: user.email,
        id: docId,
      });
      
      setLoading(false);
      navigate('/view-trip/'+docId);
    } catch (error) {
      console.error("Error saving trip:", error);
      toast.error("Failed to save trip. Please try again.");
      setLoading(false);
    }
  };

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
              value: place,
              onChange: (v) => {
                setplace(v);
                handleInputChange("location", v); // full object for label access
              },
            }}
          />
        </div>
        <div>
          <h2 htmlFor="trip-days" className=" text-xl my-3 font-medium">
            How many days are you planning for your trip?
          </h2>
          <input
            id="trip-days"
            placeholder="Ex. 3"
            type="number"
            className="border border-gray-300 p-2 rounded w-full bg-white"
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          />
        </div>
      </div>

      <br />
      <br />

      <div>
        <h2 className="text-xl my-3 font-medium">What is Your Budget?</h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectBudgetOptions.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("Budget", item.title)}
              className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${
                formData?.Budget === item.title && "shadow-lg border-black"
              }`}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-gray-500 text-sm">{item.desc}</h2>
            </div>
          ))}
        </div>

        <br />
        <br />

        <div>
          <h2 className="text-xl my-3 font-medium">
            Who do you plan on traveling with on your next adventure?
          </h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectTravelesList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("Traveler", item.people)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${
                  formData?.Traveler === item.people && "shadow-lg border-black"
                }`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-gray-500 text-sm">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="my-10 justify-end flex">
        <Button disabled={loading} onClick={onGenerateTrip}>
          {loading ? (
            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
          ) : (
            "Generate Trip"
          )}
        </Button>
      </div>
      <br></br>

      <Dialog open={openDailog} onOpenChange={setOpenDailog}>
        <DialogContent className="[&>button]:ring-0 [&>button]:ring-offset-0">
          <DialogHeader>
            <DialogTitle className="sr-only">Google Sign In</DialogTitle>{" "}
            {/* Hidden but required */}
            <DialogDescription asChild>
              <div>
                <img src="/logo.svg" alt="logo" />
                <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>
                <span>
                  Sign in to the App with Google authentication securely
                </span>

                <Button
                  onClick={() => login()}
                  className="w-full mt-5 flex gap-4 items-center"
                >
                  <FcGoogle className="h-7 w-7" />
                  Sign In With Google
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;
