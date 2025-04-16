import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseModalities: [],
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: `Generate Travel Plan for Location: Las Vegas, for 3 Days for Couple with a cheap budget, Give me a Hotels options list with Hotel Names, Hotel address, price, hotel image URL, geo coordinates, ratings, descriptions and suggest itinerary with place Name, place Details, place Image URL, geo coordinates, ticket Pricing, time travel each of the location for 3 days with each day plan with best time to visit in JSON format.\n`,
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: `\`\`\`json
{
  "tripDetails": {
    "location": "Las Vegas, Nevada",
    "duration": "3 Days",
    "travelers": "Couple",
    "budget": "Cheap"
  },
  "hotels": [
    {
      "hotelName": "Travelodge by Wyndham Las Vegas Center Strip",
      "hotelAddress": "3755 Las Vegas Blvd S, Las Vegas, NV 89109, USA",
      "price": "Check Booking.com/Expedia", 
      "hotelImageUrl": "PLACEHOLDER_IMAGE_URL_1",
      "geoCoordinates": { "latitude": 36.1227, "longitude": -115.1766 },
      "rating": "Check Booking Sites",
      "description": "Budget-friendly hotel near the Strip.  Basic amenities."
    },
    {
      "hotelName": "Motel 6 Las Vegas Strip South",
      "hotelAddress": "4360 Paradise Rd, Las Vegas, NV 89169, USA",
      "price": "Check Booking.com/Expedia",
      "hotelImageUrl": "PLACEHOLDER_IMAGE_URL_2",
      "geoCoordinates": { "latitude": 36.1042, "longitude": -115.1545 },
      "rating": "Check Booking Sites",
      "description": "No-frills motel south of the Strip.  Basic but affordable."
    },
    {
      "hotelName": "Circus Circus Hotel & Casino",
      "hotelAddress": "2880 Las Vegas Blvd S, Las Vegas, NV 89109, USA",
      "price": "Check Booking.com/Expedia",
      "hotelImageUrl": "PLACEHOLDER_IMAGE_URL_3",
      "geoCoordinates": { "latitude": 36.1268, "longitude": -115.1746 },
      "rating": "Check Booking Sites",
      "description": "Offers affordable rooms and a circus theme."
    }
  ],
  "itinerary": {
    "day1": [
      {
        "placeName": "Fremont Street Experience",
        "placeDetails": "Free outdoor pedestrian mall with light shows and street performers.",
        "placeImageUrl": "PLACEHOLDER_IMAGE_URL_4",
        "geoCoordinates": { "latitude": 36.1673, "longitude": -115.1400 },
        "ticketPricing": "Free (food/drinks extra)",
        "timeToTravel": "20-30 min by bus/rideshare from most hotels",
        "bestTime": "Evening for the Viva Vision light show"
      }
    ],
    "day2": [
      {
        "placeName": "Strip Walking Tour",
        "placeDetails": "Walk the Strip, see the casinos and fountains. Utilize free trams.",
        "placeImageUrl": "PLACEHOLDER_IMAGE_URL_5",
        "geoCoordinates": { "latitude": 36.11, "longitude": -115.17 }, // Approximate
        "ticketPricing": "Free (unless you enter attractions)",
        "timeToTravel": "Half day",
        "bestTime": "Daytime to avoid crowds and heat (consider late afternoon/evening)"
      },
      {
        "placeName": "Bellagio Fountains",
        "placeDetails": "Free water, light, and music show.",
        "placeImageUrl": "PLACEHOLDER_IMAGE_URL_6",
        "geoCoordinates": { "latitude": 36.1146, "longitude": -115.1728 },
        "ticketPricing": "Free",
        "timeToTravel": "Easy to get to along the Strip",
        "bestTime": "Evenings for the best light show"
      }
    ],
    "day3": [
      {
        "placeName": "Seven Magic Mountains",
        "placeDetails": "Art installation of colorful stacked boulders (requires transportation).",
        "placeImageUrl": "PLACEHOLDER_IMAGE_URL_7",
        "geoCoordinates": { "latitude": 35.9858, "longitude": -115.0293 },
        "ticketPricing": "Free",
        "timeToTravel": "30-45 min by car (rideshare is expensive)",
        "bestTime": "Morning or late afternoon to avoid heat"
      },
      {
        "placeName": "Free Activities Downtown",
        "placeDetails": "Explore the Container Park or explore the older parts of Downtown.",
        "placeImageUrl": "PLACEHOLDER_IMAGE_URL_8",
        "geoCoordinates": { "latitude": 36.16, "longitude": -115.14 }, // Approximate
        "ticketPricing": "Free",
        "timeToTravel": "20-30 min by bus/rideshare from the Strip",
        "bestTime": "Anytime, but less crowded during the day"
      }
    ]
  }
}
\`\`\``,
        },
      ],
    },
  ],
});
