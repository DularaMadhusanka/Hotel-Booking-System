import React, { useState, useEffect } from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const MyBookings = () => {
    const { axios, getToken, user, currency } = useAppContext()
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchBookings = async () => {
        try {
            const { data } = await axios.get('/api/bookings/user', {
                headers: { Authorization: `Bearer ${await getToken()}` }
            })
            if (data.success) {
                setBookings(data.bookings)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (user) {
            fetchBookings()
        }
    }, [user])

    if (loading) {
        return (
            <div className='py-28 md:pb-35 md:pt-32 px-4 md:px-16 flex justify-center items-center min-h-[60vh]'>
                <p className='text-gray-500'>Loading your bookings...</p>
            </div>
        )
    }

    return (
        <div className='py-28 md:pb-35 md:pt-32 px-4 md:px-16'>

            <Title title='My Bookings' subTitle='Easily manage your past, current, and upcoming hotel reservations in one place. Plan your trips seamlessly with just a few clicks' align='left' />

            <div className='max-w-6xl mt-8 w-full text-gray-800'>
                {bookings.length === 0 ? (
                    <div className='text-center py-10'>
                        <p className='text-gray-500'>You have no bookings yet.</p>
                    </div>
                ) : (
                    <>
                        <div className='hidden md:grid md:grid-cols-[1fr_2fr_1fr] w-full border-b border-gray-300 font-medium text-base py-3'>
                            <div className="w-1/3">Hotels</div>
                            <div className="w-1/3">Date & Timings</div>
                            <div className="w-1/3">Payment</div>
                        </div>

                        {bookings.map((booking) => (
                            <div key={booking._id} className='grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 py-6 first:border-t'>
                                
                                {/* Hotel Details */}
                                <div className='flex flex-col md:flex-row'>
                                    <img src={booking.room?.images?.[0] || assets.roomPlaceholder} alt="hotel-img" className='md:w-44 rounded shadow object-cover' />
                                    <div className='flex flex-col gap-1.5 mt-3 md:mt-0 md:ml-4'>
                                        <p className='font-playfair text-2xl'>
                                            {booking.hotel?.name || 'Hotel'}
                                            <span className='font-inter text-sm'> ({booking.room?.roomType || 'Room'})</span>
                                        </p>
                                        <div className='flex items-center gap-1 text-sm text-gray-500'>
                                            <img src={assets.locationIcon} alt="location-icon" />
                                            <span>{booking.hotel?.address || 'Address'}</span>
                                        </div>

                                        <div className='flex items-center gap-1 text-sm text-gray-500'>
                                            <img src={assets.guestsIcon} alt="guests-icon" />
                                            <span>Guests: {booking.guests}</span>
                                        </div>

                                        <p className='text-base'>Total: {currency}{booking.totalPrice}</p>
                                    </div>
                                </div>

                                {/* Date and Timing */}
                                <div className='flex flex-row md:items-center md:gap-12 mt-3 gap-8'>
                                    <div>
                                        <p>Check-In:</p>
                                        <p className='text-gray-500 text-sm'>
                                            {new Date(booking.checkInDate).toDateString()}
                                        </p>
                                    </div>
                                    <div>
                                        <p>Check-Out:</p>
                                        <p className='text-gray-500 text-sm'>
                                            {new Date(booking.checkOutDate).toDateString()}
                                        </p>
                                    </div>
                                </div>

                                {/* Payment Status */}
                                <div className='flex flex-col items-start justify-center pt-3'>
                                    <div className='flex items-center gap-2'>
                                        <div className={`h-3 w-3 rounded-full ${booking.isPaid ? "bg-green-500" : "bg-red-500"}`} />
                                        <p className={`text-sm ${booking.isPaid ? "text-green-500" : "text-red-500"}`}>
                                            {booking.isPaid ? "Paid" : "Unpaid"}
                                        </p>
                                    </div>

                                    {!booking.isPaid && (
                                        <button className='mt-2 px-4 py-1 bg-primary text-white rounded text-sm hover:bg-primary-dull transition-all'>
                                            Pay Now
                                        </button>
                                    )}
                                </div>

                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    )
}

export default MyBookings;
