import React from 'react'
import { Link } from 'react-router-dom'
import HotelCardItem from './HotelCardItem'

const Hotels = ({trip}) => {
  return (
    <div>
        <h2 className='font-bold text-xl mt-5'>Hotel Recommedation</h2>

        <div className='grid grid-cols-2 md:grid-col-3 lg:grid-cols-4 gap-5'>
            {trip?.tripData?.hotel_options.map((hotel,index)=>{
                return (
                    <HotelCardItem hotel={hotel} />
                )
                
            })}
        </div>
    </div>
  )
}

export default Hotels