import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc"
import { googleLogout, useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'


function Header() {
  const [openDialog, setOpenDailog] = useState()
  const user = JSON.parse(localStorage.getItem('user'))

  const onLogout = () => {
    console.log("logout")
    googleLogout()
    localStorage.clear()
    window.location.href = '/'
  }

  const login = useGoogleLogin({
    onSuccess:(codeResp)=>{
      GetUserProfile(codeResp)
    },
    onError:(error)=>console.log(error)
  })

  const GetUserProfile = (tokenInfo)=>{
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,{
      headers:{
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'application/json'
      }
    }).then((res)=>{
      localStorage.setItem('user', JSON.stringify(res.data));
      setOpenDailog(false)
      window.location.reload()
    })
  }

  useEffect(()=>{
    console.log(user)
  },[user])

  return (
    <div className='p-2 shadow-sm flex justify-between items-center px-5'>
        <img src="/logo.svg" />
        <div>
          {user ? 
            <div className='flex gap-5 items-center'>
              <a href="https://trip-planner-ekanduent-ashborn14s-projects.vercel.app/create-trip">
                <Button variant="outline" className="rounded-full">Create Trip</Button>
              </a>
              <a href="https://trip-planner-ekanduent-ashborn14s-projects.vercel.app/my-trips">
                <Button variant="outline" className="rounded-full">My Trips</Button>
              </a>
              
              <Popover >
                <PopoverTrigger className="bg-white p-0 rounded-full"><img src={user?.picture} className='w-[35px] h-[35px] rounded-full' /></PopoverTrigger>
                <PopoverContent>
                  <h2 onClick={onLogout} className='hover:underline cursor-pointer'>Logout</h2>
                </PopoverContent>
              </Popover>

            </div>
            : <Button onClick={()=>setOpenDailog(true)}>Sign In</Button> }
            
        </div>
        <Dialog open={openDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogDescription>
                <img src="/logo.svg" />
                <h2 className='font-bold text-lg mt-7'>Sign In with Google</h2>
                <p>sign in to the app with Google authentication securely</p> 
                <Button  className="w-full mt-5 flex gap-4 items-center" onClick={login}>
                  <FcGoogle className='h-7 w-7'/>Sign In With Google
                </Button>
                
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
    </div>
  )
}

export default Header