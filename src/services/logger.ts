
import { config } from '@/config/environment';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  data?: any;
  timestamp: string;
  userId?: string;
}

class Logger {
  private isDevelopment = config.APP_ENV === 'development';
  private enableLogging = config.ENABLE_LOGGING;

  private formatMessage(level: LogLevel, message: string, data?: any): LogEntry {
    return {
      level,
      message,
      data,
      timestamp: new Date().toISOString(),
      userId: this.getCurrentUserId(),
    };
  }

  private getCurrentUserId(): string | undefined {
    // This will be implemented when authentication is added
    return undefined;
  }

  private shouldLog(level: LogLevel): boolean {
    if (!this.enableLogging) return false;
    if (this.isDevelopment) return true;
    return level !== 'debug';
  }

  debug(message: string, data?: any) {
    if (this.shouldLog('debug')) {
      const entry = this.formatMessage('debug', message, data);
      console.log(`[DEBUG] ${entry.message}`, entry.data || '');
    }
  }

  info(message: string, data?: any) {
    if (this.shouldLog('info')) {
      const entry = this.formatMessage('info', message, data);
      console.log(`[INFO] ${entry.message}`, entry.data || '');
    }
  }

  warn(message: string, data?: any) {
    if (this.shouldLog('warn')) {
      const entry = this.formatMessage('warn', message, data);
      console.warn(`[WARN] ${entry.message}`, entry.data || '');
    }
  }

  error(message: string, error?: any) {
    if (this.shouldLog('error')) {
      const entry = this.formatMessage('error', message, error);
      console.error(`[ERROR] ${entry.message}`, entry.error || '');
      
      // In production, send to error tracking service
      if (config.APP_ENV === 'production' && config.SENTRY_DSN) {
        this.sendToErrorTracking(entry);
      }
    }
  }

  private sendToErrorTracking(entry: LogEntry) {
    // Implementation for Sentry or other error tracking service
    // This would be implemented when setting up error tracking
  }
}

export const logger = new Logger();
