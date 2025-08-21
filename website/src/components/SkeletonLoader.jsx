import React from 'react';
import { motion } from 'framer-motion';

const SkeletonLoader = ({
  variant = 'text',
  lines = 3,
  className = "",
  height = "h-4",
  width = "w-full",
  rounded = "rounded"
}) => {
  const shimmerVariants = {
    shimmer: {
      x: [-200, 200],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const renderSkeleton = () => {
    switch (variant) {
      case 'text':
        return (
          <div className="space-y-2">
            {Array.from({ length: lines }).map((_, index) => (
              <motion.div
                key={index}
                className={`${height} ${width} ${rounded} bg-[#FF8C42]/10 relative overflow-hidden`}
                initial={{ opacity: 0.7 }}
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.1
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FF8C42]/20 to-transparent"
                  variants={shimmerVariants}
                  animate="shimmer"
                />
              </motion.div>
            ))}
          </div>
        );

      case 'card':
        return (
          <div className={`${className} bg-white rounded-lg shadow-sm p-4 space-y-3 border border-[#FF8C42]/10`}>
            <motion.div
              className="w-20 h-20 bg-[#FF8C42]/10 rounded-full mx-auto relative overflow-hidden"
              initial={{ opacity: 0.7 }}
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FF8C42]/20 to-transparent rounded-full"
                variants={shimmerVariants}
                animate="shimmer"
              />
            </motion.div>
            <div className="space-y-2">
              <motion.div
                className="h-4 bg-[#FF8C42]/10 rounded w-3/4 mx-auto relative overflow-hidden"
                initial={{ opacity: 0.7 }}
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FF8C42]/20 to-transparent"
                  variants={shimmerVariants}
                  animate="shimmer"
                />
              </motion.div>
              <motion.div
                className="h-3 bg-[#FF8C42]/10 rounded w-1/2 mx-auto relative overflow-hidden"
                initial={{ opacity: 0.7 }}
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FF8C42]/20 to-transparent"
                  variants={shimmerVariants}
                  animate="shimmer"
                />
              </motion.div>
            </div>
          </div>
        );

      case 'image':
        return (
          <motion.div
            className={`${height} ${width} ${rounded} bg-[#FF8C42]/10 relative overflow-hidden`}
            initial={{ opacity: 0.7 }}
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FF8C42]/20 to-transparent"
              variants={shimmerVariants}
              animate="shimmer"
            />
          </motion.div>
        );

      case 'button':
        return (
          <motion.div
            className={`${height} ${width} ${rounded} bg-[#FF8C42]/10 relative overflow-hidden`}
            initial={{ opacity: 0.7 }}
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FF8C42]/20 to-transparent"
              variants={shimmerVariants}
              animate="shimmer"
            />
          </motion.div>
        );

      case 'table':
        return (
          <div className="space-y-2">
            {Array.from({ length: lines }).map((_, index) => (
              <motion.div
                key={index}
                className="flex space-x-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.div
                  className="h-4 bg-[#FF8C42]/10 rounded flex-1 relative overflow-hidden"
                  initial={{ opacity: 0.7 }}
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.1 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FF8C42]/20 to-transparent"
                    variants={shimmerVariants}
                    animate="shimmer"
                  />
                </motion.div>
                <motion.div
                  className="h-4 bg-[#FF8C42]/10 rounded w-24 relative overflow-hidden"
                  initial={{ opacity: 0.7 }}
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.1 + 0.2 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FF8C42]/20 to-transparent"
                    variants={shimmerVariants}
                    animate="shimmer"
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        );

      default:
        return (
          <motion.div
            className={`${height} ${width} ${rounded} bg-[#FF8C42]/10 relative overflow-hidden`}
            initial={{ opacity: 0.7 }}
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FF8C42]/20 to-transparent"
              variants={shimmerVariants}
              animate="shimmer"
            />
          </motion.div>
        );
    }
  };

  return (
    <div className={className}>
      {renderSkeleton()}
    </div>
  );
};

export default SkeletonLoader; 
