import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useAppContext } from '../context/AppContext';
import { 
  mockProducts, 
  mockOutlets, 
  getProductById, 
  getProductsByCategory, 
  searchProducts,
  getOutletById 
} from '../data/mockData';
import { config, shouldUseMockData, getApiUrl, log } from '../config/environment';

// Base API configuration
const API_CONFIG = {
  baseURL: config.API_BASE_URL,
  timeout: config.API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
};

// Custom axios instance with interceptors
const createApiInstance = () => {
  const instance = axios.create(API_CONFIG);

  // Request interceptor for authentication
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor for error handling
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // Handle unauthorized access
        localStorage.removeItem('authToken');
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

// Generic GET hook
export const useGet = (key, url, options = {}) => {
  const { setError, clearError } = useAppContext();
  const api = createApiInstance();

  return useQuery({
    queryKey: key,
    queryFn: async () => {
      try {
        clearError();
        const response = await api.get(url);
        return response.data;
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
        setError(errorMessage);
        throw error;
      }
    },
    ...options,
  });
};

// Generic POST hook
export const usePost = (url, options = {}) => {
  const { setError, clearError, addNotification } = useAppContext();
  const queryClient = useQueryClient();
  const api = createApiInstance();

  return useMutation({
    mutationFn: async (data) => {
      try {
        clearError();
        const response = await api.post(url, data);
        return response.data;
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
        setError(errorMessage);
        throw error;
      }
    },
    onSuccess: (data, variables, context) => {
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
      // Invalidate related queries
      if (options.invalidateQueries) {
        queryClient.invalidateQueries({ queryKey: options.invalidateQueries });
      }
      // Show success notification
      addNotification({
        type: 'success',
        message: options.successMessage || 'Operation completed successfully',
        persistent: false,
      });
    },
    onError: (error, variables, context) => {
      if (options.onError) {
        options.onError(error, variables, context);
      }
      // Show error notification
      addNotification({
        type: 'error',
        message: error.response?.data?.message || error.message || 'An error occurred',
        persistent: false,
      });
    },
    ...options,
  });
};

// Generic PUT hook
export const usePut = (url, options = {}) => {
  const { setError, clearError, addNotification } = useAppContext();
  const queryClient = useQueryClient();
  const api = createApiInstance();

  return useMutation({
    mutationFn: async ({ id, data }) => {
      try {
        clearError();
        const response = await api.put(`${url}/${id}`, data);
        return response.data;
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
        setError(errorMessage);
        throw error;
      }
    },
    onSuccess: (data, variables, context) => {
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
      if (options.invalidateQueries) {
        queryClient.invalidateQueries({ queryKey: options.invalidateQueries });
      }
      addNotification({
        type: 'success',
        message: options.successMessage || 'Updated successfully',
        persistent: false,
      });
    },
    onError: (error, variables, context) => {
      if (options.onError) {
        options.onError(error, variables, context);
      }
      addNotification({
        type: 'error',
        message: error.response?.data?.message || error.message || 'Update failed',
        persistent: false,
      });
    },
    ...options,
  });
};

// Generic DELETE hook
export const useDelete = (url, options = {}) => {
  const { setError, clearError, addNotification } = useAppContext();
  const queryClient = useQueryClient();
  const api = createApiInstance();

  return useMutation({
    mutationFn: async (id) => {
      try {
        clearError();
        const response = await api.delete(`${url}/${id}`);
        return response.data;
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
        setError(errorMessage);
        throw error;
      }
    },
    onSuccess: (data, variables, context) => {
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
      if (options.invalidateQueries) {
        queryClient.invalidateQueries({ queryKey: options.invalidateQueries });
      }
      addNotification({
        type: 'success',
        message: options.successMessage || 'Deleted successfully',
        persistent: false,
      });
    },
    onError: (error, variables, context) => {
      if (options.onError) {
        options.onError(error, variables, context);
      }
      addNotification({
        type: 'error',
        message: error.response?.data?.message || error.message || 'Delete failed',
        persistent: false,
      });
    },
    ...options,
  });
};

// Check if backend is available
const isBackendAvailable = async () => {
  try {
    const response = await fetch(import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1/health');
    return response.ok;
  } catch (error) {
    return false;
  }
};

// Custom hooks for specific API endpoints
export const useProducts = (filters = {}) => {
  const queryString = new URLSearchParams(filters).toString();
  const url = `/products${queryString ? `?${queryString}` : ''}`;
  
  return useQuery({
    queryKey: ['products', filters],
    queryFn: async () => {
      // Check if we should use mock data
      if (shouldUseMockData()) {
        log('debug', 'Using mock data for products');
        
        // Simulate network delay for realistic feel
        await new Promise(resolve => setTimeout(resolve, config.MOCK_DATA_DELAY));
        
        let filteredProducts = [...mockProducts];
        
        // Apply filters to mock data
        if (filters.category) {
          filteredProducts = filteredProducts.filter(product => product.category === filters.category);
        }
        if (filters.search) {
          filteredProducts = searchProducts(filters.search);
        }
        if (filters.minPrice) {
          filteredProducts = filteredProducts.filter(product => product.price >= filters.minPrice);
        }
        if (filters.maxPrice) {
          filteredProducts = filteredProducts.filter(product => product.price <= filters.maxPrice);
        }
        
        return filteredProducts;
      }
      
      try {
        // Try to fetch from backend
        log('debug', 'Fetching products from backend');
        const response = await axios.get(getApiUrl(url));
        return response.data;
      } catch (error) {
        // Fallback to mock data if backend fails
        log('error', 'Backend failed, falling back to mock data', error);
        
        let filteredProducts = [...mockProducts];
        
        // Apply filters to mock data
        if (filters.category) {
          filteredProducts = filteredProducts.filter(product => product.category === filters.category);
        }
        if (filters.search) {
          filteredProducts = searchProducts(filters.search);
        }
        if (filters.minPrice) {
          filteredProducts = filteredProducts.filter(product => product.price >= filters.minPrice);
        }
        if (filters.maxPrice) {
          filteredProducts = filteredProducts.filter(product => product.price <= filters.maxPrice);
        }
        
        return filteredProducts;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useProduct = (id) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      try {
        // Try to fetch from backend first
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1'}/products/${id}`);
        return response.data;
      } catch (error) {
        // Fallback to mock data
        console.log('Backend not available, using mock data');
        return getProductById(id);
      }
    },
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useCreateProduct = () => {
  return usePost('/products', {
    invalidateQueries: ['products'],
    successMessage: 'Product created successfully',
  });
};

export const useUpdateProduct = () => {
  return usePut('/products', {
    invalidateQueries: ['products'],
    successMessage: 'Product updated successfully',
  });
};

export const useDeleteProduct = () => {
  return useDelete('/products', {
    invalidateQueries: ['products'],
    successMessage: 'Product deleted successfully',
  });
};

// Outlet hooks
export const useOutlets = (filters = {}) => {
  const queryString = new URLSearchParams(filters).toString();
  const url = `/outlets${queryString ? `?${queryString}` : ''}`;
  
  return useQuery({
    queryKey: ['outlets', filters],
    queryFn: async () => {
      // Check if we should force mock data
      if (shouldUseMockData()) {
        console.log('Using mock data (forced mode)');
        let filteredOutlets = [...mockOutlets];
        
        // Apply filters to mock data
        if (filters.location) {
          filteredOutlets = filteredOutlets.filter(outlet => 
            outlet.location.toLowerCase().includes(filters.location.toLowerCase())
          );
        }
        if (filters.status) {
          filteredOutlets = filteredOutlets.filter(outlet => outlet.status === filters.status);
        }
        
        return filteredOutlets;
      }
      
      try {
        // Try to fetch from backend first
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1'}${url}`);
        return response.data;
      } catch (error) {
        // Fallback to mock data
        console.log('Backend not available, using mock data');
        
        let filteredOutlets = [...mockOutlets];
        
        // Apply filters to mock data
        if (filters.location) {
          filteredOutlets = filteredOutlets.filter(outlet => 
            outlet.location.toLowerCase().includes(filters.location.toLowerCase())
          );
        }
        if (filters.status) {
          filteredOutlets = filteredOutlets.filter(outlet => outlet.status === filters.status);
        }
        
        return filteredOutlets;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useOutlet = (id) => {
  return useQuery({
    queryKey: ['outlet', id],
    queryFn: async () => {
      // Check if we should force mock data
      if (shouldUseMockData()) {
        console.log('Using mock data (forced mode)');
        return getOutletById(id);
      }
      
      try {
        // Try to fetch from backend first
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1'}/outlets/${id}`);
        return response.data;
      } catch (error) {
        // Fallback to mock data
        console.log('Backend not available, using mock data');
        return getOutletById(id);
      }
    },
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}; 