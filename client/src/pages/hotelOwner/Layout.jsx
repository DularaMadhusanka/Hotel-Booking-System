import React, { useEffect } from 'react'
import Navbar from '../../components/hotelOwner/Navbar'
import Sidebar from '../../components/hotelOwner/Sidebar'
import { Outlet } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'

const Layout = () => {
  useEffect(()=>{
    if(!isOwner){
      Navigate('/')
    }
  },[isOwner]) 


  const {isOwner} =useAppContext()
  return (
    <div className='flex flex-col h-screen'>
        <Navbar/>
        <div className='flex h-full'>
            <Sidebar/>
            <div className='flex-1 p-4 pt-10 md:px-10 h-full'>   {/* FIXED HERE */}
                <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default Layout;
