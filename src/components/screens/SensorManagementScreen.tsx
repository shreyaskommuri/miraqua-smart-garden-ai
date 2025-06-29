
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Plus, Wifi, WifiOff, Battery, Settings, Activity, AlertTriangle } from "lucide-react";

const SensorManagementScreen = () => {
  const navigate = useNavigate();

  const sensors = [
    {
      id: 1,
      name: "Soil Moisture Probe #1",
      type: "moisture",
      plotName: "Tomato Garden",
      status: "online",
      batteryLevel: 85,
      lastReading: "2 minutes ago",
      value: "68%",
      signal: "strong"
    },
    {
      id: 2,
      name: "Temperature Sensor #1",
      type: "temperature",
      plotName: "Herb Corner",
      status: "online",
      batteryLevel: 67,
      lastReading: "5 minutes ago",
      value: "72°F",
      signal: "good"
    },
    {
      id: 3,
      name: "Rain Gauge #1",
      type: "rain",
      plotName: "All Plots",
      status: "offline",
      batteryLevel: 12,
      lastReading: "2 hours ago",
      value: "0.0 in",
      signal: "weak"
    },
    {
      id: 4,
      name: "Flow Meter #1",
      type: "flow",
      plotName: "Pepper Patch",
      status: "online",
      batteryLevel: 92,
      lastReading: "1 minute ago",
      value: "2.3 L/min",
      signal: "strong"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'bg-green-100 text-green-700 border-green-200';
      case 'offline': return 'bg-red-100 text-red-700 border-red-200';
      case 'warning': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getSensorIcon = (type) => {
    switch (type) {
      case 'moisture': return '💧';
      case 'temperature': return '🌡️';
      case 'rain': return '🌧️';
      case 'flow': return '🔄';
      default: return '📊';
    }
  };

  const getSignalIcon = (signal, status) => {
    if (status === 'offline') return <WifiOff className="w-4 h-4 text-red-600" />;
    return <Wifi className={`w-4 h-4 ${
      signal === 'strong' ? 'text-green-600' :
      signal === 'good' ? 'text-yellow-600' : 'text-red-600'
    }`} />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Sensors</h1>
                <p className="text-sm text-gray-600">{sensors.length} devices connected</p>
              </div>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Sensor
            </Button>
          </div>
        </div>
      </header>

      <div className="px-6 py-6 space-y-6">
        {/* Status Overview */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {sensors.filter(s => s.status === 'online').length}
              </div>
              <div className="text-sm text-gray-600">Online</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">
                {sensors.filter(s => s.status === 'offline').length}
              </div>
              <div className="text-sm text-gray-600">Offline</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {sensors.filter(s => s.batteryLevel < 20).length}
              </div>
              <div className="text-sm text-gray-600">Low Battery</div>
            </CardContent>
          </Card>
        </div>

        {/* Sensor List */}
        <div className="space-y-4">
          {sensors.map((sensor) => (
            <Card key={sensor.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="text-2xl">{getSensorIcon(sensor.type)}</div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-gray-900">{sensor.name}</h3>
                        <Badge className={getStatusColor(sensor.status)}>
                          {sensor.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">Assigned to: {sensor.plotName}</p>
                      <p className="text-xs text-gray-500">Last reading: {sensor.lastReading}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-xl font-bold text-gray-900 mb-1">{sensor.value}</div>
                    <div className="flex items-center space-x-2">
                      {getSignalIcon(sensor.signal, sensor.status)}
                      <Battery className={`w-4 h-4 ${
                        sensor.batteryLevel > 50 ? 'text-green-600' :
                        sensor.batteryLevel > 20 ? 'text-yellow-600' : 'text-red-600'
                      }`} />
                      <span className="text-xs text-gray-600">{sensor.batteryLevel}%</span>
                    </div>
                  </div>
                </div>
                
                {/* Battery Level Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600">Battery Level</span>
                    <span className="text-sm font-medium">{sensor.batteryLevel}%</span>
                  </div>
                  <Progress 
                    value={sensor.batteryLevel} 
                    className={`h-2 ${
                      sensor.batteryLevel > 50 ? '' :
                      sensor.batteryLevel > 20 ? 'bg-yellow-100' : 'bg-red-100'
                    }`} 
                  />
                  {sensor.batteryLevel < 20 && (
                    <div className="flex items-center space-x-1 mt-1">
                      <AlertTriangle className="w-3 h-3 text-red-600" />
                      <span className="text-xs text-red-600">Low battery warning</span>
                    </div>
                  )}
                </div>
                
                {/* Actions */}
                <div className="flex space-x-3">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => console.log('View sensor details:', sensor.id)}
                    className="flex-1"
                  >
                    <Activity className="w-4 h-4 mr-1" />
                    View Data
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => console.log('Configure sensor:', sensor.id)}
                  >
                    <Settings className="w-4 h-4 mr-1" />
                    Configure
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add Sensor CTA */}
        <Card className="border-2 border-dashed border-gray-200 bg-gray-50">
          <CardContent className="p-8 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Plus className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-medium text-gray-900 mb-1">Add New Sensor</h3>
            <p className="text-sm text-gray-500 mb-4">Connect soil moisture, temperature, or flow sensors</p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Sensor
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SensorManagementScreen;
