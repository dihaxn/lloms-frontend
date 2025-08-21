import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/websitenavbar/logo.png';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery('');
            setIsMenuOpen(false);
        }
    };

    const menuItems = [
        { name: 'Home', path: '/' },
        { name: 'Shop', path: '/shop' },
        { name: 'Contact', path: '/contactus' },
        { name: 'About', path: '/about' },
    ];

    return (
        <nav className="relative flex items-center justify-between bg-[#FF8C42] px-4 py-3 shadow-md md:px-8 md:py-4">
            {/* Left side - Logo and Menu Items */}
            <div className="flex items-center gap-6">
                <Link to="/" className="flex items-center gap-3">
                    <img
                        src={logo}
                        alt="Little Lanka Logo"
                        className="h-10 w-10 transition-transform duration-300 hover:scale-110"
                    />
                    <span className="text-lg text-white font-pacifico md:text-2xl">
                        Little Lanka
                    </span>
                </Link>
                <div className="h-6 w-[4px] bg-white transition-opacity duration-300"></div>

                {/* Desktop Menu Items */}
                <ul className="hidden md:flex items-center gap-6">
                    {menuItems.map((item) => (
                        <li key={item.name}>
                            <Link
                                to={item.path}
                                className="text-white hover:text-orange-100 transition-colors duration-300 relative
                                after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px]
                                after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Right side - Search and Mobile Menu */}
            <div className="flex items-center gap-4">
                {/* Desktop Search */}
                <form onSubmit={handleSearchSubmit} className="hidden md:block relative">
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-40 rounded-lg bg-white/20 px-3 py-1 pl-10 text-white placeholder-white/80
                        transition-all duration-300 focus:w-48 focus:outline-none focus:ring-2 focus:ring-white"
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-white/80
                        transition-opacity duration-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-4.35-4.35m0 0a7.5 7.5 0 10-10.61 0 7.5 7.5 0 0010.61 0z"
                        />
                    </svg>
                </form>

                {/* Mobile Menu Button */}
                <button
                    className="text-white md:hidden"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-6 w-6 transition-transform duration-300 ${
                            isMenuOpen ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                        />
                    </svg>
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            <div className={`
                absolute top-full left-0 w-full bg-[#FF8C42] md:hidden z-50 shadow-lg
                transition-all duration-300 ease-out overflow-hidden
                ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
            `}>
                <div className="px-4 py-4">
                    <ul className="space-y-4 mb-4">
                        {menuItems.map((item) => (
                            <li key={item.name}>
                                <Link
                                    to={item.path}
                                    className="block text-white hover:text-orange-100 text-base
                                    transition-colors duration-300 pl-2 border-l-4 border-transparent
                                    hover:border-white hover:pl-4"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <form onSubmit={handleSearchSubmit} className="relative">
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full rounded-lg bg-white/20 px-3 py-2 pl-10 text-white placeholder-white/80
                            transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white"
                        />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-white/80"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-4.35-4.35m0 0a7.5 7.5 0 10-10.61 0 7.5 7.5 0 0010.61 0z"
                            />
                        </svg>
                    </form>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;