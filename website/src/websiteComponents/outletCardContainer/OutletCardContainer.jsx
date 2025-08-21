import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useOutlets } from '../../hooks/useApi';
import OutletCard from '../outletCard/OutletCard';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const OutletCardContainer = () => {
    const swiperRef = useRef(null);
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

    if (error) {
        return (
            <div className="error-container">
                <p className="error-message">Error loading outlets: {error.message}</p>
            </div>
        );
    }

    return (
        <div className='outlet-container'>
            <div className="outlet-wrapper">
                {/* Header Section */}
                <div className="header-section">
                    <h2 className="main-title">Our Branches</h2>
                    <h3 className="subtitle">
                        We Care About Our Customers <br /> Experience Too
                    </h3>
                    <p className="description">
                        Discover our network of Little Lanka branches across Sri Lanka, 
                        each offering the same exceptional quality and taste you love.
                    </p>
                </div>

                {/* Carousel Wrapper */}
                <div className="carousel-wrapper">
                    {/* Left Navigation Button */}
                    <button
                        className="nav-button prev-button"
                        onClick={() => handleNavigationClick('prev')}
                        aria-label="Previous outlet"
                    >
                        <FaChevronLeft />
                    </button>

                    {/* Middle Div with Cards */}
                    <div className="carousel-content">
                        {loading ? (
                            <div className="loading-container">
                                <div className="loading-spinner"></div>
                                <p className="loading-text">Loading our branches...</p>
                            </div>
                        ) : outlets.length > 0 ? (
                            <Swiper
                                ref={swiperRef}
                                breakpoints={{
                                    320: { slidesPerView: 1, slidesPerGroup: 1, spaceBetween: 20 },
                                    640: { slidesPerView: 2, slidesPerGroup: 2, spaceBetween: 24 },
                                    768: { slidesPerView: 2, slidesPerGroup: 2, spaceBetween: 28 },
                                    1024: { slidesPerView: 3, slidesPerGroup: 3, spaceBetween: 32 },
                                    1280: { slidesPerView: 4, slidesPerGroup: 4, spaceBetween: 36 }
                                }}
                                loop={outlets.length > 4}
                                pagination={{
                                    clickable: true,
                                    dynamicBullets: true,
                                }}
                                navigation={{
                                    prevEl: '.prev-button',
                                    nextEl: '.next-button',
                                }}
                                autoplay={{
                                    delay: 3000,
                                    disableOnInteraction: false,
                                    pauseOnMouseEnter: true,
                                }}
                                speed={800}
                                modules={[Pagination, Navigation, Autoplay]}
                                className="outlet-swiper"
                                grabCursor={true}
                                effect="slide"
                            >
                                {outlets.map((outlet) => (
                                    <SwiperSlide key={outlet.id} className="outlet-slide">
                                        <OutletCard outlet={outlet} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        ) : (
                            <div className="empty-state">
                                <div className="empty-icon">🏪</div>
                                <p className="empty-text">No branches available at the moment</p>
                                <p className="empty-subtext">Please check back later</p>
                            </div>
                        )}
                    </div>

                    {/* Right Navigation Button */}
                    <button
                        className="nav-button next-button"
                        onClick={() => handleNavigationClick('next')}
                        aria-label="Next outlet"
                    >
                        <FaChevronRight />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OutletCardContainer;