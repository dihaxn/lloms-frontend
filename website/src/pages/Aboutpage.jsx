import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from "../websiteComponents/navbar/Navbar.jsx";
import Footer from "../websiteComponents/footer/Footer.jsx";
import "../styles/scrollbar.css";

const owner = {
    name: 'Mr Premasiri Wakwalla',
    img: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png',
    role: 'Owner',
    bio: 'Combining traditional recipes with warm hospitality to create heartfelt bakery experiences'
};

const AboutPage = () => {
    const location = useLocation();

    // Handle scrolling to sections based on URL hash
    useEffect(() => {
        if (location.hash) {
            const element = document.getElementById(location.hash.slice(1));
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location]);

    return (
        <div className="bg-white min-h-screen flex flex-col">
            {/* Sticky Navbar */}
            <div className="fixed top-0 left-0 right-0 z-50">
                <Navbar />
            </div>

            <main className="flex-1 pt-16">
                {/* Mission Section */}
                <section id="mission" className="relative py-12 md:py-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
                            <div className="space-y-4 md:space-y-8 order-2 lg:order-1">
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
                                    Artisan Baking<br/>
                                    <span className="text-[#D4A373]">Perfected</span>
                                </h1>
                                <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                                    At Hearth & Crust, we honor time-tested baking traditions while creating
                                    warm, inviting experiences. Every loaf and pastry carries the signature
                                    of our craft and care.
                                </p>
                            </div>
                            <div className="relative h-64 md:h-96 w-full rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl order-1 lg:order-2">
                                <img
                                    src="https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1670&q=80"
                                    alt="Fresh bread display"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent"></div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Culture Section */}
                <section id="culture" className="bg-[#FFF8F0] py-12 md:py-20">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                            {[
                                {
                                    title: 'Tradition',
                                    text: 'Using century-old recipes with modern baking science',
                                    icon: '🥖'
                                },
                                {
                                    title: 'Quality',
                                    text: 'Locally-sourced ingredients from trusted suppliers',
                                    icon: '🌟'
                                },
                                {
                                    title: 'Community',
                                    text: 'Building relationships through shared love of baking',
                                    icon: '❤️'
                                }
                            ].map((item, index) => (
                                <div key={index} className="bg-white p-6 md:p-8 rounded-xl md:rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                                    <div className="text-3xl md:text-4xl mb-3 md:mb-4">{item.icon}</div>
                                    <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">{item.title}</h3>
                                    <p className="text-sm md:text-base text-gray-600">{item.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Story Section */}
                <section id="story" className="py-12 md:py-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12">Our Baking Process</h2>
                        <div className="space-y-12">
                            <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-8 items-center">
                                <div className="relative h-48 md:h-64 w-full rounded-xl overflow-hidden">
                                    <img
                                        src="https://images.pexels.com/photos/3023479/pexels-photo-3023479.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                        alt="Hand kneading dough"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="text-left">
                                    <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Handcrafted Excellence</h3>
                                    <p className="text-sm md:text-base text-gray-600">
                                        Our bakers use traditional hand-shaping techniques combined with
                                        perfect fermentation control to create consistently delicious
                                        artisan breads.
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-8 items-center">
                                <div className="relative h-48 md:h-64 w-full rounded-xl overflow-hidden md:order-first">
                                    <img
                                        src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-1.2.1&auto=format&fit=crop&w=1670&q=80"
                                        alt="Fresh croissants"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="text-left">
                                    <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Layered Perfection</h3>
                                    <p className="text-sm md:text-base text-gray-600">
                                        Creating our signature laminated pastries through precise temperature
                                        control and premium European butter for that perfect flaky texture.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Owner Section */}
                <section id="owner" className="py-12 md:py-20 bg-[#D4A373]/10">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden shadow-xl">
                                <img
                                    src={owner.img}
                                    className="w-full h-full object-cover"
                                    alt="Owner"
                                />
                                <div className="absolute inset-0 border-8 border-white/30"></div>
                            </div>
                            <div className="flex-1 text-center md:text-left mt-4 md:mt-0">
                                <h3 className="text-xl md:text-2xl font-bold mb-2">{owner.name}</h3>
                                <p className="text-[#D4A373] mb-3 md:mb-4">{owner.role}</p>
                                <p className="text-sm md:text-base text-gray-600 max-w-prose mx-auto md:mx-0">
                                    {owner.bio}
                                </p>
                                <div className="mt-4 md:mt-6 flex justify-center md:justify-start gap-4">
                                    <a href="https://www.facebook.com/share/1A15pUTE1L/?mibextid=wwXIfr" className="flex items-center gap-2 text-[#D4A373] hover:text-[#b8864f]" target="_blank">
                                        <span className="text-sm md:text-base">Facebook</span>
                                        <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default AboutPage;