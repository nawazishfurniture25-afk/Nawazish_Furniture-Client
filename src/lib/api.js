import axios from 'axios';

// API base URL from environment
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 15000,
});

// Request interceptor — add auth token if exists
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('nawazish_admin_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor — handle 401 globally
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('nawazish_admin_token');
            localStorage.removeItem('nawazish_admin_user');
        }
        return Promise.reject(error);
    }
);

// ==================== PRODUCTS ====================
export const getProducts = (params = {}) =>
    api.get('/products', { params });
export const getProduct = (slugOrId) => api.get(`/products/${slugOrId}`);
export const getCategories = () => api.get('/products/categories/list');

// ==================== ORDERS ====================
export const createOrder = (data) => api.post('/orders', data);
export const verifyPayment = (data) => api.post('/orders/verify', data);
export const trackOrder = (orderNumber, phone) =>
    api.get(`/orders/track/${orderNumber}`, { params: { phone } });

// ==================== ENQUIRIES ====================
export const createEnquiry = (data) => api.post('/enquiries', data);

// ==================== AUTH ====================
export const login = (data) => api.post('/auth/login', data);
export const getMe = () => api.get('/auth/me');

// ==================== ADMIN ====================
export const getOrders = (params = {}) => api.get('/orders', { params });
export const updateOrderStatus = (id, data) =>
    api.put(`/orders/${id}/status`, data);
export const getEnquiries = (params = {}) =>
    api.get('/enquiries', { params });
export const updateEnquiry = (id, data) =>
    api.put(`/enquiries/${id}`, data);
export const createProduct = (data) => api.post('/products', data);
export const updateProduct = (id, data) =>
    api.put(`/products/${id}`, data);
export const deleteProduct = (id) => api.delete(`/products/${id}`);

// ==================== IMAGE UPLOAD ====================
export const uploadImage = (file) => {
    const formData = new FormData();
    formData.append('image', file);
    return api.post('/upload/single', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};

export const uploadMultipleImages = (files) => {
    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append('images', file));
    return api.post('/upload/multiple', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};

export const deleteImageFromCloud = (publicId) =>
    api.delete('/upload/delete', { data: { publicId } });

export default api;