import React from "react";
import Product_Card from "./ProductCard.jsx";
import { useProducts } from "../../hooks/useApi";
import { motion, AnimatePresence } from "framer-motion";

const BestProductContainer = () => {
    // Use React Query for data fetching
    const { 
        data: products = [], 
        isLoading, 
        error, 
        isError 
    } = useProducts({ status: true, limit: 8 });

    // Loading state with skeleton
    if (isLoading) {
        return (
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-8">
                    <h2 className="text-[#F4952C] font-pacifico text-3xl">Best Products</h2>
                    <h3 className="text-black font-quicksand text-2xl font-semibold mt-2">
                        Best Products This Week!
                    </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <div key={index} className="animate-pulse" data-testid="skeleton">
                            <div className="bg-gray-200 h-64 rounded-lg mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // Error state
    if (isError) {
        return (
            <div className="max-w-7xl mx-auto">
                <div className="text-center py-8">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <h2 className="text-red-600 font-quicksand text-2xl font-semibold mb-2">
                        Something went wrong
                    </h2>
                    <p className="text-gray-600 mb-4">
                        {error?.message || "Failed to load products. Please try again later."}
                    </p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="bg-[#F4952C] text-white px-6 py-2 rounded-lg hover:bg-[#e08520] transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-7xl mx-auto px-4">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-8"
            >
                <h2 className="text-[#F4952C] font-pacifico text-3xl">Best Products</h2>
                <h3 className="text-black font-quicksand text-2xl font-semibold mt-2">
                    Best Products This Week!
                </h3>
            </motion.div>

            {/* Empty State */}
            {products.length === 0 && (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center py-12"
                >
                    <div className="text-gray-400 text-6xl mb-4">🍰</div>
                    <h3 className="text-gray-600 text-xl font-semibold mb-2">
                        No products available
                    </h3>
                    <p className="text-gray-500">
                        Check back later for our latest products!
                    </p>
                </motion.div>
            )}

            {/* Products Grid */}
            {products.length > 0 && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                    data-testid="products-grid"
                >
                    <AnimatePresence>
                        {products.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ 
                                    duration: 0.4, 
                                    delay: index * 0.1 
                                }}
                                whileHover={{ 
                                    y: -5,
                                    transition: { duration: 0.2 }
                                }}
                            >
                                <Product_Card item={item} showPrice={false} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            )}
        </div>
    );
};

export default BestProductContainer;