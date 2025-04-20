import axios from "axios";

// Base URL for Google Places API
const BASE_URL = 'https://places.googleapis.com/v1/places:searchText';

// Common headers for API calls
const config = {
  headers: {
    'Content-Type': 'application/json', 
    'X-Goog-Api-Key': import.meta.env.VITE_GOOGLE_PLACE_API_KEY,
    'X-Goog-FieldMask': 'places.photos,places.displayName,places.id' 
  }
};

// Function to call Places API
export const GetPlaceDetails = (data) => axios.post(BASE_URL, data, config);

// Function to generate photo URL from photo name
export const getPhotoUrl = (photoName) => 
  `https://places.googleapis.com/v1/${photoName}/media?max_height_px=1000&max_width_px=1000&key=${import.meta.env.VITE_GOOGLE_PLACE_API_KEY}`;
