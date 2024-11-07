import React from 'react'
import PlaceCardItem from './PlaceCardItem';

const PlacesToVisit = ({trip}) => {

    if (!trip || !trip.tripData || !trip.tripData.itinerary) {
        return <div>Loading...</div>; 
    }
  return (
    <div className='mt-5'>
        <h2 className='font-bold text-xl'>Places to Visit</h2>
        <div>
            {trip.tripData.itinerary.map((item,index)=>{
                return(
                    <div className='mt-5'>
                        <h2 className='text-lg font-medium'>Day {item?.day}</h2>
                        <div className='grid md:grid-cols-2 gap-5 gap-y-1'>
                        {item.plan.map((place,index)=>(
                            <div className='my-3'>
                                <h2 className='font-medium text-sm text-orange-600'>{place?.["time-slot"]}</h2>
                                <PlaceCardItem place={place} />
                            </div>
                        ))}
                        </div>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default PlacesToVisit