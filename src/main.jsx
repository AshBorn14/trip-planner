import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CreateTrip from './create-trip/index.jsx'
import Header from './components/custom/Header.jsx'
import { Toaster } from './components/ui/sonner.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Viewtrip from './view-trip/[tripId]/index.jsx'
import MyTrips from './my-trips/index.jsx'


const router  = createBrowserRouter([
  {
    path:"/",
    element:<><Header/><App/></>
  },
  {
    path:"/create-trip",
    element:<><Header/><CreateTrip/></>
  },
  {
    path:"/view-trip/:tripId",
    element:<><Header/><Viewtrip/></>
  },
  {
    path:'/my-trips',
    element:<><Header/><MyTrips/></>
  }

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT}>
      
      <Toaster className="text-6xl" />
      <RouterProvider router={router} />
    </GoogleOAuthProvider>;
  </StrictMode>,
)
