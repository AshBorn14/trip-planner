import { Button } from '@/components/ui/button'
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi'
import React, { useEffect, useState } from 'react'
import { IoIosSend } from "react-icons/io"


const InfoSection = ({tripData}) => {
  const [photoUrl, setPhotoUrl] = useState()
  useEffect(()=>{
    tripData&&GetPlacePhoto()
  },[tripData])

  const GetPlacePhoto=async()=>{
    const data = {
      textQuery:tripData?.userSelection?.location?.label
    }

    const result = await GetPlaceDetails(data).then(res=>{
      const photoUrl = PHOTO_REF_URL.replace('{NAME}',res.data.places[0].photos[3].name)
      setPhotoUrl(photoUrl)
    })
  }

  return (
    <div>
        <img src={photoUrl?photoUrl:"/placeholder.jpg"} className='h-[350px] object-cover w-full  rounded-xl' />
        <div className='flex justify-between items-center'>
            <div className='my-5 flex flex-col gap-2'>
                <h2 className='font-bold text-2xl'>{tripData?.userSelection?.location?.label}</h2>
                <div className='flex flex-col gap-5 md:flex-row lg:flex-row'>
                    <h2 className='p-1 px-3 bg-gray-300 rounded-full text-gray-700 text-sm'>📆 {tripData?.userSelection?.noOfDays} Days</h2>
                    <h2 className='p-1 px-3 bg-gray-300 rounded-full text-gray-700 text-sm'>💰 {tripData?.userSelection?.budget} Budget</h2>
                    <h2 className='p-1 px-3 bg-gray-300 rounded-full text-gray-700 text-sm'>🧳 No. of Travelers: {tripData?.userSelection?.traveler}</h2>
                </div>
            </div>
            <Button><IoIosSend /></Button>
        </div>
    </div>
  )
}

export default InfoSection