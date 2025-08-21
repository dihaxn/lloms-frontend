import React from 'react';
import { motion } from 'framer-motion';

const ComponentTransition = ({ 
  children, 
  variant = 'fadeIn',
  duration = 0.3,
  delay = 0,
  stagger = 0.1,
  className = "",
  whileHover = {},
  whileTap = {},
  ...props
}) => {
  const variants = {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 }
    },
    slideUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 }
    },
    slideLeft: {
      initial: { opacity: 0, x: 20 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -20 }
    },
    slideRight: {
      initial: { opacity: 0, x: -20 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 20 }
    },
    scale: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.95 }
    },
    rotate: {
      initial: { opacity: 0, rotate: -5 },
      animate: { opacity: 1, rotate: 0 },
      exit: { opacity: 0, rotate: 5 }
    },
    bounce: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { 
        opacity: 1, 
        scale: 1,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 25
        }
      },
      exit: { opacity: 0, scale: 0.8 }
    },
    stagger: {
      initial: { opacity: 0, y: 20 },
      animate: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
          delay: i * stagger,
          duration
        }
      }),
      exit: { opacity: 0, y: -20 }
    }
  };

  const selectedVariant = variants[variant] || variants.fadeIn;

  // Handle staggered animations for children
  if (variant === 'stagger' && Array.isArray(children)) {
    return (
      <div className={className}>
        {React.Children.map(children, (child, index) => (
          <motion.div
            key={index}
            custom={index}
            variants={selectedVariant}
            initial="initial"
            animate="animate"
            exit="exit"
            whileHover={whileHover}
            whileTap={whileTap}
            {...props}
          >
            {child}
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      variants={selectedVariant}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{
        duration,
        delay,
        ease: "easeOut"
      }}
      whileHover={whileHover}
      whileTap={whileTap}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default ComponentTransition;
