
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Droplets, Thermometer, Sun, Calendar, MoreVertical, ArrowRight } from "lucide-react";
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
      case "healthy": return "bg-green-100 text-green-700 border-green-200";
      case "needs-water": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "overwatered": return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
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
    <Card className="border-0 bg-white shadow-sm hover:shadow-md transition-all duration-200">
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1">{plot.name}</h3>
            <p className="text-sm text-gray-500">{plot.crop}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={`text-xs border ${getStatusColor(plot.status)}`}>
              {getStatusText(plot.status)}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="w-6 h-6 p-0">
                  <MoreVertical className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View Details</DropdownMenuItem>
                <DropdownMenuItem>Water Now</DropdownMenuItem>
                <DropdownMenuItem>Edit Settings</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="text-center p-2 bg-blue-50 rounded-lg">
            <Droplets className={`w-4 h-4 mx-auto mb-1 ${getMoistureColor(plot.moisture)}`} />
            <div className={`text-sm font-semibold ${getMoistureColor(plot.moisture)}`}>
              {plot.moisture}%
            </div>
          </div>
          <div className="text-center p-2 bg-orange-50 rounded-lg">
            <Thermometer className="w-4 h-4 text-orange-600 mx-auto mb-1" />
            <div className="text-sm font-semibold text-orange-600">{plot.temperature}°F</div>
          </div>
          <div className="text-center p-2 bg-yellow-50 rounded-lg">
            <Sun className="w-4 h-4 text-yellow-600 mx-auto mb-1" />
            <div className="text-sm font-semibold text-yellow-600">{plot.sunlight}</div>
          </div>
        </div>

        {/* Next Watering */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-3">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-700">{plot.nextWatering}</span>
          </div>
        </div>

        {/* Action Button */}
        <Button 
          className="w-full bg-blue-500 hover:bg-blue-600 text-white h-10"
        >
          View Details
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default PlotCard;
