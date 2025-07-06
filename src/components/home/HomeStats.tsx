
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Wifi } from "lucide-react";
import { Plot } from "@/services/mockDataService";

interface HomeStatsProps {
  plots: Plot[];
}

export const HomeStats: React.FC<HomeStatsProps> = ({ plots }) => {
  const onlinePlots = plots.filter(p => p.isOnline).length;
  const avgMoisture = plots.length > 0 
    ? Math.round(plots.reduce((sum, p) => sum + p.currentMoisture, 0) / plots.length) 
    : 0;
  const avgHealth = plots.length > 0 
    ? Math.round(plots.reduce((sum, p) => sum + p.healthScore, 0) / plots.length) 
    : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardContent className="p-6 text-center">
          <div className="text-2xl font-bold text-green-600 mb-1">{onlinePlots}</div>
          <div className="text-sm text-gray-600 flex items-center justify-center">
            <Wifi className="w-4 h-4 mr-1" />
            Online Plots
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6 text-center">
          <div className="text-2xl font-bold text-blue-600 mb-1">{avgMoisture}%</div>
          <div className="text-sm text-gray-600">Avg Moisture</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6 text-center">
          <div className="text-2xl font-bold text-orange-600 mb-1">{avgHealth}%</div>
          <div className="text-sm text-gray-600">Avg Health</div>
        </CardContent>
      </Card>
    </div>
  );
};
