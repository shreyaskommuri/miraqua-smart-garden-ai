
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
  const [retryCount, setRetryCount] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const plotData = await getPlots();
      setPlots(plotData);
      setRetryCount(0);
    } catch (err) {
      console.error("Failed to load plots:", err);
      setError("Failed to load plots");
      if (retryCount < 3) {
        setTimeout(() => {
          setRetryCount(prev => prev + 1);
          fetchData();
        }, 1000 * (retryCount + 1));
      } else {
        toast({
          title: "Connection Error",
          description: "Unable to load your plots. Please check your connection and try again.",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredPlots = plots.filter(plot =>
    plot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    plot.crop.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate statistics
  const onlinePlots = filteredPlots.filter(p => p.isOnline).length;
  const avgMoisture = filteredPlots.length > 0 
    ? Math.round(filteredPlots.reduce((sum, p) => sum + p.currentMoisture, 0) / filteredPlots.length) 
    : 0;
  const avgHealth = filteredPlots.length > 0 
    ? Math.round(filteredPlots.reduce((sum, p) => sum + p.healthScore, 0) / filteredPlots.length) 
    : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center space-y-4">
            <Loader2 className="w-12 h-12 animate-spin text-green-600 mx-auto" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Loading your gardens...</h3>
            <p className="text-gray-600 dark:text-gray-300">Please wait while we fetch your plot data</p>
            {retryCount > 0 && (
              <p className="text-sm text-yellow-600">Retrying... ({retryCount}/3)</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (error && retryCount >= 3) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
        <div className="flex items-center justify-center min-h-screen p-6">
          <Card className="max-w-md w-full">
            <CardContent className="p-8 text-center">
              <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-red-800 dark:text-red-400 mb-2">Connection Failed</h3>
              <p className="text-red-600 dark:text-red-300 mb-6">{error}</p>
              <Button onClick={() => {
                setRetryCount(0);
                fetchData();
              }} className="bg-red-600 hover:bg-red-700">
                <RefreshCw className="w-4 h-4 mr-2" />
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
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-40">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🌱</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">My Gardens</h1>
                <p className="text-sm text-gray-600 dark:text-gray-300">Manage and monitor your plots</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => navigate("/app/analytics")}>
                <BarChart3 className="w-4 h-4" />
              </Button>
              <ThemeSwitcher />
              <Button variant="ghost" size="sm" onClick={() => navigate("/app/account")}>
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <ScrollArea className="h-[calc(100vh-100px)]">
        <div className="p-6 space-y-6 pb-24">
          {/* Search */}
          <div className="relative">
            <Input
              type="text"
              placeholder="Search plots..."
              className="pl-10 rounded-xl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
          </div>

          {/* Stats */}
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

          {/* Plots */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Your Plots ({filteredPlots.length})
            </h2>
            
            {filteredPlots.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-3xl">🌱</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {searchQuery ? 'No plots found' : 'No plots yet'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {searchQuery 
                      ? `No plots match "${searchQuery}"`
                      : 'Create your first plot to start monitoring your garden'
                    }
                  </p>
                  {!searchQuery && (
                    <Button onClick={() => navigate("/add-plot")} className="bg-green-600 hover:bg-green-700">
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

      {/* FAB */}
      <div className="fixed bottom-6 right-6">
        <Button
          onClick={() => navigate("/add-plot")}
          className="w-14 h-14 bg-green-600 hover:bg-green-700 rounded-full shadow-lg"
        >
          <Plus className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
};

export default HomeScreen;
