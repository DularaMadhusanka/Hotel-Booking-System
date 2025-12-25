import React from 'react';
import { assets, cities } from '../assets/assets';

const Hero = () => {

  
		const {navigate,getToken, axios, setSearchedCities} = useAppContext()
  const [destination , setDestination] = useState("")
  const onSearch = async (e)=>{
    e.preventDefault();
    navigate(`/rooms?destination=${destination}`)

    //call api to save reent searchrd city

    await axios.post('/api/user/store-recent-search',{recentSearchedCity: destination},{headers :{Authorization :`Bearer ${await getToken()}`}});

    //search cities

    setSearchedCities((prevSearchedCities)=> {
   const updatedSearchedCities = [...prevSearchedCities,destination];
   if(updatedSearchedCities.length>3){
    updatedSearchedCities.shift();
   }
   return updatedSearchedCities;
    })

  }

  return (
    <div className='relative flex flex-col items-start justify-center px-6 md:px-16 lg:px-24 xl:px-32 text-white bg-[url("/src/assets/heroImage.png")] bg-no-repeat bg-cover bg-center h-screen'>

      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Content */}
      <p className='bg-[#49B9FF]/50 px-3.5 py-1 rounded-full mt-20 relative z-10'>
        Where Comfort Meets Luxury
      </p>

      <h1 className='relative z-10 font-playfair text-2xl md:text-5xl md:text-[56px] md:leading-[56px] font-bold md:font-extrabold max-w-xl mt-8'>
        Explore Your Dream Destination
      </h1>

      <p className='relative z-10 max-w-xl mt-2 text-sm md:text-base'>
        Indulge in exceptional service and refined living. Begin your unforgettable stay today.
      </p>

      {/* FORM */}
      <form  onSubmit={onSearch} className='relative z-10 bg-white text-gray-500 rounded-lg px-6 py-4 flex flex-col md:flex-row max-md:items-start gap-4 max-md:mx-auto mt-6'>

        {/* Destination */}
        <div>
          <div className='flex items-center gap-2'>
            <img src={assets.calenderIcon} alt="" className='h-4' />
            <label htmlFor="destination">Destination</label>
          </div>

          <input
           onChange={e => setDestination(e.target.value)} value={destination}
           list='destinayions'
            id="destinationInput"
            type="date"
            className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" placeholder='Type here' required
          />
          <datalist id='destinations'> 
            {cities.map((city,index)=>(
              <option value={city} key={index}/>
            ))}
          </datalist>
        </div>

        {/* Check-in */}
        <div>
          <div className='flex items-center gap-2'>
            <img src={assets.calenderIcon} alt="" className='h-4' />
            <label htmlFor="checkIn">Check in</label>
          </div>
          <input
            id="checkIn"
            type="date"
            className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
          />
        </div>

        {/* Check-out */}
        <div>
          <div className='flex items-center gap-2'>
            <img src={assets.calenderIcon} alt="" className='h-4' />
            <label htmlFor="checkOut">Check out</label>
          </div>
          <input
            id="checkOut"
            type="date"
            className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
          />
        </div>

        {/* Guests */}
        <div className='flex md:flex-col max-md:gap-2 max-md:items-center'>
          <label htmlFor="guests">Guests</label>
          <input
            min={1}
            max={4}
            id="guests"
            type="number"
            className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none w-16"
            placeholder="0"
          />
        </div>

        {/* Search Button */}
        <button className='flex items-center justify-center gap-1 rounded-md bg-black py-3 px-4 text-white my-auto cursor-pointer max-md:w-full max-md:py-1'>
          <img src={assets.searchIcon} alt="" className='h-7' />
          <span>Search</span>
        </button>

      </form>

    </div>
  );
}

export default Hero;
