import { Button } from '@/components/ui/button'
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi'
import React, { useEffect, useState } from 'react'
import { FaMapLocationDot } from "react-icons/fa6"
import { Link } from 'react-router-dom'

const PlaceCardItem = ({place}) => {

  const [photoUrl, setPhotoUrl] = useState()
  useEffect(()=>{
    place&&GetPlacePhoto()
  },[place])

  const GetPlacePhoto=async()=>{
    const data = {
      textQuery:place?.name
    }

    const result = await GetPlaceDetails(data).then(res=>{
      const photoUrl = PHOTO_REF_URL.replace('{NAME}',res.data.places[0].photos[0].name)
      setPhotoUrl(photoUrl)
    })
  }

  return (
    <Link to={"https://www.google.com/maps/search/?api=1&query="+place?.name} target="_blank">
        <div className='border rounded-xl p-3 mt-2 flex flex-col gap-5 md:flex-row hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
            <img className="w-100 md:w-[130px] h-[130px] rounded-xl object-cover" src={photoUrl?photoUrl:"/placeholder.jpg"} />
            <div className='pr-3 w-100'>
                <h2 className='font-bold text-lg text-black'>{place?.name}</h2>
                <p className='text-sm text-gray-600'>{place?.details}</p>
                <h2 className='mt-3'>🕖 {place?.time_to_travel}</h2>
            </div>
        </div>
    </Link>
  )
}

export default PlaceCardItem