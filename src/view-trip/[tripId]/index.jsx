import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import InfoSection from "../components/infoSection";
import { db } from "@/services/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import Hotel from "../components/hotel";
import PlacesToVisit from "../components/placesToVisit";
import Footer from "../components/footer";

function ViewTrip() {
  const { tripId } = useParams();
  const [trip,setTrip]=useState([]);
  useEffect(() => {
    tripId && getTripData();
  }, [tripId]);

  /**
   * Used to Get Trip Information From Firebase
   */
  const getTripData = async () => {
    const docRef = doc(db, "Ai-Trip", tripId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document:", docSnap.data());
      setTrip(docSnap.data());
    } else {
      console.log("No Such Document");
      toast("No Trip Found!");
    }
  };
  return <div className="p-10 m:px-20 lg:px-44 xl:px-56">
    {/* Informatio section */}
    <InfoSection trip={trip}/>

    {/* Recommended Hotels */}
    <Hotel trip={trip}/>
    <br></br>

    {/* Daily Plans */}
    <PlacesToVisit trip={trip}/>

    {/* Footer */}
    <Footer trip={trip} />
  </div>;
}

export default ViewTrip;