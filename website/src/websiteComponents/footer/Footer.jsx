import React from 'react';
import logo from '../../assets/websitenavbar/logob.png';
import banner from '../../assets/footerimg.png';
import { Link } from 'react-router-dom';

const sections = [
    {
        title: 'Product',
        items: ['Cakes', 'Biscuits', 'Short Eats', 'Breads']
    },
    {
        title: 'About',
        items: ['Our Mission', 'Our Story', 'Our Culture', 'Owner']
    },
    {
        title: 'Outlets',
        items: ['Matara', 'Galle', 'Hikkaduwa', 'Dewndara']
    },
    {
        title: 'Support',
        items: ['Telno', 'Email']
    }
];

const Footer = () => {
    // Function to derive section ID from item text
    const getSectionId = (item) => {
        const words = item.split(' ');
        return words[words.length - 1].toLowerCase();
    };

    return (
        <>
            <div className='mt-24 bg-gradient-to-b from-[#F4952C]/20 to-[#e9e3e3]'>
                <img
                    src={banner}
                    className='w-full h-48 md:h-120 object-cover opacity-95 mix-blend-multiply'
                    alt="Traditional Sri Lankan sweets collection"
                />
            </div>

            <div className="w-full px-4 sm:px-6 lg:px-8 bg-[#e9e3e3]">
                <div className="max-w-6xl mx-auto py-8 border-b-2 border-[#F4952C]/30">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                        {/* Logo Section */}
                        <div className="md:col-span-1 flex flex-col items-center md:items-start">
                            <div className="flex items-center gap-3 mb-4 group">
                                <Link to="/" className="flex items-center gap-3">
                                    <img
                                        src={logo}
                                        alt="Little Lanka Logo"
                                        className="w-10 h-10 transition-transform duration-300 hover:scale-110"
                                    />
                                    <span className="text-lg text-[#2C2727] font-pacifico tracking-wide">
                                        Little Lanka
                                    </span>
                                </Link>
                            </div>
                            <p className="text-sm text-[#897D7D] text-center md:text-left mt-2">
                                Guardians of Traditional Sweet Craftsmanship
                            </p>
                            <a href="https://www.facebook.com/share/1A15pUTE1L/?mibextid=wwXIfr" className="flex items-center gap-2 text-[#D4A373] hover:text-[#b8864f]" target="_blank">
                                <span className="text-sm md:text-base">Facebook</span>
                                <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                            </a>
                        </div>

                        {/* Navigation Sections */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:col-span-4">
                            {sections.map((section, index) => (
                                <div key={index} className="text-center md:text-left">
                                    <h6 className='pb-2 text-sm font-bold uppercase tracking-wide text-[#2C2727] border-b-2 border-[#F4952C]/30'>
                                        {section.title}
                                    </h6>
                                    {section.title === 'About' ? (
                                        <ul className="mt-3 space-y-2">
                                            {section.items.map((item, i) => {
                                                const sectionId = getSectionId(item);
                                                return (
                                                    <li key={i}>
                                                        <Link
                                                            to={`/about#${sectionId}`}
                                                            className="text-sm text-[#897D7D] hover:text-[#F4952C] transition-colors"
                                                        >
                                                            {item}
                                                        </Link>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    ) : section.title === 'Support' ? (
                                        <ul className="mt-3 space-y-2">
                                            {section.items.map((item, i) => {
                                                if (item === 'Email') {
                                                    return (
                                                        <li key={i}>
                                                            <a
                                                                href="mailto:littlelankabackers.com"
                                                                className="text-sm text-[#897D7D] hover:text-[#F4952C] transition-colors"
                                                            >
                                                                E-mail
                                                            </a>
                                                        </li>
                                                    );
                                                } else if (item === 'Telno') {
                                                    return (
                                                        <li key={i}>
                                                            <a
                                                                href="tel:0762097004"
                                                                className="text-sm text-[#897D7D] hover:text-[#F4952C] transition-colors"
                                                            >
                                                                Telno
                                                            </a>
                                                        </li>
                                                    );
                                                }
                                                return null;
                                            })}
                                        </ul>
                                    ) : (
                                        <ul className="mt-3 space-y-2">
                                            {section.items.map((item, i) => (
                                                <li
                                                    key={i}
                                                    className="text-sm text-[#897D7D] hover:text-[#F4952C] cursor-pointer transition-colors"
                                                >
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Copyright Section */}
                <div className='max-w-6xl mx-auto py-6 text-center'>
                    <p className='text-xs text-[#897D7D] font-medium tracking-wide'>
                        © 2025 Little Lanka. Preserving Sweet Traditions
                    </p>
                </div>
            </div>
        </>
    );
};

export default Footer;