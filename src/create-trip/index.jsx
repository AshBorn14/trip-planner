import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AI_PROMPT, SelectBudgetOptions, SelectTravelsList } from '@/constants/options'
import { chatSession } from '@/service/AIModel'
import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { toast } from 'sonner'
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc"
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/service/firebaseConfig'
import { useNavigate } from 'react-router-dom'

const CreateTrip = () => {

  const [place, setPlace] = useState()
  const [formData, setFormData] = useState([])
  const [openDialog, setOpenDailog] = useState()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleInputChange=(name,value)=>{
    setFormData({
      ...formData,
      [name]:value
    })
  }

  useEffect(()=>{
    console.log(formData)
  },[formData])

  const login = useGoogleLogin({
    onSuccess:(codeResp)=>{
      GetUserProfile(codeResp)
    },
    onError:(error)=>console.log(error)
  })

  const generateTrip =async()=>{

    const user = localStorage.getItem('user')
    if(!user){
      setOpenDailog(true)
      return
    }

    if(formData.noOfDays > 5 && !formData?.location || !formData?.budget || !formData?.traveler){
      toast("please fill all details carefully and correctly")
      return
    }
    setLoading(true)
    const FINAL_PROMPT = AI_PROMPT
    .replace('{location}',formData?.location?.label)
    .replace('{totaldays}', formData?.noOfDays)
    .replace('{traveler}',formData?.traveler)
    .replace('{budget}',formData?.budget)
    .replace('{totaldays}', formData?.noOfDays)

    const result = await chatSession.sendMessage(FINAL_PROMPT)
    setLoading(false)
    saveAiTrip(result?.response?.text())

  }

  const saveAiTrip=async(tripData)=>{
    setLoading(true)
    const user = JSON.parse(localStorage.getItem('user'))
    const docId = Date.now().toString()
    await setDoc(doc(db, "AITrips",docId),{
      userSelection:formData,
      tripData:JSON.parse(tripData),
      userEmail:user?.email,
      id:docId

    })
    setLoading(false)
    navigate('/view-trip/'+docId)
  }

  const GetUserProfile = (tokenInfo)=>{
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,{
      headers:{
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'application/json'
      }
    }).then((res)=>{
      localStorage.setItem('user', JSON.stringify(res.data));
      setOpenDailog(false)

      console.log(res)
      generateTrip()
    })
  }

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-32 px-5 my-10'>
      <h2 className='font-bold text-3xl'>Tell us your travel preferences 🏕️🌴</h2>
      <p className='mt-3 text-gray-500 text-xl'>Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.</p>
      <div className='mt-20 flex flex-col gap-10'>
        <div>
          <h2 className='text-xl my-3 font-medium'>What is destination of choice?</h2>
          <GooglePlacesAutocomplete 
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY} 
            selectProps={{
              place,
              onChange:(v)=>{setPlace(v); handleInputChange('location',v)}
            }}
            />
        </div>
        <div >
          <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip?</h2>
          <Input  placeholder="Enter in numbers" type="number" onChange={(e)=>handleInputChange('noOfDays',e.target.value)}/>

        </div>
        <div>
          <h2 className='text-xl my-3 font-medium'>What is Your Budget?</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5'>
            { SelectBudgetOptions.map((item,index)=>(
              <div key={index} onClick={(e)=>{handleInputChange('budget',item.title)}} className={`p-4 cursor-pointer border rounded-lg hover:shadow-lg flex flex-col gap-2 ${formData.budget==item.title && 'shadow-lg border-black'}`}>
                <h2 className='text-5xl'>{item.icon}</h2>
                <h2 className='font-bold text-xl'>{item.title}</h2>
                <h2 className='text-md text-gray-500'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className='text-xl my-3 font-medium'>Who do you plan on traveling with on your next adventure?</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5'>
            { SelectTravelsList.map((item,index)=>(
              <div key={index} onClick={()=>{handleInputChange('traveler',item.people)}} className={`p-5 cursor-pointer border rounded-lg hover:shadow-lg flex flex-col gap-2 ${formData?.traveler==item.people && 'shadow-lg border-black'}`}>
                <h2 className='text-5xl'>{item.icon}</h2>
                <h2 className='font-bold text-xl'>{item.title}</h2>
                <h2 className='text-md text-gray-500'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
        
      </div>
        <div className='mt-5 text-right'>
          <Button onClick={generateTrip} className='p-6' disabled={loading}>
            {loading ? <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin'/>
              : "Generate Trip Plan"
            }
            </Button>
        </div>
        <Dialog open={openDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogDescription>
                <img src="/logo.svg" />
                <h2 className='font-bold text-lg mt-7'>Sign In with Google</h2>
                <p>sign in to the app with Google authentication securely</p> 
                <Button disabled={loading} className="w-full mt-5 flex gap-4 items-center" onClick={login}>
                  <FcGoogle className='h-7 w-7'/>Sign In With Google
                </Button>
                
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

    </div>
  )
}

export default CreateTrip