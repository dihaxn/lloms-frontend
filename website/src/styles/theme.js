// Little Lanka Design System Theme Configuration
export const theme = {
  // Color Palette
  colors: {
    primary: {
      50: '#fff7ed',
      100: '#ffedd5',
      200: '#fed7aa',
      300: '#fdba74',
      400: '#fb923c',
      500: '#f97316', // Main Orange
      600: '#ea580c',
      700: '#c2410c',
      800: '#9a3412',
      900: '#7c2d12',
    },
    secondary: {
      50: '#fef3c7',
      100: '#fde68a',
      200: '#fcd34d',
      300: '#fbbf24',
      400: '#f59e0b',
      500: '#d97706', // Golden Yellow
      600: '#b45309',
      700: '#92400e',
      800: '#78350f',
      900: '#451a03',
    },
    neutral: {
      50: '#fafaf9',
      100: '#f5f5f4',
      200: '#e7e5e4',
      300: '#d6d3d1',
      400: '#a8a29e',
      500: '#78716c',
      600: '#57534e',
      700: '#44403c',
      800: '#292524',
      900: '#1c1917',
    },
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
    },
    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
    },
    error: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
    },
    info: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
    }
  },

  // Typography
  fontFamily: {
    primary: ['Poppins', 'sans-serif'],
    secondary: ['Quicksand', 'sans-serif'],
    accent: ['Pacifico', 'cursive'],
  },

  fontSize: {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    base: '1rem',      // 16px
    lg: '1.125rem',    // 18px
    xl: '1.25rem',     // 20px
    '2xl': '1.5rem',   // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
    '6xl': '3.75rem',  // 60px
    '7xl': '4.5rem',   // 72px
    '8xl': '6rem',     // 96px
    '9xl': '8rem',     // 128px
  },

  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },

  lineHeight: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },

  // Spacing
  spacing: {
    0: '0',
    1: '0.25rem',   // 4px
    2: '0.5rem',    // 8px
    3: '0.75rem',   // 12px
    4: '1rem',      // 16px
    5: '1.25rem',   // 20px
    6: '1.5rem',    // 24px
    8: '2rem',      // 32px
    10: '2.5rem',   // 40px
    12: '3rem',     // 48px
    16: '4rem',     // 64px
    20: '5rem',     // 80px
    24: '6rem',     // 96px
    32: '8rem',     // 128px
  },

  // Border Radius
  borderRadius: {
    none: '0',
    xs: '0.125rem',  // 2px
    sm: '0.25rem',   // 4px
    md: '0.375rem',  // 6px
    lg: '0.5rem',    // 8px
    xl: '0.75rem',   // 12px
    '2xl': '1rem',   // 16px
    '3xl': '1.5rem', // 24px
    full: '9999px',
  },

  // Shadows
  boxShadow: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    brand: '0 10px 25px -5px rgba(249, 115, 22, 0.3)',
    brandLg: '0 20px 40px -10px rgba(249, 115, 22, 0.4)',
  },

  // Transitions
  transitionDuration: {
    fast: '150ms',
    normal: '250ms',
    slow: '350ms',
    slower: '500ms',
  },

  transitionTimingFunction: {
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
  },

  // Breakpoints
  screens: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // Z-index
  zIndex: {
    0: 0,
    10: 10,
    20: 20,
    30: 30,
    40: 40,
    50: 50,
    auto: 'auto',
  },

  // Component Specific Styles
  components: {
    button: {
      sizes: {
        xs: {
          padding: '0.25rem 0.75rem',
          fontSize: '0.75rem',
          minHeight: '1.5rem',
        },
        sm: {
          padding: '0.5rem 1rem',
          fontSize: '0.875rem',
          minHeight: '2rem',
        },
        md: {
          padding: '0.75rem 1.5rem',
          fontSize: '1rem',
          minHeight: '2.5rem',
        },
        lg: {
          padding: '1rem 2rem',
          fontSize: '1.125rem',
          minHeight: '3rem',
        },
        xl: {
          padding: '1.25rem 2.5rem',
          fontSize: '1.25rem',
          minHeight: '3.5rem',
        },
      },
      variants: {
        primary: {
          background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
          color: '#ffffff',
          boxShadow: '0 10px 25px -5px rgba(249, 115, 22, 0.3)',
        },
        secondary: {
          background: '#f5f5f4',
          color: '#1c1917',
          border: '1px solid #e7e5e4',
        },
        outline: {
          background: 'transparent',
          color: '#f97316',
          border: '2px solid #f97316',
        },
        ghost: {
          background: 'transparent',
          color: '#f97316',
          border: 'none',
        },
      },
    },
    card: {
      variants: {
        default: {
          background: '#fafaf9',
          borderRadius: '0.75rem',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          border: '1px solid #e7e5e4',
        },
        elevated: {
          background: '#ffffff',
          borderRadius: '1rem',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          border: '1px solid #fed7aa',
        },
        product: {
          background: 'linear-gradient(145deg, #fafaf9 0%, #f5f5f4 100%)',
          borderRadius: '1rem',
          border: '1px solid #fed7aa',
          position: 'relative',
        },
      },
    },
    input: {
      variants: {
        default: {
          background: '#fafaf9',
          border: '2px solid #e7e5e4',
          borderRadius: '0.5rem',
          padding: '0.75rem 1rem',
          fontSize: '1rem',
        },
        focus: {
          borderColor: '#f97316',
          boxShadow: '0 0 0 3px rgba(249, 115, 22, 0.1)',
        },
      },
    },
  },

  // Animation Presets
  animations: {
    fadeInUp: {
      from: {
        opacity: 0,
        transform: 'translateY(30px)',
      },
      to: {
        opacity: 1,
        transform: 'translateY(0)',
      },
    },
    slideInLeft: {
      from: {
        opacity: 0,
        transform: 'translateX(-30px)',
      },
      to: {
        opacity: 1,
        transform: 'translateX(0)',
      },
    },
    slideInRight: {
      from: {
        opacity: 0,
        transform: 'translateX(30px)',
      },
      to: {
        opacity: 1,
        transform: 'translateX(0)',
      },
    },
    scaleIn: {
      from: {
        opacity: 0,
        transform: 'scale(0.9)',
      },
      to: {
        opacity: 1,
        transform: 'scale(1)',
      },
    },
    spin: {
      from: {
        transform: 'rotate(0deg)',
      },
      to: {
        transform: 'rotate(360deg)',
      },
    },
  },
};

// Helper functions for theme usage
export const getColor = (colorPath) => {
  const path = colorPath.split('.');
  let color = theme.colors;
  
  for (const segment of path) {
    color = color[segment];
    if (!color) return null;
  }
  
  return color;
};

export const getSpacing = (size) => {
  return theme.spacing[size] || size;
};

export const getFontSize = (size) => {
  return theme.fontSize[size] || size;
};

export const getBorderRadius = (size) => {
  return theme.borderRadius[size] || size;
};

export const getBoxShadow = (size) => {
  return theme.boxShadow[size] || size;
};

// CSS-in-JS style generators
export const createButtonStyles = (variant = 'primary', size = 'md') => {
  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: theme.fontFamily.primary.join(', '),
    fontWeight: theme.fontWeight.medium,
    borderRadius: theme.borderRadius.lg,
    transition: `all ${theme.transitionDuration.normal} ${theme.transitionTimingFunction.easeInOut}`,
    cursor: 'pointer',
    textDecoration: 'none',
    border: 'none',
    outline: 'none',
    position: 'relative',
    overflow: 'hidden',
  };

  const sizeStyles = theme.components.button.sizes[size];
  const variantStyles = theme.components.button.variants[variant];

  return {
    ...baseStyles,
    ...sizeStyles,
    ...variantStyles,
  };
};

export const createCardStyles = (variant = 'default') => {
  const baseStyles = {
    transition: `all ${theme.transitionDuration.normal} ${theme.transitionTimingFunction.easeInOut}`,
    overflow: 'hidden',
  };

  const variantStyles = theme.components.card.variants[variant];

  return {
    ...baseStyles,
    ...variantStyles,
  };
};

export default theme;
