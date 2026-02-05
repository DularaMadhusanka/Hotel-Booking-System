import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';

const Experience = () => {
  const experiences = [
    {
      title: "Cooking Class",
      description: "Learn to make authentic Sri Lankan cuisine with our host Renu. Master 3 traditional curries, yellow rice, and coconut sambal in this hands-on experience.",
      highlight: "Signature Jackfruit Curry",
      duration: "3-4 hours",
      icon: "🍛"
    },
    {
      title: "Ella Rock Hike",
      description: "Embark on the famous Ella Rock trail starting nearby. We provide handwritten maps and directions for this breathtaking trek with panoramic valley views.",
      highlight: "Sunrise hikes available",
      duration: "4-5 hours",
      icon: "🥾"
    },
    {
      title: "Nine Arch Bridge",
      description: "Visit the iconic Nine Arch Bridge, a masterpiece of colonial-era railway construction. Watch trains pass through this engineering marvel surrounded by lush greenery.",
      highlight: "6 km from property",
      duration: "Half day",
      icon: "🌉"
    },
    {
      title: "Sunrise Viewing",
      description: "Experience magical sunrises from your private balcony with floor-to-ceiling glass windows facing Ella Rock and the valley. No early morning trek required!",
      highlight: "View from your bed",
      duration: "Daily",
      icon: "🌅"
    },
    {
      title: "Bicycle Exploration",
      description: "Rent a bicycle and explore the scenic mountain roads of Ella. Discover hidden waterfalls, tea plantations, and local villages at your own pace.",
      highlight: "Rentals available on-site",
      duration: "Flexible",
      icon: "🚴"
    },
    {
      title: "Tea Plantation Tours",
      description: "Visit nearby tea estates and learn about Sri Lanka's famous Ceylon tea. Watch the picking, processing, and enjoy fresh tea with mountain views.",
      highlight: "Local guide arranged",
      duration: "Half day",
      icon: "🍃"
    }
  ];

  const localAttractions = [
    { name: "Ella Railway Station", distance: "2.3 km" },
    { name: "Nine Arch Bridge", distance: "6 km" },
    { name: "Ella Rock", distance: "6 km" },
    { name: "Little Adam's Peak", distance: "3 km" },
    { name: "Ravana Falls", distance: "5 km" },
  ];

  return (
    <div className="pt-28 pb-20">
      {/* Hero Section */}
      <div className="relative h-[50vh] bg-gradient-to-r from-emerald-800 to-teal-600 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-4">
            Unforgettable Experiences
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
            Discover the magic of Ella through authentic local experiences, breathtaking adventures, and culinary delights
          </p>
        </div>
      </div>

      {/* Experiences Grid */}
      <div className="px-6 md:px-16 lg:px-24 py-16">
        <Title 
          title="Things To Do" 
          subTitle="From cooking classes to mountain hikes, immerse yourself in the authentic Sri Lankan experience"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {experiences.map((exp, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              <div className="p-6">
                <span className="text-5xl mb-4 block">{exp.icon}</span>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{exp.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{exp.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">
                    {exp.highlight}
                  </span>
                  <span className="text-gray-500">{exp.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cooking Class Highlight */}
      <div className="bg-amber-50 py-16 px-6 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <span className="text-amber-600 font-medium">Featured Experience</span>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-800 mt-2 mb-4">
              Cook with Renu
            </h2>
            <p className="text-gray-600 mb-6">
              Join our host Renu in her kitchen for an authentic Sri Lankan cooking experience. 
              Learn family recipes passed down through generations and discover the secrets behind 
              her famous Jackfruit Curry that guests can't stop talking about.
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center gap-2">
                <span className="text-emerald-500">✓</span> 3 Traditional Sri Lankan Curries
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500">✓</span> Authentic Yellow Rice
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500">✓</span> Fresh Coconut Sambal
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500">✓</span> Eat what you cook!
              </li>
            </ul>
          </div>
          <div className="lg:w-1/2 bg-gradient-to-br from-amber-200 to-orange-200 rounded-2xl h-80 flex items-center justify-center">
            <span className="text-8xl">👩‍🍳</span>
          </div>
        </div>
      </div>

      {/* Local Attractions */}
      <div className="px-6 md:px-16 lg:px-24 py-16">
        <Title 
          title="Nearby Attractions" 
          subTitle="Explore the best of Ella from our convenient location"
        />
        
        <div className="flex flex-wrap justify-center gap-6 mt-12">
          {localAttractions.map((attraction, index) => (
            <div 
              key={index}
              className="bg-white border border-gray-200 rounded-xl px-6 py-4 flex items-center gap-4 hover:border-emerald-500 transition-colors"
            >
              <img src={assets.locationIcon} alt="location" className="w-5 h-5" />
              <div>
                <p className="font-medium text-gray-800">{attraction.name}</p>
                <p className="text-sm text-gray-500">{attraction.distance}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Getting Around */}
      <div className="bg-gray-50 py-16 px-6 md:px-16 lg:px-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-playfair text-3xl font-bold text-gray-800 mb-6">
            Getting Around Ella
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-2">🚶 Walking</h3>
              <p className="text-gray-600 text-sm">
                20-30 minute walk downhill to town center. The walk back up is steep - 
                we recommend a tuk-tuk for the return journey, especially at night.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-2">🛺 Tuk-Tuk</h3>
              <p className="text-gray-600 text-sm">
                Readily available for 400-600 LKR to town. We can arrange reliable 
                drivers for day trips and airport transfers.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-2">🛵 Scooter Rental</h3>
              <p className="text-gray-600 text-sm">
                Available on-site for independent exploration. Perfect for visiting 
                nearby attractions at your own pace.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-2">🚂 Train</h3>
              <p className="text-gray-600 text-sm">
                Ella Railway Station is 2.3 km away. Experience one of the world's 
                most scenic train journeys through the hill country.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
