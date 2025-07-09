
import { environment } from '@/config/environment';
import { logger } from './logger';

interface ApiResponse<T = any> {
  data: T;
  success: boolean;
  message?: string;
}

interface RequestOptions extends RequestInit {
  timeout?: number;
}

class ApiService {
  private baseURL: string;
  private defaultTimeout: number = 10000;

  constructor() {
    this.baseURL = environment.apiUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const { timeout = this.defaultTimeout, ...fetchOptions } = options;
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const url = `${this.baseURL}${endpoint}`;
      logger.info('API Request', { method: options.method || 'GET', url });

      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...((fetchOptions.headers as Record<string, string>) || {})
      };

      // Add auth token if available
      const token = localStorage.getItem('auth_token');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(url, {
        ...fetchOptions,
        headers,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      logger.info('API Response', { url, status: response.status });
      return data;

    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof Error) {
        logger.error('API Error', { endpoint, error: error.message });
        throw error;
      }
      
      throw new Error('Unknown API error occurred');
    }
  }

  // CRUD Operations
  async get<T>(endpoint: string, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  async post<T>(endpoint: string, data?: any, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: any, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }

  // Specific API endpoints
  async getPlots() {
    return this.get('/plots');
  }

  async getPlot(id: string) {
    return this.get(`/plots/${id}`);
  }

  async getSensorData(plotId: string) {
    return this.get(`/plots/${plotId}/sensors`);
  }

  async getWeatherData(lat: number, lon: number) {
    return this.get(`/weather?lat=${lat}&lon=${lon}`);
  }

  async updateWateringSchedule(plotId: string, schedule: any) {
    return this.put(`/plots/${plotId}/schedule`, schedule);
  }

  async triggerWatering(plotId: string, duration: number) {
    return this.post(`/plots/${plotId}/water`, { duration });
  }
}

export const apiService = new ApiService();
