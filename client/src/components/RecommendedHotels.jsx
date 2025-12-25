import React, { useEffect } from "react"; 

import HotelCard from "./HotelCard"; 
import Title from "./Title"; 
import { useNavigate } from "react-router-dom"; 
import { useAppContext } from "../context/AppContext";

const RecommendedHotels = () => { 
    const {rooms, searchedCities} =useAppContext();
const [recommended, setRecommended] = useState([]);
const fiterHotels = ()=>{
    const filterHotels = rooms.slice().filter(room => searchedCities.includes(room.hotel.city));
    setRecommended(filterHotels);
}

useEffect(()=> {
  filterHotels();
},[rooms, searchedCities])
   
    return  recommended.length > 0  && (

        <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 pt-20 pb-24'>
            <Title 
                title='Recommended Hotels' 
                subTitle="Discover handpicked hotels around the globe, offering unparalleled comfort, luxury, and unforgettable experiences. From boutique escapes to five-star resorts, we make every stay exceptional." 
            /> 

            <div className='flex flex-wrap items-center justify-between gap-6 mt-20'> 
                {recommended.slice(0, 4).map((room, index) => (
                    <div  className="flex-1 min-w-[250px] max-w-[280px]"> 
                        <HotelCard key={room._id} room={room} index={index} />
                    </div>
                ))}   
            </div>

           
        </div>
    ); 
}; 

export default RecommendedHotels ;
