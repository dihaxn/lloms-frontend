import React, { useState, useEffect } from 'react';
import backgroundImage from '../assets/websitenavbar/background.png';
import Navbar from "../websiteComponents/navbar/Navbar.jsx";
import Navbarsidetext from "../websiteComponents/navbar/Navbarsidetext.jsx";
import Addbox from "../websiteComponents/navbar/Addbox.jsx";
import OutletCardContainer from "../websiteComponents/outletCardContainer/OutletCardContainer.jsx";
import Footer from "../websiteComponents/footer/Footer.jsx";
import BestProductContainer from "../websiteComponents/BestProductContainer/BestProductContainer.jsx";
import "../styles/scrollbar.css";

const Home = () => {
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="relative w-full max-w-[100vw] overflow-x-hidden bg-[#e9e3e3]">
            {/* Fixed Navbar */}
            <div className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrollPosition > 100 ? 'bg-white shadow-md' : 'bg-transparent'}`}>
                <Navbar />
            </div>

            {/* Background Section */}
            <div
                className="h-screen w-full bg-cover bg-center text-white flex flex-col transition-opacity duration-500 relative pt-20 md:pt-0"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            >
                {/* Hide when scrolling down */}
                <div
                    className={`transition-opacity duration-200 mt-8 md:mt-0 ${scrollPosition > 100 ? "opacity-0 pointer-events-none" : "opacity-100"}`}
                >
                    <Navbarsidetext />

                    <div className="absolute right-[5%] bottom-[2%] hidden md:block z-50">
                        <Addbox/>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div
                className="relative w-full z-20 bg-[#e9e3e3] transition-opacity duration-500 px-4 md:px-8 pt-8 md:pt-20"
                style={{
                    opacity: Math.min(scrollPosition / window.innerHeight, 1),
                }}
            >
                <BestProductContainer />
                <OutletCardContainer />
            </div>

            <Footer />
        </div>
    );
};

export default Home;