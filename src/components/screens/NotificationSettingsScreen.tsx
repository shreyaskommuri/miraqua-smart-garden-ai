
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Bell, Mail, MessageSquare, AlertTriangle } from "lucide-react";

const NotificationSettingsScreen = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    push: {
      enabled: true,
      watering: true,
      alerts: true,
      weather: false,
      maintenance: true
    },
    email: {
      enabled: true,
      daily: false,
      weekly: true,
      alerts: true,
      reports: true
    },
    sms: {
      enabled: false,
      emergencyOnly: true,
      alerts: false
    }
  });

  const updateSetting = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  const notificationTypes = [
    {
      id: 'watering',
      title: 'Watering Notifications',
      description: 'Get notified when watering starts, completes, or is skipped',
      icon: '💧'
    },
    {
      id: 'alerts',
      title: 'System Alerts',
      description: 'Critical alerts about device issues, low moisture, or sensor problems',
      icon: '⚠️'
    },
    {
      id: 'weather',
      title: 'Weather Updates',
      description: 'Rain forecasts, temperature changes, and weather-based schedule changes',
      icon: '🌤️'
    },
    {
      id: 'maintenance',
      title: 'Maintenance Reminders',
      description: 'Device maintenance, sensor calibration, and system health checks',
      icon: '🔧'
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
              <h1 className="text-xl font-bold text-gray-900">Notifications</h1>
              <p className="text-sm text-gray-600">Manage your alert preferences</p>
            </div>
          </div>
        </div>
      </header>

      <div className="px-6 py-6 space-y-6">
        {/* Push Notifications */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Bell className="w-5 h-5 mr-2" />
              Push Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <h4 className="font-medium text-blue-900">Enable Push Notifications</h4>
                <p className="text-sm text-blue-700">Receive notifications on this device</p>
              </div>
              <Switch
                checked={settings.push.enabled}
                onCheckedChange={(checked) => updateSetting('push', 'enabled', checked)}
              />
            </div>
            
            {settings.push.enabled && (
              <div className="space-y-3 pl-4 border-l-2 border-blue-200">
                {notificationTypes.map((type) => (
                  <div key={type.id} className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <span className="text-lg">{type.icon}</span>
                      <div>
                        <h5 className="font-medium text-gray-900">{type.title}</h5>
                        <p className="text-sm text-gray-600">{type.description}</p>
                      </div>
                    </div>
                    <Switch
                      checked={settings.push[type.id]}
                      onCheckedChange={(checked) => updateSetting('push', type.id, checked)}
                    />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Email Notifications */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Mail className="w-5 h-5 mr-2" />
              Email Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div>
                <h4 className="font-medium text-green-900">Enable Email Notifications</h4>
                <p className="text-sm text-green-700">Receive notifications via email</p>
              </div>
              <Switch
                checked={settings.email.enabled}
                onCheckedChange={(checked) => updateSetting('email', 'enabled', checked)}
              />
            </div>
            
            {settings.email.enabled && (
              <div className="space-y-3 pl-4 border-l-2 border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-medium text-gray-900">Daily Summary</h5>
                    <p className="text-sm text-gray-600">Daily watering and system status report</p>
                  </div>
                  <Switch
                    checked={settings.email.daily}
                    onCheckedChange={(checked) => updateSetting('email', 'daily', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-medium text-gray-900">Weekly Report</h5>
                    <p className="text-sm text-gray-600">Comprehensive weekly analytics and insights</p>
                  </div>
                  <Switch
                    checked={settings.email.weekly}
                    onCheckedChange={(checked) => updateSetting('email', 'weekly', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-medium text-gray-900">Critical Alerts</h5>
                    <p className="text-sm text-gray-600">System failures and urgent issues</p>
                  </div>
                  <Switch
                    checked={settings.email.alerts}
                    onCheckedChange={(checked) => updateSetting('email', 'alerts', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-medium text-gray-900">Data Reports</h5>
                    <p className="text-sm text-gray-600">Automated data exports and reports</p>
                  </div>
                  <Switch
                    checked={settings.email.reports}
                    onCheckedChange={(checked) => updateSetting('email', 'reports', checked)}
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* SMS Notifications */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <MessageSquare className="w-5 h-5 mr-2" />
              SMS Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div>
                <h4 className="font-medium text-purple-900">Enable SMS Notifications</h4>
                <p className="text-sm text-purple-700">Receive notifications via text message</p>
              </div>
              <Switch
                checked={settings.sms.enabled}
                onCheckedChange={(checked) => updateSetting('sms', 'enabled', checked)}
              />
            </div>
            
            {settings.sms.enabled && (
              <div className="space-y-3 pl-4 border-l-2 border-purple-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-medium text-gray-900">Emergency Only</h5>
                    <p className="text-sm text-gray-600">Only critical system failures</p>
                  </div>
                  <Switch
                    checked={settings.sms.emergencyOnly}
                    onCheckedChange={(checked) => updateSetting('sms', 'emergencyOnly', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-medium text-gray-900">All Alerts</h5>
                    <p className="text-sm text-gray-600">All system alerts and warnings</p>
                  </div>
                  <Switch
                    checked={settings.sms.alerts}
                    onCheckedChange={(checked) => updateSetting('sms', 'alerts', checked)}
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quiet Hours */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Quiet Hours</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">Set hours when non-critical notifications should be silenced</p>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                <Select defaultValue="22:00">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="20:00">8:00 PM</SelectItem>
                    <SelectItem value="21:00">9:00 PM</SelectItem>
                    <SelectItem value="22:00">10:00 PM</SelectItem>
                    <SelectItem value="23:00">11:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                <Select defaultValue="07:00">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="06:00">6:00 AM</SelectItem>
                    <SelectItem value="07:00">7:00 AM</SelectItem>
                    <SelectItem value="08:00">8:00 AM</SelectItem>
                    <SelectItem value="09:00">9:00 AM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-gray-600" />
              <div className="text-sm text-gray-700">
                Critical alerts will still be delivered during quiet hours
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <Button 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12"
          onClick={() => {
            console.log('Saving notification settings:', settings);
            navigate(-1);
          }}
        >
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default NotificationSettingsScreen;
