import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';

// Initial state
const initialState = {
  theme: 'light',
  user: null,
  isLoading: false,
  error: null,
  notifications: []
};

// Action types
const ACTIONS = {
  SET_THEME: 'SET_THEME',
  SET_USER: 'SET_USER',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  ADD_NOTIFICATION: 'ADD_NOTIFICATION',
  REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION'
};

// Reducer function
const appReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_THEME:
      return { ...state, theme: action.payload };
    
    case ACTIONS.SET_USER:
      return { ...state, user: action.payload };
    
    case ACTIONS.SET_LOADING:
      return { ...state, isLoading: action.payload };
    
    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload };
    
    case ACTIONS.CLEAR_ERROR:
      return { ...state, error: null };
    
    case ACTIONS.ADD_NOTIFICATION:
      return { 
        ...state, 
        notifications: [...state.notifications, { id: Date.now(), ...action.payload }]
      };
    
    case ACTIONS.REMOVE_NOTIFICATION:
      return { 
        ...state, 
        notifications: state.notifications.filter(n => n.id !== action.payload)
      };
    
    default:
      return state;
  }
};

// Create context
const AppContext = createContext();

// Provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Theme management with security
  const setTheme = useCallback((theme) => {
    // Validate theme value
    if (!['light', 'dark'].includes(theme)) {
      console.warn('Invalid theme value:', theme);
      return;
    }
    
    dispatch({ type: ACTIONS.SET_THEME, payload: theme });
    
    // Secure localStorage usage
    try {
      localStorage.setItem('theme', theme);
      document.documentElement.classList.toggle('dark', theme === 'dark');
    } catch (error) {
      console.warn('Failed to save theme to localStorage:', error);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    const newTheme = state.theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  }, [state.theme, setTheme]);

  // User management with security
  const setUser = useCallback((user) => {
    // Sanitize user data before storing
    if (user && typeof user === 'object') {
      const sanitizedUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        // Don't store sensitive data like passwords
      };
      dispatch({ type: ACTIONS.SET_USER, payload: sanitizedUser });
    } else {
      dispatch({ type: ACTIONS.SET_USER, payload: null });
    }
  }, []);

  const setLoading = useCallback((loading) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: Boolean(loading) });
  }, []);

  const setError = useCallback((error) => {
    dispatch({ type: ACTIONS.SET_ERROR, payload: error });
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: ACTIONS.CLEAR_ERROR });
  }, []);

  const addNotification = useCallback((notification) => {
    dispatch({ type: ACTIONS.ADD_NOTIFICATION, payload: notification });
  }, []);

  const removeNotification = useCallback((id) => {
    dispatch({ type: ACTIONS.REMOVE_NOTIFICATION, payload: id });
  }, []);

  // Initialize theme from localStorage with security
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme && ['light', 'dark'].includes(savedTheme)) {
        setTheme(savedTheme);
      } else {
        setTheme('light');
      }
    } catch (error) {
      console.warn('Failed to load theme from localStorage:', error);
      setTheme('light');
    }
  }, [setTheme]);

  // Auto-clear errors after 5 seconds
  useEffect(() => {
    if (state.error) {
      const timer = setTimeout(() => {
        clearError();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [state.error, clearError]);

  // Auto-remove notifications after 3 seconds
  useEffect(() => {
    state.notifications.forEach(notification => {
      if (!notification.persistent) {
        setTimeout(() => {
          removeNotification(notification.id);
        }, 3000);
      }
    });
  }, [state.notifications, removeNotification]);

  const value = {
    ...state,
    setTheme,
    toggleTheme,
    setUser,
    setLoading,
    setError,
    clearError,
    addNotification,
    removeNotification
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
