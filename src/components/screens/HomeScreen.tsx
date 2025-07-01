
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import OnboardingTutorial from "@/components/ui/OnboardingTutorial";
import PresenceIndicator from "@/components/ui/PresenceIndicator";
import { useOfflineData } from "@/hooks/useOfflineData";
import { useI18n } from "@/contexts/I18nContext";
import { useTheme } from "@/contexts/ThemeContext";
import { 
  Droplets, 
  Thermometer, 
  Sun, 
  Leaf, 
  Plus, 
  TrendingUp,
  TrendingDown,
  Activity,
  MapPin,
  Timer,
  CloudRain,
  MessageSquare,
  Camera,
  Wifi,
  WifiOff,
  Battery,
  AlertTriangle,
  Menu,
  Bell,
  Search,
  Moon,
  Lightbulb
} from "lucide-react";

interface PlotData {
  id: number;
  name: string;
  crop: string;
  moisture: number;
  temperature: number;
  sunlight: number;
  status: 'healthy' | 'warning' | 'critical';
  nextWatering: string;
  location: string;
  waterUsage: number;
  trend: 'up' | 'down' | 'stable';
  sensorStatus: 'online' | 'offline';
  batteryLevel: number;
  soilPh: number;
  lastWatered: string;
}

const HomeScreen = () => {
  const navigate = useNavigate();
  const { t } = useI18n();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { isOnline, getPendingActionsCount, addOfflineAction } = useOfflineData();
  
  const [plots, setPlots] = useState<PlotData[]>([]);
  const [loading, setLoading] = useState(true);
  const [showTutorial, setShowTutorial] = useState(false);
  const [systemStatus, setSystemStatus] = useState({
    totalWaterSaved: 847,
    activeSensors: 12,
    automationSavings: 34,
    alertsToday: 3
  });

  const tutorialSteps = [
    {
      id: 'welcome',
      title: 'Welcome to Miraqua!',
      description: 'Let\'s take a quick tour of your smart irrigation dashboard.',
      position: 'center' as const
    },
    {
      id: 'stats',
      title: 'System Overview',
      description: 'Here you can see your water savings and automation efficiency at a glance.',
      target: '[data-tutorial="stats"]',
      position: 'bottom' as const,
      highlight: true
    },
    {
      id: 'plots',
      title: 'Your Plots',
      description: 'Monitor all your garden plots with real-time sensor data and AI recommendations.',
      target: '[data-tutorial="plots"]',
      position: 'top' as const,
      highlight: true
    },
    {
      id: 'ai-help',
      title: 'AI Assistant',
      description: 'Click "AI Help" on any plot to get personalized gardening advice.',
      target: '[data-tutorial="ai-help"]',
      position: 'left' as const,
      action: 'Try clicking the AI Help button!'
    }
  ];

  useEffect(() => {
    // Check if user has seen tutorial
    const hasSeenTutorial = localStorage.getItem('miraqua-tutorial-completed');
    if (!hasSeenTutorial) {
      setTimeout(() => setShowTutorial(true), 2000);
    }

    // Simulate loading data
    setTimeout(() => {
      setPlots([
        {
          id: 1,
          name: "Tomato Garden",
          crop: "Cherry Tomatoes",
          moisture: 75,
          temperature: 72,
          sunlight: 85,
          status: 'healthy',
          nextWatering: "Tomorrow 6:00 AM",
          location: "North Plot",
          waterUsage: 15.2,
          trend: 'up',
          sensorStatus: 'online',
          batteryLevel: 87,
          soilPh: 6.8,
          lastWatered: "Yesterday 6:00 AM"
        },
        {
          id: 2,
          name: "Herb Corner",
          crop: "Mixed Herbs",
          moisture: 45,
          temperature: 74,
          sunlight: 92,
          status: 'warning',
          nextWatering: "Today 3:00 PM",
          location: "South Garden",
          waterUsage: 8.7,
          trend: 'down',
          sensorStatus: 'online',
          batteryLevel: 34,
          soilPh: 7.2,
          lastWatered: "2 days ago"
        },
        {
          id: 3,
          name: "Lettuce Bed",
          crop: "Butter Lettuce",
          moisture: 88,
          temperature: 68,
          sunlight: 78,
          status: 'healthy',
          nextWatering: "Tomorrow 8:00 AM",
          location: "East Side",
          waterUsage: 12.1,
          trend: 'stable',
          sensorStatus: 'offline',
          batteryLevel: 0,
          soilPh: 6.5,
          lastWatered: "Yesterday 8:00 AM"
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleChatWithPlot = (plot: PlotData) => {
    sessionStorage.setItem('selectedPlotForChat', JSON.stringify(plot));
    navigate('/app/chat');
  };

  const handleWaterNow = (plotId: number) => {
    if (isOnline) {
      console.log('Watering plot:', plotId);
    } else {
      addOfflineAction({
        type: 'watering',
        plotId: plotId.toString(),
        data: { timestamp: new Date().toISOString() }
      });
    }
  };

  const completeTutorial = () => {
    setShowTutorial(false);
    localStorage.setItem('miraqua-tutorial-completed', 'true');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-700 bg-green-100';
      case 'warning': return 'text-orange-700 bg-orange-100';
      case 'critical': return 'text-red-700 bg-red-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-500" />;
      default: return <Activity className="w-4 h-4 text-blue-500" />;
    }
  };

  const getSensorIcon = (status: string) => {
    return status === 'online' ? 
      <Wifi className="w-4 h-4 text-green-500" /> : 
      <WifiOff className="w-4 h-4 text-red-500" />;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="p-4 space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-32 bg-white dark:bg-gray-800 rounded-xl animate-pulse shadow-sm"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background transition-colors duration-200">
      {/* Enhanced Header - Fixed positioning with proper z-index */}
      <header className="bg-card/95 backdrop-blur-sm border-b border-border sticky top-0 z-50 shadow-sm">
        <div className="px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="text-xl sm:text-2xl font-bold text-foreground truncate">
                {t('nav.home')}
              </h1>
              <p className="text-sm text-muted-foreground truncate">
                Welcome back, Sarah
              </p>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
              {/* Offline indicator */}
              {!isOnline && (
                <Badge variant="outline" className="text-xs bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-700 hidden sm:flex">
                  Offline ({getPendingActionsCount()})
                </Badge>
              )}
              
              {/* Theme toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
                className="p-2 hover:bg-accent"
              >
                {resolvedTheme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </Button>
              
              {/* Tutorial trigger */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowTutorial(true)}
                className="p-2 hover:bg-accent hidden sm:flex"
              >
                <Lightbulb className="w-4 h-4" />
              </Button>
              
              {/* Notifications */}
              <Button variant="ghost" size="sm" className="p-2 relative hover:bg-accent">
                <Bell className="w-4 h-4" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full flex items-center justify-center">
                  <span className="text-xs text-destructive-foreground font-bold">3</span>
                </div>
              </Button>
              
              {/* Presence indicator */}
              <PresenceIndicator />
            </div>
          </div>
        </div>
      </header>

      <ScrollArea className="h-[calc(100vh-120px)]">
        <div className="p-4 space-y-6 pb-24">
          {/* System Overview Cards - Responsive grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4" data-tutorial="stats">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Droplets className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                  <span className="text-sm font-medium text-blue-900 dark:text-blue-300 truncate">
                    {t('home.waterSaved')}
                  </span>
                </div>
                <div className="text-2xl font-bold text-blue-900 dark:text-blue-300">
                  {systemStatus.totalWaterSaved}L
                </div>
                <div className="text-xs text-blue-700 dark:text-blue-400">This month</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Leaf className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                  <span className="text-sm font-medium text-green-900 dark:text-green-300 truncate">
                    {t('home.automation')}
                  </span>
                </div>
                <div className="text-2xl font-bold text-green-900 dark:text-green-300">
                  {systemStatus.automationSavings}%
                </div>
                <div className="text-xs text-green-700 dark:text-green-400">Efficiency</div>
              </CardContent>
            </Card>
          </div>

          {/* Weather Alert - Responsive */}
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 shadow-lg">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <CloudRain className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-base sm:text-lg font-semibold truncate">Heavy rain predicted in 2 days</p>
                    <p className="text-blue-100 text-sm truncate">Auto-adjusted watering schedule</p>
                  </div>
                </div>
                <Button size="sm" className="bg-white/20 hover:bg-white/30 text-white border-white/30 flex-shrink-0">
                  View
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Priority Tasks */}
          <div>
            <h2 className="text-lg font-bold text-foreground mb-4">
              {t('home.priorityTasks')}
            </h2>
            <div className="space-y-3">
              <Card className="border-0 shadow-sm bg-card">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-destructive rounded-full flex-shrink-0 mt-2"></div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">Low Battery Alert</p>
                      <p className="text-sm text-muted-foreground">
                        Herb Corner sensor needs battery replacement
                      </p>
                    </div>
                    <Badge className="bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 flex-shrink-0">
                      Urgent
                    </Badge>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-sm bg-card">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0 mt-2"></div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">Sensor Offline</p>
                      <p className="text-sm text-muted-foreground">
                        Lettuce Bed sensor lost connection
                      </p>
                    </div>
                    <Badge className="bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 flex-shrink-0">
                      High
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* My Plots - Dynamic and responsive */}
          <div data-tutorial="plots">
            <h2 className="text-lg font-bold text-foreground mb-4">
              {t('home.myPlots')}
            </h2>
            <div className="space-y-4">
              {plots.map((plot) => (
                <Card 
                  key={plot.id}
                  className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-all duration-200 bg-card hover:bg-accent/5"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3 gap-3">
                      <div className="flex items-center space-x-3 min-w-0 flex-1">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Leaf className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 dark:text-green-400" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-foreground truncate">{plot.name}</h3>
                          <p className="text-sm text-muted-foreground truncate">{plot.crop}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <MapPin className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                            <span className="text-xs text-muted-foreground truncate">{plot.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-1 flex-shrink-0">
                        <Badge className={`${getStatusColor(plot.status)} text-xs px-2 py-1 rounded-full`}>
                          {plot.status === 'healthy' ? 'Healthy' : 
                           plot.status === 'warning' ? 'Attention' : 'Critical'}
                        </Badge>
                        <div className="flex items-center space-x-1">
                          {getSensorIcon(plot.sensorStatus)}
                          <Battery className={`w-3 h-3 ${plot.batteryLevel > 30 ? 'text-green-500' : 'text-red-500'}`} />
                          <span className="text-xs text-muted-foreground">{plot.batteryLevel}%</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Responsive grid for metrics */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                      <div className="text-center">
                        <div className="text-base sm:text-lg font-bold text-foreground">{plot.moisture}%</div>
                        <div className="text-xs text-muted-foreground flex items-center justify-center">
                          <Droplets className="w-3 h-3 mr-1" />
                          Moisture
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-base sm:text-lg font-bold text-foreground">{plot.temperature}°F</div>
                        <div className="text-xs text-muted-foreground flex items-center justify-center">
                          <Thermometer className="w-3 h-3 mr-1" />
                          Temp
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-base sm:text-lg font-bold text-foreground">{plot.sunlight}%</div>
                        <div className="text-xs text-muted-foreground flex items-center justify-center">
                          <Sun className="w-3 h-3 mr-1" />
                          Light
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-base sm:text-lg font-bold text-foreground">{plot.soilPh}</div>
                        <div className="text-xs text-muted-foreground flex items-center justify-center">
                          pH Level
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm mb-3">
                      <div className="flex items-center text-muted-foreground min-w-0 flex-1">
                        <Timer className="w-4 h-4 mr-1 flex-shrink-0" />
                        <span className="truncate">Next: {plot.nextWatering}</span>
                      </div>
                      <div className="flex items-center space-x-1 flex-shrink-0">
                        <span className="font-medium text-foreground">{plot.waterUsage}L</span>
                        {getTrendIcon(plot.trend)}
                      </div>
                    </div>

                    {/* Responsive action buttons */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1 order-2 sm:order-1"
                        onClick={() => navigate(`/app/plot/${plot.id}?lat=37.7749&lon=-122.4194`)}
                      >
                        View Details
                      </Button>
                      <Button 
                        size="sm" 
                        className="bg-green-600 hover:bg-green-700 text-white flex-1 sm:flex-none order-1 sm:order-2"
                        onClick={() => handleChatWithPlot(plot)}
                        data-tutorial="ai-help"
                      >
                        <MessageSquare className="w-4 h-4 mr-1" />
                        AI Help
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => navigate(`/app/analytics/plant-health`)}
                        className="order-3 sm:flex-shrink-0"
                      >
                        <Camera className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Alert messages */}
                    {plot.sensorStatus === 'offline' && (
                      <div className="mt-3 p-2 bg-red-50 dark:bg-red-900/20 rounded-lg flex items-center space-x-2">
                        <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" />
                        <span className="text-sm text-red-700 dark:text-red-300">Sensor offline - Check connection</span>
                      </div>
                    )}
                    {plot.batteryLevel < 30 && (
                      <div className="mt-3 p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg flex items-center space-x-2">
                        <Battery className="w-4 h-4 text-orange-500 flex-shrink-0" />
                        <span className="text-sm text-orange-700 dark:text-orange-300">Low battery - Replace soon</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>

      {/* Tutorial Overlay */}
      <OnboardingTutorial
        steps={tutorialSteps}
        isVisible={showTutorial}
        onComplete={completeTutorial}
        onSkip={completeTutorial}
      />
    </div>
  );
};

export default HomeScreen;
