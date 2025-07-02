
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { ThemeSwitcher } from "@/components/ui/ThemeSwitcher";
import {
  Plus,
  Search,
  Settings,
  Bell,
  BarChart3,
  Loader2,
  AlertTriangle,
  RefreshCw,
  Wifi,
  WifiOff
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PlotCard from "@/components/PlotCard";
import { getPlots, Plot } from "@/services/mockDataService";

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [plots, setPlots] = useState<Plot[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const plotData = await getPlots();
        setPlots(plotData);
      } catch (err) {
        setError("Failed to load plots");
        toast({
          title: "Error",
          description: "Failed to load your plots. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  const filteredPlots = plots.filter(plot =>
    plot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    plot.crop.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Loading your gardens...</h3>
              <p className="text-gray-600 dark:text-gray-300">Please wait while we fetch your plot data</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
        <div className="p-6">
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-red-800 dark:text-red-400 mb-4">Oops! Something went wrong</h3>
              <p className="text-red-600 dark:text-red-300 mb-6 text-lg">{error}</p>
              <Button onClick={() => window.location.reload()} size="lg" className="bg-red-600 hover:bg-red-700">
                <RefreshCw className="w-5 h-5 mr-2" />
                Try Again
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Enhanced Header */}
      <header className="glass border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-40 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-3xl">🌱</span>
                </div>
              </div>
              
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Gardens</h1>
                <p className="text-gray-600 dark:text-gray-300">Manage and monitor your plots</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="btn-modern">
                <Bell className="w-4 h-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="btn-modern"
                onClick={() => navigate("/app/analytics")}
              >
                <BarChart3 className="w-4 h-4" />
              </Button>
              <ThemeSwitcher />
              <Button variant="ghost" size="sm" className="btn-modern" onClick={() => navigate("/app/account")}>
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <ScrollArea className="h-[calc(100vh-100px)]">
        <div className="p-6 space-y-6 pb-24">
          {/* Search Bar */}
          <div className="relative">
            <Input
              type="text"
              placeholder="Search plots..."
              className="rounded-full pl-10 pr-4 shadow-lg glass border-0"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400" />
          </div>

          {/* Status Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="glass border-0 shadow-xl">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                  {filteredPlots.filter(p => p.isOnline).length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300 flex items-center justify-center">
                  <Wifi className="w-4 h-4 mr-1" />
                  Online Plots
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass border-0 shadow-xl">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {filteredPlots.length > 0 ? Math.round(filteredPlots.reduce((sum, p) => sum + p.currentMoisture, 0) / filteredPlots.length) : 0}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Avg Moisture
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass border-0 shadow-xl">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                  {filteredPlots.length > 0 ? Math.round(filteredPlots.reduce((sum, p) => sum + p.healthScore, 0) / filteredPlots.length) : 0}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Avg Health
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Plots Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Your Plots ({filteredPlots.length})
              </h2>
            </div>
            
            {filteredPlots.length === 0 ? (
              <Card className="glass border-0 shadow-xl">
                <CardContent className="p-12 text-center">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-3xl">🌱</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {searchQuery ? 'No plots found' : 'No plots yet'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {searchQuery 
                      ? `No plots match "${searchQuery}". Try adjusting your search.`
                      : 'Create your first plot to start monitoring your garden.'
                    }
                  </p>
                  {!searchQuery && (
                    <Button 
                      onClick={() => navigate("/add-plot")}
                      className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white btn-modern"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Your First Plot
                    </Button>
                  )}
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPlots.map(plot => (
                  <PlotCard key={plot.id} plot={plot} />
                ))}
              </div>
            )}
          </div>
        </div>
      </ScrollArea>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 left-6 right-6 z-30">
        <Button
          onClick={() => navigate("/add-plot")}
          className="w-full h-16 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold text-lg rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 border-0 btn-modern"
        >
          <Plus className="w-6 h-6 mr-3" />
          Add New Plot
        </Button>
      </div>
    </div>
  );
};

export default HomeScreen;
