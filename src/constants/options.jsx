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
        people:'3 to 5 people',
       },
       {
        id:4,
        title:'Friends',
        desc:'A bunch of thrill-seekes',
        icon:'⛵',
        people:'5 to 10 people',
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
export const AI_PROMPT = `
Generate a travel plan with the following details:

Location: {location}
Duration: {totalDays} days
Traveler Type: {traveler}
Budget: {budget}

Include a daily itinerary with recommended places, activities, accommodations, food suggestions, estimated costs, and travel tips. Make sure it's engaging and tailored to the traveler's type and budget.
`;
