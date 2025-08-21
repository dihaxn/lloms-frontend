import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import React, { useRef } from "react";
import "./OutletCardContainer.css";
import OutletCard from '../outletCard/OutletCard';
import { useOutlets } from '../../hooks/useApi';

const OutletCardContainer = () => {
    const swiperRef = useRef(null);
    
    // Use React Query for data fetching
    const { 
        data: outlets = [], 
        isLoading: loading, 
        error 
    } = useOutlets();

    const handleNavigationClick = (direction) => {
        if (swiperRef.current) {
            swiperRef.current.autoplay.stop();
            if (direction === 'prev') {
                swiperRef.current.swiper.slidePrev();
            } else if (direction === 'next') {
                swiperRef.current.swiper.slideNext();
            }
            setTimeout(() => {
                swiperRef.current.autoplay.start();
            }, 2000);
        }
    };

    return (
        <div className='flex justify-center items-center min-h-screen'>
            <div className="w-full bg-[#e9e3e3] shadow-lg rounded-lg overflow-auto px-6 py-6 mx-7">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <h2 className="text-[#F4952C] font-pacifico text-3xl">Outlets</h2>
                    <h3 className="text-black font-quicksand text-2xl font-semibold mt-2">
                        We Care About Our Customers <br /> Experience Too
                    </h3>
                </div>

                {/* Carousel Wrapper */}
                <div className="flex items-center justify-between">
                    {/* Left Navigation Button */}
                    <div className="flex justify-center items-center w-12 h-12">
                        <button
                            className="prev-arrow flex items-center justify-center w-full h-full bg-[#F4952C]/30 rounded-full shadow-md hover:bg-[#F4952C]/40 hover:border-2 hover:border-[#F4952C] text-[#F4952C]/60 hover:text-[#F4952C]"
                            onClick={() => handleNavigationClick('prev')}
                        >
                            <FaChevronLeft />
                        </button>
                    </div>

                    {/* Middle Div with Cards */}
                    <div className="flex-1 overflow-hidden flex justify-center items-center">
                        <div className="card-set-container">
                            {loading ? (
                                <p>Loading outlets...</p>
                            ) : outlets.length > 0 ? (
                                <Swiper
                                    ref={swiperRef}
                                    breakpoints={{
                                        320: { slidesPerView: 1 },
                                        640: { slidesPerView: 2 },
                                        768: { slidesPerView: 3 },
                                        1024: { slidesPerView: 4 },
                                        1280: { slidesPerView: 5 }
                                    }}
                                    spaceBetween={10}
                                    loop={true}
                                    pagination={{
                                        clickable: true,
                                    }}
                                    navigation={{
                                        prevEl: '.prev-arrow',
                                        nextEl: '.next-arrow',
                                    }}
                                    autoplay={{
                                        delay: 1500,
                                        disableOnInteraction: false,
                                    }}
                                    speed={1000}
                                    modules={[Pagination, Navigation, Autoplay]}
                                    className="mySwiper"
                                >
                                    {outlets.map((outlet) => (
                                        <SwiperSlide key={outlet.outletId}>
                                            <OutletCard outlet={outlet}
                                            />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            ) : (
                                <p>No outlets available</p>
                            )}
                        </div>
                    </div>

                    {/* Right Navigation Button */}
                    <div className="flex justify-center items-center w-12 h-12">
                        <button
                            className="next-arrow flex items-center justify-center w-full h-full bg-[#F4952C]/30 rounded-full shadow-md hover:bg-[#F4952C]/40 hover:border-2 hover:border-[#F4952C] text-[#F4952C]/60 hover:text-[#F4952C]"
                            onClick={() => handleNavigationClick('next')}
                        >
                            <FaChevronRight />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OutletCardContainer;