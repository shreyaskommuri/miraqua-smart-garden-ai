
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, MapPin, Droplets, Thermometer, Sun, Settings } from "lucide-react";

const MapOverviewScreen = () => {
  const navigate = useNavigate();
  const [selectedPlot, setSelectedPlot] = useState<any>(null);

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
      {/* Fixed Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-40 shadow-sm">
        <div className="px-4 py-3">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="p-2">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Map Overview</h1>
              <p className="text-xs text-gray-600">{plots.length} plots</p>
            </div>
          </div>
        </div>
      </header>

      {/* Scrollable Content */}
      <ScrollArea className="h-screen">
        <div className="pt-16 pb-24 px-4">
          <div className="space-y-4">
            {/* Map Container */}
            <Card className="border-0 shadow-lg bg-white">
              <CardContent className="p-0">
                <div className="relative w-full h-80 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg">
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
                        <div className={`w-6 h-6 rounded-full border-2 border-white shadow-lg transition-transform group-hover:scale-110 ${
                          plot.status === 'optimal' ? 'bg-green-500' :
                          plot.status === 'needs-water' ? 'bg-yellow-500' :
                          plot.status === 'attention' ? 'bg-red-500' : 'bg-gray-500'
                        }`}>
                          <MapPin className="w-3 h-3 text-white m-0.5" />
                        </div>
                        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="bg-black/80 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                            {plot.name}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Map controls */}
                  <div className="absolute top-3 right-3 space-y-2">
                    <Button size="sm" variant="outline" className="w-8 h-8 p-0 bg-white text-xs">
                      +
                    </Button>
                    <Button size="sm" variant="outline" className="w-8 h-8 p-0 bg-white text-xs">
                      -
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Legend */}
            <Card className="border-0 shadow-md bg-white">
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Status Legend</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Optimal</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm">Needs Water</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm">Attention</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Selected Plot Details */}
            {selectedPlot && (
              <Card className="border-0 shadow-lg bg-white">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-gray-900">{selectedPlot.name}</h3>
                      <p className="text-sm text-gray-600">{selectedPlot.crop}</p>
                    </div>
                    <Badge className={`text-xs ${
                      selectedPlot.status === 'optimal' ? 'bg-green-100 text-green-700' :
                      selectedPlot.status === 'needs-water' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {selectedPlot.status === 'optimal' ? 'Optimal' : 
                       selectedPlot.status === 'needs-water' ? 'Needs Water' : 'Attention'}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <Droplets className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                      <div className="text-sm font-bold text-blue-900">{selectedPlot.moisture}%</div>
                      <div className="text-xs text-blue-700">Moisture</div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <Thermometer className="w-5 h-5 text-orange-600 mx-auto mb-1" />
                      <div className="text-sm font-bold text-orange-900">{selectedPlot.temperature}°F</div>
                      <div className="text-xs text-orange-700">Temperature</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <Sun className="w-5 h-5 text-green-600 mx-auto mb-1" />
                      <div className="text-sm font-bold text-green-900">Good</div>
                      <div className="text-xs text-green-700">Sunlight</div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      onClick={() => navigate(`/plot/${selectedPlot.id}`)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm"
                    >
                      View Details
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => console.log('Water now:', selectedPlot.id)}
                      className="px-4 text-sm"
                    >
                      Water Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default MapOverviewScreen;
