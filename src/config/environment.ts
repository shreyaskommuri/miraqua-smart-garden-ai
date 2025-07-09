
const environment = {
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  apiUrl: process.env.VITE_API_URL || 'http://localhost:3000/api',
  websocketUrl: process.env.VITE_WEBSOCKET_URL || 'ws://localhost:3000/ws',
  enableLogging: process.env.VITE_ENABLE_LOGGING === 'true' || process.env.NODE_ENV === 'development'
};

export { environment };
