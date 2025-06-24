
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Droplets, Thermometer, Sun, Calendar, MoreVertical } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

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

const PlotCard = ({ plot }: PlotCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy": return "bg-green-100 text-green-800";
      case "needs-water": return "bg-yellow-100 text-yellow-800";
      case "overwatered": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "healthy": return "Healthy";
      case "needs-water": return "Needs Water";
      case "overwatered": return "Overwatered";
      default: return "Unknown";
    }
  };

  const getMoistureColor = (moisture: number) => {
    if (moisture >= 70) return "text-green-600";
    if (moisture >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-green-100 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg text-green-800 mb-1">{plot.name}</CardTitle>
            <CardDescription className="text-green-600">{plot.crop}</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={getStatusColor(plot.status)}>
              {getStatusText(plot.status)}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View Details</DropdownMenuItem>
                <DropdownMenuItem>Edit Settings</DropdownMenuItem>
                <DropdownMenuItem>Water Now</DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">Delete Plot</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <Droplets className={`w-5 h-5 mx-auto mb-1 ${getMoistureColor(plot.moisture)}`} />
            <div className={`text-lg font-bold ${getMoistureColor(plot.moisture)}`}>
              {plot.moisture}%
            </div>
            <div className="text-xs text-gray-600">Moisture</div>
          </div>

          <div className="text-center p-3 bg-orange-50 rounded-lg">
            <Thermometer className="w-5 h-5 text-orange-600 mx-auto mb-1" />
            <div className="text-lg font-bold text-orange-700">{plot.temperature}°F</div>
            <div className="text-xs text-gray-600">Temp</div>
          </div>

          <div className="text-center p-3 bg-yellow-50 rounded-lg">
            <Sun className="w-5 h-5 text-yellow-600 mx-auto mb-1" />
            <div className="text-lg font-bold text-yellow-700">{plot.sunlight}</div>
            <div className="text-xs text-gray-600">Lux</div>
          </div>
        </div>

        {/* Moisture Progress */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Soil Moisture</span>
            <span className={`text-sm font-medium ${getMoistureColor(plot.moisture)}`}>
              {plot.moisture}%
            </span>
          </div>
          <Progress value={plot.moisture} className="h-2" />
        </div>

        {/* Next Watering */}
        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-700">Next Watering</span>
          </div>
          <span className="text-sm font-bold text-green-800">{plot.nextWatering}</span>
        </div>

        {/* Actions */}
        <div className="flex space-x-2 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 border-green-200 text-green-700 hover:bg-green-50"
          >
            View Schedule
          </Button>
          <Button 
            size="sm" 
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
          >
            Water Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlotCard;
