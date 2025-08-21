import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { IoClose, IoCheckmarkCircle, IoWarning, IoInformation, IoAlertCircle } from 'react-icons/io5';

const NotificationSystem = () => {
  const { notifications, removeNotification } = useAppContext();

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return <IoCheckmarkCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <IoAlertCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <IoWarning className="w-5 h-5 text-yellow-500" />;
      case 'info':
        return <IoInformation className="w-5 h-5 text-blue-500" />;
      default:
        return <IoInformation className="w-5 h-5 text-gray-500" />;
    }
  };

  const getNotificationStyles = (type) => {
    const baseStyles = "flex items-start p-4 rounded-lg shadow-lg border-l-4 max-w-sm w-full";
    
    switch (type) {
      case 'success':
        return `${baseStyles} bg-green-50 border-green-400 text-green-800`;
      case 'error':
        return `${baseStyles} bg-red-50 border-red-400 text-red-800`;
      case 'warning':
        return `${baseStyles} bg-yellow-50 border-yellow-400 text-yellow-800`;
      case 'info':
        return `${baseStyles} bg-blue-50 border-blue-400 text-blue-800`;
      default:
        return `${baseStyles} bg-gray-50 border-gray-400 text-gray-800`;
    }
  };

  const getProgressBarColor = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-400';
      case 'error':
        return 'bg-red-400';
      case 'warning':
        return 'bg-yellow-400';
      case 'info':
        return 'bg-blue-400';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 300, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.8 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30 
            }}
            className={getNotificationStyles(notification.type)}
          >
            {/* Icon */}
            <div className="flex-shrink-0 mr-3 mt-0.5">
              {getNotificationIcon(notification.type)}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              {notification.title && (
                <h4 className="text-sm font-semibold mb-1">
                  {notification.title}
                </h4>
              )}
              <p className="text-sm">
                {notification.message}
              </p>
            </div>

            {/* Close Button */}
            <button
              onClick={() => removeNotification(notification.id)}
              className="flex-shrink-0 ml-3 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close notification"
            >
              <IoClose className="w-4 h-4" />
            </button>

            {/* Progress Bar for auto-dismiss */}
            {!notification.persistent && (
              <motion.div
                className="absolute bottom-0 left-0 h-1 bg-gray-200 rounded-b-lg overflow-hidden"
                style={{ width: '100%' }}
              >
                <motion.div
                  className={`h-full ${getProgressBarColor(notification.type)}`}
                  initial={{ width: '100%' }}
                  animate={{ width: '0%' }}
                  transition={{ duration: 3, ease: 'linear' }}
                  onAnimationComplete={() => removeNotification(notification.id)}
                />
              </motion.div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default NotificationSystem;
