
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, Play, Square, Settings, Droplets, Clock, AlertTriangle } from "lucide-react";

const DeviceControlScreen = () => {
  const navigate = useNavigate();
  const [duration, setDuration] = useState([5]);

  const devices = [
    {
      id: 1,
      name: "Main Water Pump",
      type: "pump",
      status: "idle",
      plotName: "All Plots",
      flowRate: "0 L/min",
      pressure: "Normal",
      lastRun: "2 hours ago"
    },
    {
      id: 2,
      name: "Zone 1 Valve",
      type: "valve",
      status: "closed",
      plotName: "Tomato Garden",
      flowRate: "0 L/min",
      pressure: "Normal",
      lastRun: "3 hours ago"
    },
    {
      id: 3,
      name: "Zone 2 Valve",
      type: "valve",
      status: "running",
      plotName: "Herb Corner",
      flowRate: "2.3 L/min",
      pressure: "Normal",
      lastRun: "Running now",
      remainingTime: "12 min"
    },
    {
      id: 4,
      name: "Zone 3 Valve",
      type: "valve",
      status: "closed",
      plotName: "Pepper Patch",
      flowRate: "0 L/min",
      pressure: "Low",
      lastRun: "1 day ago"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'running': return 'bg-green-100 text-green-700 border-green-200';
      case 'idle': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'closed': return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'error': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getDeviceIcon = (type) => {
    switch (type) {
      case 'pump': return '⚙️';
      case 'valve': return '🔧';
      default: return '🔩';
    }
  };

  const handleStartWatering = (deviceId) => {
    console.log(`Starting watering for device ${deviceId} for ${duration[0]} minutes`);
  };

  const handleStopWatering = (deviceId) => {
    console.log(`Stopping watering for device ${deviceId}`);
  };

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
              <h1 className="text-xl font-bold text-gray-900">Device Control</h1>
              <p className="text-sm text-gray-600">Manage pumps and valves</p>
            </div>
          </div>
        </div>
      </header>

      <div className="px-6 py-6 space-y-6">
        {/* System Status */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-500 to-green-500 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">System Status</h3>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-300 rounded-full"></div>
                    <span className="text-sm">System Online</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Droplets className="w-4 h-4" />
                    <span className="text-sm">Water Pressure: Normal</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">
                  {devices.filter(d => d.status === 'running').length}
                </div>
                <div className="text-sm opacity-90">Active Zones</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Manual Control Panel */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Manual Control
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration: {duration[0]} minutes
              </label>
              <Slider
                value={duration}
                onValueChange={setDuration}
                max={60}
                min={1}
                step={1}
                className="w-full"
              />
            </div>
            
            <div className="flex items-center space-x-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              <div className="text-sm text-yellow-800">
                Manual watering will override scheduled watering. Use with caution.
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Device List */}
        <div className="space-y-4">
          {devices.map((device) => (
            <Card key={device.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="text-2xl">{getDeviceIcon(device.type)}</div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-gray-900">{device.name}</h3>
                        <Badge className={getStatusColor(device.status)}>
                          {device.status}
                        </Badge>
                        {device.status === 'running' && device.remainingTime && (
                          <Badge variant="outline" className="text-xs">
                            {device.remainingTime} left
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-1">Zone: {device.plotName}</p>
                      <p className="text-xs text-gray-500">Last run: {device.lastRun}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900 mb-1">{device.flowRate}</div>
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs px-2 py-1 rounded ${
                        device.pressure === 'Normal' ? 'bg-green-100 text-green-700' :
                        device.pressure === 'Low' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {device.pressure} Pressure
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Device Controls */}
                <div className="flex space-x-3">
                  {device.status === 'running' ? (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleStopWatering(device.id)}
                      className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
                    >
                      <Square className="w-4 h-4 mr-1" />
                      Stop
                    </Button>
                  ) : (
                    <Button 
                      size="sm" 
                      onClick={() => handleStartWatering(device.id)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                      disabled={device.pressure === 'Low'}
                    >
                      <Play className="w-4 h-4 mr-1" />
                      Start ({duration[0]}min)
                    </Button>
                  )}
                  
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => console.log('Configure device:', device.id)}
                  >
                    <Settings className="w-4 h-4 mr-1" />
                    Settings
                  </Button>
                </div>
                
                {device.pressure === 'Low' && (
                  <div className="mt-3 flex items-center space-x-2 p-2 bg-yellow-50 border border-yellow-200 rounded">
                    <AlertTriangle className="w-4 h-4 text-yellow-600" />
                    <span className="text-sm text-yellow-800">Low water pressure detected</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Emergency Stop */}
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6 text-center">
            <h3 className="font-semibold text-red-900 mb-2">Emergency Controls</h3>
            <p className="text-sm text-red-700 mb-4">Immediately stop all watering operations</p>
            <Button 
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={() => console.log('Emergency stop all devices')}
            >
              <Square className="w-4 h-4 mr-2" />
              Stop All Devices
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DeviceControlScreen;
