import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useAppContext } from '../context/AppContext';

// Base API configuration
const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1',
  timeout: 10000,
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

// Custom hooks for specific API endpoints
export const useProducts = (filters = {}) => {
  const queryString = new URLSearchParams(filters).toString();
  const url = `/products${queryString ? `?${queryString}` : ''}`;
  
  return useGet(['products', filters], url, {
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useProduct = (id) => {
  return useGet(['product', id], `/products/${id}`, {
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
  
  return useGet(['outlets', filters], url, {
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useOutlet = (id) => {
  return useGet(['outlet', id], `/outlets/${id}`, {
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}; 