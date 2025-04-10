import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Dropdown({ categoryList = [], onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categoryList[0]);

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  
  const selectCategory = (category) => {
    setSelectedCategory(category);
    setIsOpen(false);
    if (onChange) onChange(category); // 🔥 Calls onChange when selecting a category
  };

  return (
    <div className="relative">
      {/* Category Button */}
      <button
        type="button"
        onClick={toggleDropdown}
        className="shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:outline-none focus:ring-0 transition duration-300 transform hover:scale-105"
      >
        {selectedCategory}
        <svg
          className="w-2.5 h-2.5 ms-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {/* Category Dropdown with Animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 z-20 bg-white divide-y divide-gray-100 rounded-lg shadow-md w-44"
          >
            <ul className="py-2 text-sm text-gray-700">
              {categoryList.map((category) => (
                <li key={category}>
                  <button
                    type="button"
                    className="inline-flex w-full px-4 py-2 hover:bg-pink-100 transition duration-200"
                    onClick={() => selectCategory(category)}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Dropdown;
