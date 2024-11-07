import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const HotelCardItem = ({hotel}) => {
    const [photoUrl, setPhotoUrl] = useState()
    useEffect(()=>{
        hotel&&GetPlacePhoto()
    },[hotel])

    const GetPlacePhoto=async()=>{
        const data = {
            textQuery:hotel?.name
        }

    const result = await GetPlaceDetails(data).then(res=>{
        const photoUrl = PHOTO_REF_URL.replace('{NAME}',res.data.places[0].photos[1].name)
        setPhotoUrl(photoUrl)
        })
    }

  return (
    <Link to={"https://www.google.com/maps/search/?api=1&query="+hotel?.name+", "+hotel?.address} target="_blank">
        <div className='hover:scale-105 transition-all cursor-pointer'>
            <img src={photoUrl?photoUrl:"/placeholder.jpg"} className='rounded-xl h-[200px] w-full object-cover'/>
                <div className='my-2 flex flex-col gap-2'>
                    <h2 className='font-medium text-black'>{hotel?.name}</h2>
                    <h2 className='text-sm text-gray-500'>📌 {hotel?.address}</h2>
                    <div className=' flex justify-between items-center'>
                        <h2 className='text-xs font-medium '>💸 {hotel?.price}</h2>
                        <p className='text-xs font-medium'>⭐ {hotel.rating.split(" ")[0]}/5</p>

                    </div>

                </div>
        </div>
    </Link>
  )
}

export default HotelCardItem