import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({
  variant = 'default',
  size = 'default',
  text = 'Loading...',
  showProgress = true
}) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    default: 'w-16 h-16',
    large: 'w-24 h-24'
  };

  const textSizes = {
    small: 'text-sm',
    default: 'text-xl',
    large: 'text-2xl'
  };

  const renderSpinner = () => {
    switch (variant) {
      case 'dots':
        return (
          <div className="flex space-x-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className={`${sizeClasses[size]} bg-[#FF8C42] rounded-full`}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </div>
        );

      case 'pulse':
        return (
          <motion.div
            className={`${sizeClasses[size]} bg-gradient-to-r from-[#FF8C42] to-[#F4952C] rounded-full`}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
          />
        );

      case 'wave':
        return (
          <div className="flex space-x-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="w-2 bg-[#FF8C42] rounded-full"
                animate={{
                  height: [20, 40, 20]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.1
                }}
              />
            ))}
          </div>
        );

      default:
        return (
          <div className="relative">
            <motion.div
              className={`${sizeClasses[size]} border-4 border-[#FF8C42]/20 border-t-[#FF8C42] rounded-full`}
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <motion.div
              className={`${sizeClasses[size]} border-4 border-transparent border-t-[#F4952C] rounded-full absolute top-0 left-1/2 transform -translate-x-1/2`}
              animate={{ rotate: -360 }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </div>
        );
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e9e3e3] to-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="text-center">
        {renderSpinner()}

        <motion.h3
          className={`${textSizes[size]} font-semibold text-gray-700 mb-2 mt-4`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {text}
        </motion.h3>

        <motion.p
          className="text-gray-500 text-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Please wait while we prepare your experience
        </motion.p>

        {showProgress && (
          <motion.div
            className="w-48 h-2 bg-gray-200 rounded-full mt-6 mx-auto overflow-hidden"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-[#FF8C42] to-[#F4952C] rounded-full"
              animate={{
                x: [-192, 0],
                scaleX: [0, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default LoadingSpinner;
