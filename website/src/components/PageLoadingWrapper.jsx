import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingSpinner from './LoadingSpinner';
import SkeletonLoader from './SkeletonLoader';
import ProgressBar from './ProgressBar';

const PageLoadingWrapper = ({
  children,
  isLoading = false,
  loadingType = 'spinner',
  loadingVariant = 'default',
  skeletonConfig = {},
  progressConfig = {},
  minLoadTime = 500,
  className = ""
}) => {
  const [showLoading, setShowLoading] = useState(isLoading);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isLoading) {
      setShowLoading(true);
      setProgress(0);

      // Simulate progress for progress bar type
      if (loadingType === 'progress') {
        const interval = setInterval(() => {
          setProgress(prev => {
            if (prev >= 90) {
              clearInterval(interval);
              return 90;
            }
            return prev + Math.random() * 15;
          });
        }, 200);

        return () => clearInterval(interval);
      }
    } else {
      // Ensure minimum loading time for better UX
      const timer = setTimeout(() => {
        setProgress(100);
        setTimeout(() => setShowLoading(false), 200);
      }, minLoadTime);

      return () => clearTimeout(timer);
    }
  }, [isLoading, loadingType, minLoadTime]);

  const renderLoadingContent = () => {
    switch (loadingType) {
      case 'skeleton':
        return (
          <div className="p-6 space-y-6">
            <SkeletonLoader variant="card" className="max-w-md mx-auto" />
            <SkeletonLoader variant="text" lines={4} className="max-w-2xl mx-auto" />
            <SkeletonLoader variant="table" lines={6} className="max-w-4xl mx-auto" />
          </div>
        );

      case 'progress':
        return (
          <div className="loading-container">
            <div className="text-center space-y-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <div className="loading-logo">
                  <span className="loading-logo-text">LL</span>
                </div>
              </motion.div>

              <motion.h2
                className="loading-title"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Loading Little Lanka
              </motion.h2>

              <div className="progress-container">
                <div className="progress-bar">
                  <motion.div
                    className="progress-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{
                      duration: 0.3,
                      ease: "easeOut"
                    }}
                  />
                </div>
                <div className="text-center mt-2">
                  <span className="text-sm font-medium text-gray-600">
                    {Math.round(progress)}%
                  </span>
                </div>
              </div>

              <motion.p
                className="loading-subtitle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Preparing your experience...
              </motion.p>
            </div>
          </div>
        );

      case 'spinner':
      default:
        return (
          <LoadingSpinner
            variant={loadingVariant}
            text="Loading Little Lanka..."
            {...skeletonConfig}
          />
        );
    }
  };

  return (
    <div className={className}>
      <AnimatePresence mode="wait">
        {showLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderLoadingContent()}
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PageLoadingWrapper;
