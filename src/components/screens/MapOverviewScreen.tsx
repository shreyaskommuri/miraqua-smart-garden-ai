
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Droplets, Thermometer, Sun, Settings } from "lucide-react";

const MapOverviewScreen = () => {
  const navigate = useNavigate();
  const [selectedPlot, setSelectedPlot] = useState(null);

  const plots = [
    {
      id: 1,
      name: "Tomato Garden",
      crop: "Tomatoes",
      latitude: 37.7749,
      longitude: -122.4194,
      moisture: 85,
      temperature: 72,
      status: "optimal",
      nextWatering: "2h 15m"
    },
    {
      id: 2,
      name: "Herb Corner",
      crop: "Basil & Oregano",
      latitude: 37.7751,
      longitude: -122.4196,
      moisture: 45,
      temperature: 71,
      status: "needs-water",
      nextWatering: "4h 30m"
    },
    {
      id: 3,
      name: "Pepper Patch",
      crop: "Bell Peppers",
      latitude: 37.7747,
      longitude: -122.4192,
      moisture: 42,
      temperature: 75,
      status: "attention",
      nextWatering: "Now"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-6 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Map Overview</h1>
              <p className="text-sm text-gray-600">{plots.length} plots</p>
            </div>
          </div>
        </div>
      </header>

      <div className="px-6 py-6">
        {/* Map Container */}
        <Card className="border-0 shadow-lg bg-white mb-6">
          <CardContent className="p-0">
            <div className="relative w-full h-96 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg">
              {/* Map grid overlay */}
              <div className="absolute inset-0 opacity-20">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="absolute w-full h-px bg-gray-300" style={{ top: `${i * 8.33}%` }} />
                ))}
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="absolute h-full w-px bg-gray-300" style={{ left: `${i * 8.33}%` }} />
                ))}
              </div>
              
              {/* Plot pins */}
              {plots.map((plot, index) => (
                <div
                  key={plot.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                  style={{
                    left: `${30 + index * 20}%`,
                    top: `${40 + index * 10}%`
                  }}
                  onClick={() => setSelectedPlot(plot)}
                >
                  <div className="relative">
                    <div className={`w-8 h-8 rounded-full border-3 border-white shadow-lg transition-transform group-hover:scale-110 ${
                      plot.status === 'optimal' ? 'bg-green-500' :
                      plot.status === 'needs-water' ? 'bg-yellow-500' :
                      plot.status === 'attention' ? 'bg-red-500' : 'bg-gray-500'
                    }`}>
                      <MapPin className="w-4 h-4 text-white m-1" />
                    </div>
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-black/80 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                        {plot.name}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Map controls */}
              <div className="absolute top-4 right-4 space-y-2">
                <Button size="sm" variant="outline" className="w-10 h-10 p-0 bg-white">
                  +
                </Button>
                <Button size="sm" variant="outline" className="w-10 h-10 p-0 bg-white">
                  -
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Legend */}
        <Card className="border-0 shadow-md bg-white mb-6">
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Status Legend</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span className="text-sm">Optimal</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                <span className="text-sm">Needs Water</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                <span className="text-sm">Attention</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Selected Plot Details */}
        {selectedPlot && (
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{selectedPlot.name}</h3>
                  <p className="text-gray-600">{selectedPlot.crop}</p>
                </div>
                <Badge className={`${
                  selectedPlot.status === 'optimal' ? 'bg-green-100 text-green-700' :
                  selectedPlot.status === 'needs-water' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {selectedPlot.status === 'optimal' ? 'Optimal' : 
                   selectedPlot.status === 'needs-water' ? 'Needs Water' : 'Attention'}
                </Badge>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <Droplets className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                  <div className="text-lg font-bold text-blue-900">{selectedPlot.moisture}%</div>
                  <div className="text-xs text-blue-700">Moisture</div>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <Thermometer className="w-6 h-6 text-orange-600 mx-auto mb-1" />
                  <div className="text-lg font-bold text-orange-900">{selectedPlot.temperature}°F</div>
                  <div className="text-xs text-orange-700">Temperature</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <Sun className="w-6 h-6 text-green-600 mx-auto mb-1" />
                  <div className="text-lg font-bold text-green-900">Good</div>
                  <div className="text-xs text-green-700">Sunlight</div>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <Button 
                  onClick={() => navigate(`/plot/${selectedPlot.id}`)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  View Details
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => console.log('Water now:', selectedPlot.id)}
                  className="px-6"
                >
                  Water Now
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MapOverviewScreen;
