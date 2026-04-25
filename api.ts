import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

const api = axios.create({
  baseURL: API_URL,
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

export interface WebinarRegistrationData {
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  city?: string;
}

export interface WebinarRegistrationResponse {
  id: number;
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  city?: string;
  created_at: string;
}

export interface WebinarRegistrationFormData {
  first_name: string;
  last_name: string;
  email: string;
  phone_number?: string;
  industry: string;
  company_team_role: string;
  preferred_contact_method: string;
  consent_to_updates: boolean;
  webinar_session_id?: number;
}

export interface WebinarRegistrationFormResponse {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number?: string;
  industry: string;
  company_team_role: string;
  preferred_contact_method: string;
  consent_to_updates: string;
  webinar_session_id?: number;
  created_at: string;
}

export interface WebinarSessionCreate {
  title: string;
  description: string;
  speaker_name: string;
  speaker_role: string;
  date: string;
  time: string;
  duration: string;
  meeting_link?: string;
  is_active?: boolean;
}

export interface WebinarSessionResponse {
  id: number;
  title: string;
  description: string;
  speaker_name: string;
  speaker_role: string;
  date: string;
  time: string;
  duration: string;
  meeting_link?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CareerApplicationData {
  full_name: string;
  email: string;
  phone?: string;
  location?: string;
  education?: string;
  role: string;
  linkedin?: string;
  portfolio?: string;
  resume_url?: string;
  cover_letter?: string;
}

export interface CareerApplicationResponse {
  id: number;
  full_name: string;
  email: string;
  phone_number?: string;
  Location?: string;
  Education?: string;
  Role: string;
  linkedin?: string;
  portfolio?: string;
  Resume?: string;
  cover_letter?: string;
  created_at: string;
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

// Webinar API
export const webinarsApi = {
  register: (data: WebinarRegistrationData) => api.post<WebinarRegistrationResponse>('/api/webinar/register', data),
  registerForm: (data: WebinarRegistrationFormData) => api.post<WebinarRegistrationFormResponse>('/api/webinar/register-form', data),
  getAll: () => api.get<WebinarRegistrationResponse[]>('/api/webinar/'),
  // Admin endpoints
  createSession: (data: WebinarSessionCreate) => api.post<WebinarSessionResponse>('/api/webinar/admin/sessions', data),
  getSessions: () => api.get<WebinarSessionResponse[]>('/api/webinar/admin/sessions'),
  getSession: (id: number) => api.get<WebinarSessionResponse>(`/api/webinar/admin/sessions/${id}`),
  updateSession: (id: number, data: WebinarSessionCreate) => api.put<WebinarSessionResponse>(`/api/webinar/admin/sessions/${id}`, data),
  deleteSession: (id: number) => api.delete(`/api/webinar/admin/sessions/${id}`),
  // Public endpoints
  getActiveSessions: () => api.get<WebinarSessionResponse[]>('/api/webinar/sessions'),
};

// Career API
export const careerApi = {
  apply: async (formData: FormData) => {
    try {
      const apiInstance = axios.create({
        baseURL: API_URL,
        timeout: 30000, // 30 second timeout
        headers: {
          // Don't set Content-Type for FormData - let browser set it with boundary
        },
      });
      const response = await apiInstance.post<CareerApplicationResponse>('/api/careers/apply-file', formData);
      console.log('Career API response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Career API error:', error);
      throw error;
    }
  },
  getAll: () => api.get<CareerApplicationResponse[]>('/api/careers/apply/'),
};

export default api;