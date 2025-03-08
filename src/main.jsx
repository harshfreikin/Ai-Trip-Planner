import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateTrip from "./create-trip/index.jsx";
import Header from "./components/ui/custom/Header";
import { Toaster } from "sonner";


const router = createBrowserRouter([
  {
    path: "/", // corrected from 'patch' to 'path'
    element: <App />,
  },
  {
    path: "/create-trip", // corrected 'createTrip' to 'CreateTrip'
    element: <CreateTrip />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Header />
    <Toaster/>
    <RouterProvider router={router} />{" "}
    {/* corrected from 'route' to 'router' */}
  </StrictMode>
);
