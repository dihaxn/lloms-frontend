import React from 'react';
import add from '../../assets/websitenavbar/add.png';
import { Link } from 'react-router-dom';

const Addbox = () => {
    return (
        <div className="flex items-center bg-gray-200/80 rounded-lg shadow-lg p-4 space-x-4 max-w-[350px] backdrop-blur-sm mt-4">
            <img src={add} alt="cookie" className="h-20 w-20 rounded-full object-cover"/>
            <div>
                <h3 className="text-lg font-semibold text-gray-800">Chocolate Cookie</h3>
                <p className="text-xs text-gray-700/90">
                    Crispy on the outside, chewy on the inside - a timeless classic reinvented.
                </p>
                <Link to="/shop">
                    <button className="mt-2 px-8 py-3 bg-black/90 text-white rounded-full shadow-lg hover:bg-gray-800/95 text-xs transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                        Shop Now
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Addbox;