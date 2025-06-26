
interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
}

class Analytics {
  private static instance: Analytics;
  private enabled: boolean = true;

  static getInstance(): Analytics {
    if (!Analytics.instance) {
      Analytics.instance = new Analytics();
    }
    return Analytics.instance;
  }

  logEvent(name: string, properties?: Record<string, any>) {
    if (!this.enabled) return;
    
    try {
      // In production, this would send to your analytics service
      console.log('Analytics Event:', { name, properties, timestamp: new Date().toISOString() });
      
      // For now, store in sessionStorage for tracking
      const events = JSON.parse(sessionStorage.getItem('analytics_events') || '[]');
      events.push({ name, properties, timestamp: new Date().toISOString() });
      sessionStorage.setItem('analytics_events', JSON.stringify(events.slice(-100))); // Keep last 100 events
    } catch (error) {
      console.warn('Analytics tracking failed:', error);
    }
  }

  trackPageView(page: string) {
    this.logEvent('Page_View', { page });
  }

  trackUserAction(action: string, context?: Record<string, any>) {
    this.logEvent('User_Action', { action, ...context });
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }
}

export const analytics = Analytics.getInstance();

// Make analytics available globally for easy access
if (typeof window !== 'undefined') {
  (window as any).analytics = analytics;
}
