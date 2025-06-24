
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Settings, Bell, Shield, HelpCircle, LogOut, ChevronRight, Star, Droplets } from "lucide-react";

const AccountScreen = () => {
  const menuItems = [
    { icon: User, title: "Profile Settings", subtitle: "Update your personal information", path: "/profile" },
    { icon: Bell, title: "Notifications", subtitle: "Manage alerts and reminders", path: "/notifications" },
    { icon: Shield, title: "Privacy & Security", subtitle: "Password, 2FA, data settings", path: "/security" },
    { icon: Settings, title: "App Preferences", subtitle: "Units, themes, and display", path: "/preferences" },
    { icon: HelpCircle, title: "Help & Support", subtitle: "FAQs, contact support", path: "/help" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Account</h1>
          <p className="text-gray-600">Manage your profile and settings</p>
        </div>
      </header>

      <div className="px-6 py-6 space-y-8">
        {/* Profile Card */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-1">Sarah Johnson</h3>
                <p className="text-blue-100 mb-2">sarah.j@email.com</p>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-white/20 text-white border-white/30">
                    <Star className="w-3 h-3 mr-1" />
                    Premium Member
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">5</div>
              <div className="text-xs text-gray-600">Active Plots</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">142L</div>
              <div className="text-xs text-gray-600">Water Saved</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">89</div>
              <div className="text-xs text-gray-600">Days Active</div>
            </CardContent>
          </Card>
        </div>

        {/* Menu Items */}
        <div className="space-y-3">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link key={index} to={item.path}>
                <Card className="border-0 shadow-md hover:shadow-lg transition-shadow duration-200">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                        <Icon className="w-6 h-6 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{item.title}</h3>
                        <p className="text-sm text-gray-500">{item.subtitle}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Premium Upgrade */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <Star className="w-5 h-5" />
                  <span className="font-semibold">Miraqua Pro</span>
                </div>
                <p className="text-sm opacity-90 mb-4">
                  Unlock advanced analytics, unlimited plots, and priority support
                </p>
                <Button 
                  size="sm" 
                  className="bg-white text-orange-600 hover:bg-gray-100"
                >
                  Upgrade Now
                </Button>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Droplets className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* App Info */}
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <div className="text-center space-y-2">
              <p className="text-sm text-gray-600">Miraqua v1.2.3</p>
              <div className="flex justify-center space-x-6 text-sm">
                <button className="text-blue-600 hover:underline">Privacy Policy</button>
                <button className="text-blue-600 hover:underline">Terms of Service</button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sign Out */}
        <Button
          variant="outline"
          className="w-full h-12 border-red-200 text-red-600 hover:bg-red-50"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Sign Out
        </Button>
      </div>

      {/* Bottom safe area */}
      <div className="h-20"></div>
    </div>
  );
};

export default AccountScreen;
