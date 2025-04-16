export const SelectTravelesList=[
    {
        id:1,
        title:'Just Me',
        desc:'A sole Traveles in exploration',
        icon:'✈️',
        people:'1',
       },
       {
        id:2,
        title:'A Couple',
        desc:'Two Traveles in Tandem',
        icon:'🥂',
        people:'2',
       },
       {
        id:3,
        title:'Family',
        desc:'A group of fun loving adv',
        icon:'🏡',
        people:'3 to 5',
       },
       {
        id:4,
        title:'Friends',
        desc:'A bunch of thrill-seekes',
        icon:'⛵',
        people:'5 to 10',
       },
]

export const SelectBudgetOptions=[
    {
        id:1,
        title:'Cheap',
        desc:'Stay conscious of costs',
        icon:'💵',
    },
    {
        id:2,
        title:'Moderate',
        desc:'Keep cost on the average side',
        icon:'💰',
    },
    {
        id:3,
        title:'Luxury',
        desc:'Dont worry about cost',
        icon:'💸',
    },
    
]

//export const AI_PROMPT='Generate Travel Plan for Location : {Location}'
export const AI_PROMPT = `Generate a detailed travel plan in JSON format. Include multiple hotel recommendations and a daily itinerary.

Location: {location}
Duration: {totalDays} days
Travelers: {traveler}
Budget Level: {budget}

Return the response in this exact JSON structure:
{
  "tripDetails": {
    "location": string,
    "duration": string,
    "travelers": number,
    "budget": string
  },
  "hotels": [
    {
      "name": string,
      "address": string,
      "estimatedCost": string,
      "description": string,
      "rating": string
    },
    // Include at least 3-4 hotel options matching the budget level
  ],
  "itinerary": {
    "day1": [
      {
        "placeName": string,
        "description": string,
        "estimatedCost": string,
        "suggestedDuration": string,
        "bestTimeToVisit": string,
        "tips": string
      }
    ]
    // Repeat for each day
  },
  "travelTips": [
    string  // Include 4-5 relevant travel tips
  ]
}

Important requirements:
1. Always include at least 3-4 hotel options that match the specified budget level
2. Each hotel must have complete details including name, address, cost, and description
3. Format all costs in the local currency
4. Ensure all JSON fields are properly formatted and valid
5. Make recommendations appropriate for the number of travelers and budget level`;
