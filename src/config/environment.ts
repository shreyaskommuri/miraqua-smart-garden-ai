
export interface EnvironmentConfig {
  API_BASE_URL: string;
  APP_ENV: 'development' | 'staging' | 'production';
  ENABLE_LOGGING: boolean;
  WEBSOCKET_URL: string;
  SENTRY_DSN?: string;
  ANALYTICS_ENABLED: boolean;
}

const getEnvironmentConfig = (): EnvironmentConfig => {
  // Default to development values, override with environment variables in production
  return {
    API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
    APP_ENV: (import.meta.env.VITE_APP_ENV as EnvironmentConfig['APP_ENV']) || 'development',
    ENABLE_LOGGING: import.meta.env.VITE_ENABLE_LOGGING !== 'false',
    WEBSOCKET_URL: import.meta.env.VITE_WEBSOCKET_URL || 'ws://localhost:8000/ws',
    SENTRY_DSN: import.meta.env.VITE_SENTRY_DSN,
    ANALYTICS_ENABLED: import.meta.env.VITE_ANALYTICS_ENABLED === 'true',
  };
};

export const config = getEnvironmentConfig();
