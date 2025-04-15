import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateTrip from "./create-trip/index.jsx";
import Header from "./components/ui/custom/Header";
import { Toaster } from "sonner";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ViewTrip from "./view-trip/[tripId]/index.jsx";


const router = createBrowserRouter([
  {
    path: "/", // corrected from 'patch' to 'path'
    element: <App />,
  },
  {
    path: "/create-trip", // corrected 'createTrip' to 'CreateTrip'
    element: <CreateTrip />,
  },
  {
    path:'/view-trip/:tripId',
    element:<ViewTrip />
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}> 
    <Header />
    <Toaster/>
    <RouterProvider router={router} />{" "}
    {/* corrected from 'route' to 'router' */}
    </GoogleOAuthProvider>
   
  </StrictMode>
);
