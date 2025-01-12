import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className='flex flex-col items-center text-center md:mx-56 gap-9 h-screen'>
        <h1 className='font-extrabold text-[20px] md:text-[50px] leading-relaxed md:text-center mt-16'>
            <span className='text-[#f56551]'>Discover Your Next Adventure with AI:</span> Personalized Itineraries at Your Fingertips</h1>
        <p className='text-gray-500 text-xl text-center'>our personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.</p>
        <Link to="/create-trip">
          <Button className='p-6'>Get Started, Its free</Button>
        </Link>
    </div>
  )
}

export default Hero