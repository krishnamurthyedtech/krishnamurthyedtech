import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface ContactData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}

export interface ServiceResponse {
  id: number;
  title: string;
  description: string;
}

export interface ProductResponse {
  id: number;
  title: string;
  description: string;
}

export interface StatusResponse {
  status: string;
  app: string;
}

// Contact API
export const contactApi = {
  create: (data: ContactData) => api.post<ContactResponse>('/api/contact/', data),
  getAll: () => api.get<ContactResponse[]>('/api/contact/'),
};

// Services API
export const servicesApi = {
  getAll: () => api.get<ServiceResponse[]>('/api/services/'),
};

// Products API
export const productsApi = {
  getAll: () => api.get<ProductResponse[]>('/api/products/'),
};

// Status API
export const statusApi = {
  get: () => api.get<StatusResponse>('/api/status'),
};

export default api;