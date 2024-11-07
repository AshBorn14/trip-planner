import { db } from '@/service/firebaseConfig'
import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import InfoSection from '../components/InfoSection'
import Hotels from '../components/Hotels'
import PlacesToVisit from '../components/PlacesToVisit'
import Footer from '../components/Footer'

const Viewtrip = () => {

    const {tripId} = useParams()
    const [ tripData,setTripData ] = useState()

    const GetTripData = async() =>{
        const docRef = doc(db,'AITrips',tripId)
        const docSnap = await getDoc(docRef)
        if(docSnap.exists()){
            setTripData(docSnap.data())
        }else{
            console.log("No such data")
        }
    }
    useEffect(()=>{
        tripId&&GetTripData()
    },[tripId])


  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
        {/* Information section */}
        <InfoSection tripData={tripData} />
        {/* Recommended Hotels */}
        <Hotels trip={tripData} />
        {/* Daily plan */}
        <PlacesToVisit trip={tripData} />
        {/* Footer */}
        <Footer />
    </div>
  )
}

export default Viewtrip