import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({
  progress = 0,
  variant = 'default',
  size = 'default',
  showLabel = true,
  animated = true,
  className = "",
  color = "orange"
}) => {
  const sizeClasses = {
    small: 'h-1',
    default: 'h-2',
    large: 'h-3'
  };

  const colorClasses = {
    orange: 'bg-[#FF8C42]',
    brand: 'bg-[#F4952C]',
    white: 'bg-white',
    gray: 'bg-gray-500'
  };

  const gradientColors = {
    orange: 'from-[#FF8C42] to-[#F4952C]',
    brand: 'from-[#F4952C] to-[#FF8C42]',
    white: 'from-white to-gray-200',
    gray: 'from-gray-500 to-gray-600'
  };

  const renderProgressBar = () => {
    switch (variant) {
      case 'gradient':
        return (
          <motion.div
            className={`${sizeClasses[size]} w-full bg-gray-200 rounded-full overflow-hidden ${className}`}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className={`h-full bg-gradient-to-r ${gradientColors[color]} rounded-full`}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{
                duration: animated ? 1 : 0,
                ease: "easeOut"
              }}
            />
          </motion.div>
        );

      case 'striped':
        return (
          <motion.div
            className={`${sizeClasses[size]} w-full bg-gray-200 rounded-full overflow-hidden ${className}`}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className={`h-full ${colorClasses[color]} rounded-full relative overflow-hidden`}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{
                duration: animated ? 1 : 0,
                ease: "easeOut"
              }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                animate={{
                  x: [-100, 100]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </motion.div>
          </motion.div>
        );

      case 'circular':
        const radius = size === 'small' ? 20 : size === 'large' ? 40 : 30;
        const circumference = 2 * Math.PI * radius;
        const strokeDasharray = circumference;
        const strokeDashoffset = circumference - (progress / 100) * circumference;

        return (
          <div className={`relative ${className}`}>
            <svg
              className="transform -rotate-90"
              width={radius * 2 + 10}
              height={radius * 2 + 10}
            >
              <circle
                cx={radius + 5}
                cy={radius + 5}
                r={radius}
                stroke="currentColor"
                strokeWidth="3"
                fill="transparent"
                className="text-gray-200"
              />
              <motion.circle
                cx={radius + 5}
                cy={radius + 5}
                r={radius}
                stroke="currentColor"
                strokeWidth="3"
                fill="transparent"
                className={`${colorClasses[color]}`}
                strokeDasharray={strokeDasharray}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{
                  duration: animated ? 1 : 0,
                  ease: "easeOut"
                }}
                strokeLinecap="round"
              />
            </svg>
            {showLabel && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-medium text-gray-700">
                  {progress}%
                </span>
              </div>
            )}
          </div>
        );

      default:
        return (
          <motion.div
            className={`${sizeClasses[size]} w-full bg-gray-200 rounded-full overflow-hidden ${className}`}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className={`h-full ${colorClasses[color]} rounded-full`}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{
                duration: animated ? 1 : 0,
                ease: "easeOut"
              }}
            />
          </motion.div>
        );
    }
  };

  return (
    <div className="w-full">
      {renderProgressBar()}
      {showLabel && variant !== 'circular' && (
        <motion.div
          className="flex justify-between items-center mt-2 text-sm text-gray-600"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <span>Progress</span>
          <span className="font-medium">{progress}%</span>
        </motion.div>
      )}
    </div>
  );
};

export default ProgressBar;
