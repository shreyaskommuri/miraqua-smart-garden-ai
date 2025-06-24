
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Droplets, Thermometer, Sun, Calendar } from "lucide-react";

const AnalyticsScreen = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600">Track your garden's performance</p>
        </div>
      </header>

      <div className="px-6 py-6 space-y-8">
        {/* Period Selector */}
        <div className="flex space-x-2">
          <Badge className="bg-blue-100 text-blue-700 border-blue-200">This Week</Badge>
          <Badge variant="outline">This Month</Badge>
          <Badge variant="outline">This Year</Badge>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-0">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <Droplets className="w-8 h-8 text-blue-600" />
                <div className="flex items-center space-x-1">
                  <TrendingDown className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-600">-8%</span>
                </div>
              </div>
              <div className="text-2xl font-bold text-blue-900 mb-1">42.3L</div>
              <div className="text-sm text-blue-700">Water Used</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-0">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <Sun className="w-8 h-8 text-green-600" />
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-600">+12%</span>
                </div>
              </div>
              <div className="text-2xl font-bold text-green-900 mb-1">95%</div>
              <div className="text-sm text-green-700">Plant Health</div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Stats */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Garden Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Water Efficiency</span>
                  <span className="text-sm text-gray-600">87%</span>
                </div>
                <Progress value={87} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Optimal Moisture Days</span>
                  <span className="text-sm text-gray-600">6/7 days</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Growth Rate</span>
                  <span className="text-sm text-gray-600">Above Average</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Environmental Data */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Environmental Conditions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-4 bg-orange-50 rounded-xl">
                <Thermometer className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <div className="text-xl font-bold text-orange-900">73°F</div>
                <div className="text-sm text-orange-700">Avg Temperature</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-xl">
                <Droplets className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-xl font-bold text-blue-900">68%</div>
                <div className="text-sm text-blue-700">Avg Humidity</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Savings Summary */}
        <Card className="border-0 bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <TrendingUp className="w-6 h-6" />
              <h3 className="text-lg font-semibold">This Month's Impact</h3>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-2xl font-bold mb-1">23.5L</div>
                <div className="text-sm opacity-90">Water Saved</div>
              </div>
              <div>
                <div className="text-2xl font-bold mb-1">$12.40</div>
                <div className="text-sm opacity-90">Cost Savings</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Schedule Performance */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Schedule Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, index) => (
                <div key={day} className="flex items-center justify-between py-2">
                  <span className="text-sm font-medium text-gray-700">{day}</span>
                  <div className="flex items-center space-x-3">
                    <div className="w-16 text-xs text-gray-600">
                      {index < 5 ? '6:00 AM' : 'Rest'}
                    </div>
                    <div className={`w-3 h-3 rounded-full ${
                      index < 5 ? 'bg-green-500' : 'bg-gray-300'
                    }`}></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom safe area */}
      <div className="h-20"></div>
    </div>
  );
};

export default AnalyticsScreen;
