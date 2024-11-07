export const SelectTravelsList = [
    {
        id:1,
        title:'Just Me',
        desc:'A sole traveles in exploration',
        icon:'✈',
        people:'1'
    },
    {
        id:2,
        title:'A Couple',
        desc:'Two traveles in tandem',
        icon:'🥂',
        people:'2 people'
    },
    {
        id:3,
        title:'Family',
        desc:'A group of fun loving adventurers',
        icon:'🏡',
        people:'3 to 5 people',

    },
    {
        id:4,
        title:'Friends',
        desc:'A bunch of thrill-seekes',
        icon:'⛵',
        people:'More than 5 people'
    }
]

export const SelectBudgetOptions = [
    {
        id:1,
        title:'Cheap',
        desc:'Stay conscious of costs',
        icon:'💵'
    },
    {
        id:2,
        title:'Moderate',
        desc:'Keep cost on the average side',
        icon:'💰'
    },
    {
        id:3,
        title:'Luxury',
        desc:"Don't worry about cost",
        icon:'💳'
    }
]

export const AI_PROMPT = 'Generate Travel Plan for Location: {location}, for {totaldays} Days for {traveler} with a {budget} budget, Give me a Hotels options list with Hotel name, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary in the array form with place name, Place Details, Place image url, time-slot, Geo Coordinates, ticket pricing, time to travel each of the location for {totaldays} days with each day plan with best time to visit in JSON format.'