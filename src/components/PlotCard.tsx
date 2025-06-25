
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Droplets, Thermometer, Sun, Clock, TrendingUp, AlertTriangle } from "lucide-react";

interface PlotCardProps {
  plot: {
    id: number;
    name: string;
    crop: string;
    moisture: number;
    temperature: number;
    sunlight: number;
    nextWatering: string;
    status: string;
  };
}

const PlotCard: React.FC<PlotCardProps> = ({ plot }) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "healthy":
        return {
          color: "bg-green-100 text-green-700 border-green-200",
          icon: TrendingUp,
          iconColor: "text-green-600"
        };
      case "needs-water":
        return {
          color: "bg-yellow-100 text-yellow-700 border-yellow-200",
          icon: AlertTriangle,
          iconColor: "text-yellow-600"
        };
      default:
        return {
          color: "bg-gray-100 text-gray-700 border-gray-200",
          icon: TrendingUp,
          iconColor: "text-gray-600"
        };
    }
  };

  const statusConfig = getStatusConfig(plot.status);
  const StatusIcon = statusConfig.icon;

  return (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white overflow-hidden">
      <CardContent className="p-0">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-green-500 to-blue-600 p-4 text-white">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-bold">{plot.name}</h3>
            <StatusIcon className={`w-5 h-5 ${statusConfig.iconColor.replace('text-', 'text-white')}`} />
          </div>
          <p className="text-blue-100 text-sm">{plot.crop}</p>
        </div>

        {/* Metrics Grid */}
        <div className="p-5">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center p-3 bg-blue-50 rounded-xl">
              <Droplets className="w-5 h-5 text-blue-600 mx-auto mb-1" />
              <div className="text-lg font-bold text-blue-900">{plot.moisture}%</div>
              <div className="text-xs text-blue-700">Moisture</div>
              <Progress value={plot.moisture} className="h-1 mt-2" />
            </div>
            
            <div className="text-center p-3 bg-orange-50 rounded-xl">
              <Thermometer className="w-5 h-5 text-orange-600 mx-auto mb-1" />
              <div className="text-lg font-bold text-orange-900">{plot.temperature}°F</div>
              <div className="text-xs text-orange-700">Temp</div>
            </div>
            
            <div className="text-center p-3 bg-yellow-50 rounded-xl">
              <Sun className="w-5 h-5 text-yellow-600 mx-auto mb-1" />
              <div className="text-lg font-bold text-yellow-900">{plot.sunlight}</div>
              <div className="text-xs text-yellow-700">Lux</div>
            </div>
          </div>

          {/* Status and Next Watering */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Status</span>
              <Badge className={`border ${statusConfig.color}`}>
                {plot.status === "healthy" ? "Healthy" : "Needs Water"}
              </Badge>
            </div>
            
            <div className="flex items-center space-x-2 p-3 bg-green-50 rounded-xl">
              <Clock className="w-4 h-4 text-green-600" />
              <div className="flex-1">
                <div className="text-sm font-medium text-green-900">Next Watering</div>
                <div className="text-xs text-green-700">{plot.nextWatering}</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlotCard;
