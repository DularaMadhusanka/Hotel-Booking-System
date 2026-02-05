import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='bg-gray-900 text-gray-400 pt-12 px-6 md:px-16 lg:px-24 xl:px-32'>
      <div className='flex flex-wrap justify-between gap-12 md:gap-8'>
        {/* Brand */}
        <div className='max-w-sm'>
          <h3 className='font-playfair text-2xl text-white mb-4'>Cloudy Hill Cottage</h3>
          <p className='text-sm leading-relaxed'>
            Nestled in the misty hills of Ella, Sri Lanka. Experience breathtaking mountain views, 
            authentic hospitality, and unforgettable memories with hosts Renu & Nalaka.
          </p>
          <div className='flex items-center gap-2 mt-4'>
            <span className='bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs'>
              ⭐ 9.2/10 Rating
            </span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <p className='font-semibold text-white mb-4'>Quick Links</p>
          <ul className='flex flex-col gap-2 text-sm'>
            <li><Link to="/" className='hover:text-emerald-400 transition-colors'>Home</Link></li>
            <li><Link to="/rooms" className='hover:text-emerald-400 transition-colors'>Our Rooms</Link></li>
            <li><Link to="/experience" className='hover:text-emerald-400 transition-colors'>Experiences</Link></li>
            <li><Link to="/about" className='hover:text-emerald-400 transition-colors'>About Us</Link></li>
          </ul>
        </div>

        {/* Experiences */}
        <div>
          <p className='font-semibold text-white mb-4'>Experiences</p>
          <ul className='flex flex-col gap-2 text-sm'>
            <li><Link to="/experience" className='hover:text-emerald-400 transition-colors'>Cooking Classes</Link></li>
            <li><Link to="/experience" className='hover:text-emerald-400 transition-colors'>Ella Rock Hike</Link></li>
            <li><Link to="/experience" className='hover:text-emerald-400 transition-colors'>Nine Arch Bridge</Link></li>
            <li><Link to="/experience" className='hover:text-emerald-400 transition-colors'>Tea Plantations</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className='max-w-xs'>
          <p className='font-semibold text-white mb-4'>Contact Us</p>
          <ul className='flex flex-col gap-3 text-sm'>
            <li className='flex items-start gap-2'>
              <span>📍</span>
              <span>Sooriyagahawatte, Kithalella,<br/>Ella 90090, Sri Lanka</span>
            </li>
            <li className='flex items-center gap-2'>
              <span>📞</span>
              <a href="tel:+94715934715" className='hover:text-emerald-400 transition-colors'>
                +94 71 593 4715
              </a>
            </li>
            <li className='flex items-center gap-2'>
              <span>🚂</span>
              <span>2.3 km from Ella Station</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Policies Bar */}
      <div className='flex flex-wrap justify-center gap-x-6 gap-y-2 mt-10 py-4 border-t border-gray-800 text-xs text-gray-500'>
        <span>💰 Cash Only (LKR/USD/EUR)</span>
        <span>🕐 Check-in: 1 PM | Check-out: 11 AM</span>
        <span>👶 Children Welcome</span>
        <span>🚗 Free Parking</span>
      </div>

      <hr className='border-gray-800' />

      <div className='flex flex-col md:flex-row gap-2 items-center justify-between py-5 text-sm'>
        <p>© {new Date().getFullYear()} Cloudy Hill Cottage. All rights reserved.</p>
        <p className='text-gray-600'>
          Hosted by Renu & Nalaka with ❤️
        </p>
      </div>
    </div>
  )
}

export default Footer;
