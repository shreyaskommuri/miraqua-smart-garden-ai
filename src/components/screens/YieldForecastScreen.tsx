
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  TrendingUp, 
  Calendar, 
  Leaf,
  BarChart3,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const YieldForecastScreen = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [forecastData, setForecastData] = useState<any>(null);
  const [selectedCrop, setSelectedCrop] = useState('tomatoes');

  useEffect(() => {
    fetchForecastData();
  }, [selectedCrop]);

  const fetchForecastData = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setForecastData({
        currentSeason: {
          crop: selectedCrop,
          projectedYield: 45.2,
          harvestDate: '2024-08-15',
          confidence: 87,
          factors: {
            weather: 'Favorable',
            soilHealth: 'Good',
            irrigation: 'Optimal'
          }
        },
        monthlyForecast: [
          { month: 'Jul', yield: 12.5, actual: null },
          { month: 'Aug', yield: 18.7, actual: null },
          { month: 'Sep', yield: 14.0, actual: null },
          { month: 'Oct', yield: 0, actual: null }
        ],
        historicalComparison: [
          { year: '2022', yield: 38.5 },
          { year: '2023', yield: 42.1 },
          { year: '2024', yield: 45.2 }
        ],
        optimizationTips: [
          'Increase nitrogen during flowering stage',
          'Monitor soil moisture more frequently',
          'Consider pruning for better air circulation'
        ]
      });
      setLoading(false);
    }, 1000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50">
        <header className="bg-white/90 backdrop-blur-sm border-b border-green-200 sticky top-0 z-40">
          <div className="px-4 py-4">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <h1 className="text-lg font-bold">Yield Forecast</h1>
            </div>
          </div>
        </header>
        <div className="p-4 space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50">
      <header className="bg-white/90 backdrop-blur-sm border-b border-green-200 sticky top-0 z-40">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div>
                <h1 className="text-lg font-bold text-green-900">Yield Forecast</h1>
                <p className="text-sm text-green-700">AI-powered harvest predictions</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={fetchForecastData}>
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <ScrollArea className="h-[calc(100vh-80px)]">
        <div className="p-4 space-y-6">
          {/* Current Season Overview */}
          <Card className="border-green-200 bg-gradient-to-r from-green-50 to-yellow-50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Leaf className="w-5 h-5 text-green-600" />
                <span>Current Season Forecast</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-800">
                    {forecastData.currentSeason.projectedYield} lbs
                  </div>
                  <div className="text-sm text-green-600">Projected Yield</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-green-800">
                    {forecastData.currentSeason.harvestDate}
                  </div>
                  <div className="text-sm text-green-600">Est. Harvest Date</div>
                </div>
              </div>
              
              <div className="mt-4 flex items-center justify-between">
                <Badge className="bg-green-100 text-green-800">
                  {forecastData.currentSeason.confidence}% Confidence
                </Badge>
                <div className="text-sm text-gray-600 capitalize">
                  {forecastData.currentSeason.crop}
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                <div className="p-2 bg-white rounded">
                  <div className="text-xs text-gray-500">Weather</div>
                  <div className="font-medium text-green-700">
                    {forecastData.currentSeason.factors.weather}
                  </div>
                </div>
                <div className="p-2 bg-white rounded">
                  <div className="text-xs text-gray-500">Soil Health</div>
                  <div className="font-medium text-green-700">
                    {forecastData.currentSeason.factors.soilHealth}
                  </div>
                </div>
                <div className="p-2 bg-white rounded">
                  <div className="text-xs text-gray-500">Irrigation</div>
                  <div className="font-medium text-green-700">
                    {forecastData.currentSeason.factors.irrigation}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Charts */}
          <Tabs defaultValue="monthly" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="monthly">Monthly Forecast</TabsTrigger>
              <TabsTrigger value="historical">Historical</TabsTrigger>
            </TabsList>
            
            <TabsContent value="monthly">
              <Card className="border-blue-200 bg-white/80">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    <span>Monthly Yield Projection</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={forecastData.monthlyForecast}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                      <XAxis dataKey="month" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#f8fafc',
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px'
                        }}
                      />
                      <Bar dataKey="yield" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="historical">
              <Card className="border-purple-200 bg-white/80">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                    <span>Year-over-Year Comparison</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={forecastData.historicalComparison}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f3e8ff" />
                      <XAxis dataKey="year" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#faf5ff',
                          border: '1px solid #e9d5ff',
                          borderRadius: '8px'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="yield" 
                        stroke="#8b5cf6" 
                        strokeWidth={3}
                        dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Optimization Tips */}
          <Card className="border-orange-200 bg-orange-50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-orange-600" />
                <span>Optimization Tips</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {forecastData.optimizationTips.map((tip: string, index: number) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm text-orange-800">{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
};

export default YieldForecastScreen;
