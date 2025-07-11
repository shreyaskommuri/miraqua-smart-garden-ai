
const environment = {
  isDevelopment: import.meta.env.MODE === 'development',
  isProduction: import.meta.env.MODE === 'production',
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  websocketUrl: import.meta.env.VITE_WEBSOCKET_URL || 'ws://localhost:3000/ws',
  enableLogging: import.meta.env.VITE_ENABLE_LOGGING === 'true' || import.meta.env.MODE === 'development'
};

export { environment };
