import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';

const Hero = () => {
  const { navigate } = useAppContext();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);

  const onSearch = (e) => {
    e.preventDefault();
    navigate(`/rooms?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`);
  }

  return (
    <div className='relative flex flex-col items-center justify-center px-6 md:px-16 lg:px-24 xl:px-32 text-white bg-gradient-to-br from-emerald-900 via-teal-800 to-green-900 h-screen overflow-hidden'>

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Mountain silhouette decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <div className='flex items-center justify-center gap-2 mb-6'>
          <span className='bg-emerald-500/30 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm border border-emerald-400/30'>
            ⭐ 9.2/10 Superb Rating
          </span>
          <span className='bg-emerald-500/30 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm border border-emerald-400/30 hidden sm:block'>
            🏔️ Ella, Sri Lanka
          </span>
        </div>

        <h1 className='font-playfair text-4xl md:text-6xl lg:text-7xl font-bold leading-tight'>
          Cloudy Hill Cottage
        </h1>
        
        <p className='text-emerald-200 text-lg md:text-xl mt-4 max-w-2xl mx-auto'>
          Wake up to breathtaking mountain views, authentic Sri Lankan hospitality, 
          and the magic of Ella's misty hills
        </p>

        {/* Key Features */}
        <div className='flex flex-wrap items-center justify-center gap-4 mt-8 text-sm'>
          <span className='flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full'>
            🌅 Sunrise Views from Bed
          </span>
          <span className='flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full'>
            🍛 Home-Cooked Meals
          </span>
          <span className='flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full'>
            👨‍🍳 Cooking Classes
          </span>
        </div>
      </div>

      {/* Booking Form */}
      <form onSubmit={onSearch} className='relative z-10 bg-white/95 backdrop-blur-md text-gray-600 rounded-2xl px-6 py-5 flex flex-col md:flex-row items-end gap-4 mt-10 shadow-2xl max-w-4xl w-full mx-4'>

        {/* Check-in */}
        <div className='flex-1 w-full'>
          <label htmlFor="checkIn" className='text-sm font-medium text-gray-700 flex items-center gap-2'>
            <img src={assets.calenderIcon} alt="" className='h-4 opacity-60' />
            Check-in
          </label>
          <input
            id="checkIn"
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 mt-1.5 text-sm outline-none focus:border-emerald-500 transition-colors"
            required
          />
        </div>

        {/* Check-out */}
        <div className='flex-1 w-full'>
          <label htmlFor="checkOut" className='text-sm font-medium text-gray-700 flex items-center gap-2'>
            <img src={assets.calenderIcon} alt="" className='h-4 opacity-60' />
            Check-out
          </label>
          <input
            id="checkOut"
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 mt-1.5 text-sm outline-none focus:border-emerald-500 transition-colors"
            required
          />
        </div>

        {/* Guests */}
        <div className='w-full md:w-32'>
          <label htmlFor="guests" className='text-sm font-medium text-gray-700'>Guests</label>
          <input
            min={1}
            max={4}
            id="guests"
            type="number"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 mt-1.5 text-sm outline-none focus:border-emerald-500 transition-colors"
            required
          />
        </div>

        {/* Search Button */}
        <button 
          type="submit"
          className='w-full md:w-auto flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 py-3 px-8 text-white font-medium transition-all cursor-pointer shadow-lg shadow-emerald-600/30'
        >
          <span>Check Availability</span>
        </button>
      </form>

      {/* Scroll indicator */}
      <div className='absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce'>
        <div className='w-6 h-10 rounded-full border-2 border-white/50 flex items-start justify-center p-2'>
          <div className='w-1 h-2 bg-white/70 rounded-full'></div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
