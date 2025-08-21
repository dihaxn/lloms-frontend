// Environment configuration for Little Lanka website

export const config = {
  // Set to true to force mock data usage (useful for development without backend)
  FORCE_MOCK_DATA: true, // Temporarily force mock data to avoid backend issues
  
  // Backend configuration
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1',
  
  // Timeout for API calls
  API_TIMEOUT: 10000,
  
  // Feature flags
  ENABLE_MOCK_DATA_FALLBACK: true,
  ENABLE_OFFLINE_MODE: true,
  
  // Mock data settings
  MOCK_DATA_DELAY: 500, // Simulate network delay for mock data
  
  // Development settings
  IS_DEVELOPMENT: import.meta.env.DEV,
  IS_PRODUCTION: import.meta.env.PROD,
  
  // Logging
  LOG_LEVEL: import.meta.env.DEV ? 'debug' : 'error',
};

// Helper function to check if we should use mock data
export const shouldUseMockData = () => {
  return config.FORCE_MOCK_DATA || 
         (config.ENABLE_MOCK_DATA_FALLBACK && !config.IS_PRODUCTION);
};

// Helper function to get API URL
export const getApiUrl = (endpoint) => {
  return `${config.API_BASE_URL}${endpoint}`;
};

// Helper function to log messages based on environment
export const log = (level, message, ...args) => {
  if (config.LOG_LEVEL === 'debug' || level === 'error') {
    console[level](`[Little Lanka] ${message}`, ...args);
  }
};
