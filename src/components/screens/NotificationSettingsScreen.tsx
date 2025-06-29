
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Bell, Mail, MessageSquare, Smartphone, Droplets, CloudRain, AlertTriangle, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const NotificationSettingsScreen = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [settings, setSettings] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const notificationGroups = [
    {
      id: "watering",
      title: "Watering Alerts",
      icon: Droplets,
      description: "Get notified about watering schedules and events",
      settings: [
        { key: "watering_started", label: "Watering Started", description: "When automatic watering begins" },
        { key: "watering_completed", label: "Watering Completed", description: "When watering cycle finishes" },
        { key: "watering_skipped", label: "Watering Skipped", description: "When scheduled watering is skipped" },
        { key: "low_moisture", label: "Low Moisture Alert", description: "When soil moisture drops below threshold" },
      ]
    },
    {
      id: "weather",
      title: "Weather Alerts",
      icon: CloudRain,
      description: "Weather-related notifications and updates",
      settings: [
        { key: "rain_detected", label: "Rain Detected", description: "When rain is detected by sensors" },
        { key: "weather_changes", label: "Weather Changes", description: "Significant weather pattern changes" },
        { key: "frost_warning", label: "Frost Warning", description: "When frost conditions are expected" },
        { key: "heat_warning", label: "Heat Warning", description: "During extreme heat conditions" },
      ]
    },
    {
      id: "system",
      title: "System & Device Alerts",
      icon: AlertTriangle,
      description: "Device status and system maintenance alerts",
      settings: [
        { key: "device_offline", label: "Device Offline", description: "When sensors or pumps go offline" },
        { key: "low_battery", label: "Low Battery", description: "When device batteries are low" },
        { key: "system_maintenance", label: "System Maintenance", description: "Scheduled maintenance notifications" },
        { key: "connectivity_issues", label: "Connectivity Issues", description: "Network or connection problems" },
      ]
    },
    {
      id: "collaboration",
      title: "Team & Sharing",
      icon: Users,
      description: "Collaboration and sharing notifications",
      settings: [
        { key: "team_comments", label: "Team Comments", description: "When team members add comments" },
        { key: "shared_actions", label: "Shared Actions", description: "When team members make changes" },
        { key: "new_invites", label: "New Invites", description: "When you're invited to join a garden" },
        { key: "permission_changes", label: "Permission Changes", description: "When your access level changes" },
      ]
    }
  ];

  const deliveryMethods = [
    { key: "push", label: "Push Notifications", icon: Smartphone, description: "Mobile app notifications" },
    { key: "email", label: "Email", icon: Mail, description: "Email notifications" },
    { key: "sms", label: "SMS", icon: MessageSquare, description: "Text message alerts" },
  ];

  useEffect(() => {
    loadNotificationSettings();
  }, []);

  const loadNotificationSettings = async () => {
    setIsLoading(true);
    setError("");
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Load default settings
      const defaultSettings = {};
      
      // Set default delivery methods
      deliveryMethods.forEach(method => {
        defaultSettings[method.key] = method.key === 'push'; // Only push enabled by default
      });
      
      // Set default notification preferences
      notificationGroups.forEach(group => {
        group.settings.forEach(setting => {
          defaultSettings[setting.key] = true; // All notifications enabled by default
        });
      });
      
      setSettings(defaultSettings);
    } catch (err) {
      setError("Failed to load notification settings. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Settings Saved",
        description: "Your notification preferences have been updated.",
      });
    } catch (err) {
      toast({
        title: "Save Failed",
        description: "Unable to save settings. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="px-6 py-4">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-xl font-bold text-gray-900">Notifications</h1>
            </div>
          </div>
        </header>
        
        <div className="px-6 py-6 space-y-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

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
              <h1 className="text-xl font-bold text-gray-900">Notifications</h1>
              <p className="text-sm text-gray-600">Manage your alert preferences</p>
            </div>
          </div>
        </div>
      </header>

      <ScrollArea className="h-screen">
        <div className="px-6 py-6 pb-32 space-y-6">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600">{error}</p>
              <Button 
                onClick={loadNotificationSettings}
                variant="outline"
                size="sm"
                className="mt-2"
              >
                Retry
              </Button>
            </div>
          )}

          {/* Delivery Methods */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Bell className="w-5 h-5 mr-2" />
                Delivery Methods
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {deliveryMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <div key={method.key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Icon className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="font-medium text-gray-900">{method.label}</p>
                        <p className="text-sm text-gray-600">{method.description}</p>
                      </div>
                    </div>
                    <Switch
                      checked={settings[method.key] || false}
                      onCheckedChange={(checked) => handleSettingChange(method.key, checked)}
                    />
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Notification Groups */}
          {notificationGroups.map((group) => {
            const GroupIcon = group.icon;
            return (
              <Card key={group.id} className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <GroupIcon className="w-5 h-5 mr-2" />
                    {group.title}
                  </CardTitle>
                  <p className="text-sm text-gray-600">{group.description}</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  {group.settings.map((setting) => (
                    <div key={setting.key} className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1 pr-4">
                        <p className="font-medium text-gray-900">{setting.label}</p>
                        <p className="text-sm text-gray-600">{setting.description}</p>
                      </div>
                      <Switch
                        checked={settings[setting.key] || false}
                        onCheckedChange={(checked) => handleSettingChange(setting.key, checked)}
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            );
          })}

          {/* Quiet Hours */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">Quiet Hours</CardTitle>
              <p className="text-sm text-gray-600">Disable non-urgent notifications during these hours</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Enable Quiet Hours</p>
                  <p className="text-sm text-gray-600">Pause non-critical notifications</p>
                </div>
                <Switch
                  checked={settings.quiet_hours_enabled || false}
                  onCheckedChange={(checked) => handleSettingChange("quiet_hours_enabled", checked)}
                />
              </div>
              
              {settings.quiet_hours_enabled && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                    <select className="w-full p-2 border border-gray-300 rounded-lg">
                      <option>10:00 PM</option>
                      <option>11:00 PM</option>
                      <option>12:00 AM</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                    <select className="w-full p-2 border border-gray-300 rounded-lg">
                      <option>6:00 AM</option>
                      <option>7:00 AM</option>
                      <option>8:00 AM</option>
                    </select>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Emergency Notifications */}
          <Card className="border-0 shadow-lg bg-red-50 border-red-200">
            <CardHeader>
              <CardTitle className="text-lg text-red-900">Emergency Notifications</CardTitle>
              <p className="text-sm text-red-700">
                Critical alerts that will always be delivered regardless of other settings
              </p>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-red-800 space-y-1">
                <li>• System failures or pump malfunctions</li>
                <li>• Severe weather warnings</li>
                <li>• Water leak detection</li>
                <li>• Security alerts</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>

      {/* Sticky Save Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 p-6">
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white"
        >
          {isSaving ? "Saving..." : "Save Settings"}
        </Button>
      </div>
    </div>
  );
};

export default NotificationSettingsScreen;
