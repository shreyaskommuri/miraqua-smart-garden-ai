
import { config } from '@/config/environment';
import { logger } from './logger';
import { Plot, WeatherData, SensorReading, Device } from './mockDataService';

export interface ApiError {
  message: string;
  status: number;
  code?: string;
}

class ApiService {
  private baseURL: string;
  private authToken: string | null = null;

  constructor() {
    this.baseURL = config.API_BASE_URL;
  }

  setAuthToken(token: string | null) {
    this.authToken = token;
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.authToken) {
      headers.Authorization = `Bearer ${this.authToken}`;
    }

    try {
      logger.debug(`API Request: ${options.method || 'GET'} ${url}`);
      
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const error: ApiError = {
          message: errorData.message || `HTTP ${response.status}: ${response.statusText}`,
          status: response.status,
          code: errorData.code,
        };
        logger.error(`API Error: ${error.message}`, error);
        throw error;
      }

      const data = await response.json();
      logger.debug(`API Response: ${url}`, data);
      return data;
    } catch (error) {
      if (error instanceof Error && error.name === 'TypeError') {
        // Network error
        const networkError: ApiError = {
          message: 'Network error - please check your connection',
          status: 0,
        };
        logger.error('Network error', error);
        throw networkError;
      }
      throw error;
    }
  }

  // Plot endpoints
  async getPlots(): Promise<Plot[]> {
    return this.makeRequest<Plot[]>('/plots');
  }

  async getPlot(id: string): Promise<Plot> {
    return this.makeRequest<Plot>(`/plots/${id}`);
  }

  async createPlot(plotData: Partial<Plot>): Promise<Plot> {
    return this.makeRequest<Plot>('/plots', {
      method: 'POST',
      body: JSON.stringify(plotData),
    });
  }

  async updatePlot(id: string, plotData: Partial<Plot>): Promise<Plot> {
    return this.makeRequest<Plot>(`/plots/${id}`, {
      method: 'PUT',
      body: JSON.stringify(plotData),
    });
  }

  async deletePlot(id: string): Promise<void> {
    return this.makeRequest<void>(`/plots/${id}`, {
      method: 'DELETE',
    });
  }

  // Weather endpoints
  async getWeatherData(plotId?: string): Promise<WeatherData> {
    const endpoint = plotId ? `/weather/${plotId}` : '/weather';
    return this.makeRequest<WeatherData>(endpoint);
  }

  // Sensor endpoints
  async getSensorReadings(plotId: string): Promise<SensorReading[]> {
    return this.makeRequest<SensorReading[]>(`/plots/${plotId}/sensors`);
  }

  // Device endpoints
  async getDevices(): Promise<Device[]> {
    return this.makeRequest<Device[]>('/devices');
  }

  async getDevicesByPlot(plotId: string): Promise<Device[]> {
    return this.makeRequest<Device[]>(`/plots/${plotId}/devices`);
  }

  async controlDevice(deviceId: string, action: string, params?: any): Promise<void> {
    return this.makeRequest<void>(`/devices/${deviceId}/control`, {
      method: 'POST',
      body: JSON.stringify({ action, params }),
    });
  }

  // Irrigation endpoints
  async waterPlot(plotId: string, duration?: number): Promise<void> {
    return this.makeRequest<void>(`/plots/${plotId}/water`, {
      method: 'POST',
      body: JSON.stringify({ duration }),
    });
  }

  // Authentication endpoints
  async login(email: string, password: string): Promise<{ token: string; user: any }> {
    const response = await this.makeRequest<{ token: string; user: any }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    this.setAuthToken(response.token);
    return response;
  }

  async logout(): Promise<void> {
    await this.makeRequest<void>('/auth/logout', {
      method: 'POST',
    });
    this.setAuthToken(null);
  }

  async refreshToken(): Promise<{ token: string }> {
    const response = await this.makeRequest<{ token: string }>('/auth/refresh', {
      method: 'POST',
    });
    
    this.setAuthToken(response.token);
    return response;
  }
}

export const apiService = new ApiService();
