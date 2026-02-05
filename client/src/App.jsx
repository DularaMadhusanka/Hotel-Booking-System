import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Footer from './components/Footer'
import AllRooms from './pages/AllRooms'
import RoomDetails from './pages/RoomDetails'
import MyBookings from './pages/MyBookings'
import Experience from './pages/Experience'
import About from './pages/About'
import HotelReg from './components/HotelReg'
import Layout from './pages/hotelOwner/Layout'
import Dashboard from './pages/hotelOwner/Dashboard'
import AddRoom from './pages/hotelOwner/AddRoom'
import ListRoom from './pages/hotelOwner/ListRoom' 
import Chatbot from './components/Chatbot'
import { Toaster} from  'react-hot-toast'
import { useAppContext } from './context/AppContext'

const App = () => {

  const location = useLocation();
  const isOwnerPath = location.pathname.includes("owner");
  const {showHotelReg} =useAppContext();
  return (
    <div>
      <Toaster/>
      {!isOwnerPath && <Navbar />}
      {showHotelReg && <HotelReg/>}
      <div className='min-h-[70vh]'>

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/rooms' element={<AllRooms />} />
          <Route path='/rooms/:id' element={<RoomDetails />} />
          <Route path='/my-bookings' element={<MyBookings />} />
          <Route path='/experience' element={<Experience />} />
          <Route path='/about' element={<About />} />

          {/* Owner routes */}
          <Route path='/owner' element={<Layout/>}>
            <Route index element={<Dashboard />} />
            <Route path='add-room' element={<AddRoom />} />
            <Route path='list-room' element={<ListRoom />} />
          </Route>
        </Routes>

      </div>
      {!isOwnerPath && <Footer />}
      {/* AI Chatbot - visible on all pages */}
      <Chatbot />
    </div>
  )
}

export default App
