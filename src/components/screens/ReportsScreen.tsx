
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Download, Calendar, BarChart3, TrendingUp, Droplets } from "lucide-react";

const ReportsScreen = () => {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState("week");
  const [selectedPlot, setSelectedPlot] = useState("all");

  const reports = [
    {
      id: 1,
      title: "Water Usage Report",
      description: "Detailed analysis of water consumption",
      type: "usage",
      generated: "2 hours ago",
      format: "PDF"
    },
    {
      id: 2,
      title: "Moisture Trends",
      description: "Weekly moisture level analysis",
      type: "trends",
      generated: "1 day ago",
      format: "CSV"
    },
    {
      id: 3,
      title: "Efficiency Summary",
      description: "Water savings and optimization metrics",
      type: "efficiency",
      generated: "3 days ago",
      format: "PDF"
    }
  ];

  const stats = {
    totalWaterUsed: "142.5L",
    waterSaved: "23.8L",
    efficiency: "87%",
    avgMoisture: "68%"
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
              <h1 className="text-xl font-bold text-gray-900">Reports & Analytics</h1>
              <p className="text-sm text-gray-600">Export and analyze your garden data</p>
            </div>
          </div>
        </div>
      </header>

      <div className="px-6 py-6 space-y-6">
        {/* Filters */}
        <div className="flex space-x-4">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={selectedPlot} onValueChange={setSelectedPlot}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Plot" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Plots</SelectItem>
              <SelectItem value="1">Tomato Garden</SelectItem>
              <SelectItem value="2">Herb Corner</SelectItem>
              <SelectItem value="3">Pepper Patch</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <Droplets className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.totalWaterUsed}</div>
              <div className="text-sm text-gray-600">Water Used</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.waterSaved}</div>
              <div className="text-sm text-gray-600">Water Saved</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <BarChart3 className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.efficiency}</div>
              <div className="text-sm text-gray-600">Efficiency</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <Calendar className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.avgMoisture}</div>
              <div className="text-sm text-gray-600">Avg Moisture</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Export Actions */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Export</h3>
            <div className="grid grid-cols-2 gap-4">
              <Button 
                className="bg-white/20 hover:bg-white/30 text-white border-0"
                onClick={() => console.log('Export water usage')}
              >
                <Download className="w-4 h-4 mr-2" />
                Water Usage (CSV)
              </Button>
              <Button 
                className="bg-white/20 hover:bg-white/30 text-white border-0"
                onClick={() => console.log('Export schedule')}
              >
                <Download className="w-4 h-4 mr-2" />
                Schedule (PDF)
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Generated Reports */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Recent Reports</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {reports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{report.title}</h4>
                  <p className="text-sm text-gray-600 mb-2">{report.description}</p>
                  <div className="flex items-center space-x-3">
                    <Badge variant="outline" className="text-xs">
                      {report.format}
                    </Badge>
                    <span className="text-xs text-gray-500">Generated {report.generated}</span>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => console.log('Download report:', report.id)}
                >
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Custom Report Builder */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Create Custom Report</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Data Type</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select data type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="water">Water Usage</SelectItem>
                    <SelectItem value="moisture">Moisture Levels</SelectItem>
                    <SelectItem value="schedule">Watering Schedule</SelectItem>
                    <SelectItem value="efficiency">Efficiency Metrics</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF Report</SelectItem>
                    <SelectItem value="csv">CSV Data</SelectItem>
                    <SelectItem value="json">JSON Export</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              <Download className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReportsScreen;
