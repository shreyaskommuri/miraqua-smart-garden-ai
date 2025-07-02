
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Droplets, 
  Thermometer, 
  Sun, 
  MapPin, 
  Settings, 
  Activity,
  Wifi,
  WifiOff,
  Heart,
  TrendingUp,
  Calendar,
  AlertCircle
} from 'lucide-react';

interface PlotCardProps {
  plot: {
    id: string;
    name: string;
    crop: string;
    variety?: string;
    location: string;
    currentTemp: number;
    currentMoisture: number;
    currentSunlight: number;
    healthScore: number;
    nextWatering: string;
    isOnline?: boolean;
    lastWatered?: string;
    coordinates: {
      lat: number;
      lon: number;
    };
  };
  onClick?: () => void;
}

const PlotCard: React.FC<PlotCardProps> = ({ plot, onClick }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(`/app/plot/${plot.id}?lat=${plot.coordinates.lat}&lon=${plot.coordinates.lon}`);
    }
  };

  const handleSettingsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/app/plot/${plot.id}/settings?lat=${plot.coordinates.lat}&lon=${plot.coordinates.lon}`);
  };

  const getHealthColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getMoistureColor = (moisture: number) => {
    if (moisture >= 60) return 'bg-blue-500';
    if (moisture >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <Card 
      className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105 transform"
      onClick={handleCardClick}
    >
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-2xl">🍅</span>
              </div>
              {plot.isOnline !== false ? (
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                  <Wifi className="w-2.5 h-2.5 text-white" />
                </div>
              ) : (
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                  <WifiOff className="w-2.5 h-2.5 text-white" />
                </div>
              )}
            </div>
            
            <div>
              <CardTitle className="text-lg font-bold text-gray-900 dark:text-white">
                {plot.name}
              </CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {plot.crop} {plot.variety && `• ${plot.variety}`}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Badge className={`text-xs px-2 py-1 ${getHealthColor(plot.healthScore)}`}>
              <Heart className="w-3 h-3 mr-1" />
              {plot.healthScore}%
            </Badge>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleSettingsClick}
              className="hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Status Grid */}
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
            <Droplets className="w-5 h-5 text-blue-600 mx-auto mb-1" />
            <div className="text-lg font-bold text-gray-900 dark:text-white">
              {plot.currentMoisture}%
            </div>
            <div className="text-xs text-gray-500">Moisture</div>
          </div>
          
          <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
            <Thermometer className="w-5 h-5 text-orange-600 mx-auto mb-1" />
            <div className="text-lg font-bold text-gray-900 dark:text-white">
              {plot.currentTemp}°F
            </div>
            <div className="text-xs text-gray-500">Temperature</div>
          </div>
          
          <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
            <Sun className="w-5 h-5 text-yellow-600 mx-auto mb-1" />
            <div className="text-lg font-bold text-gray-900 dark:text-white">
              {plot.currentSunlight}%
            </div>
            <div className="text-xs text-gray-500">Sunlight</div>
          </div>
        </div>

        {/* Moisture Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-300">Soil Moisture</span>
            <span className="font-medium">{plot.currentMoisture}%</span>
          </div>
          <Progress 
            value={plot.currentMoisture} 
            className="h-2"
            style={{
              backgroundColor: 'rgb(229 231 235)',
            }}
          />
        </div>

        {/* Next Watering */}
        <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
              Next Watering
            </span>
          </div>
          <span className="text-sm font-bold text-blue-700 dark:text-blue-300">
            {plot.nextWatering}
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <MapPin className="w-4 h-4" />
          <span>{plot.location}</span>
        </div>

        {/* Last Activity */}
        {plot.lastWatered && (
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <Activity className="w-4 h-4" />
            <span>Last watered {plot.lastWatered}</span>
          </div>
        )}

        {/* Offline Warning */}
        {plot.isOnline === false && (
          <div className="flex items-center space-x-2 p-2 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg text-sm">
            <AlertCircle className="w-4 h-4" />
            <span>Device offline</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PlotCard;
