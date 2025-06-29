
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import { 
  User, 
  Settings, 
  Bell, 
  Shield, 
  HelpCircle, 
  LogOut, 
  ChevronRight, 
  Star, 
  Droplets, 
  Camera, 
  Eye, 
  EyeOff,
  Loader2,
  Globe,
  Moon,
  Sun,
  Trash2,
  CreditCard,
  FileText,
  Lock
} from "lucide-react";

interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  memberSince: string;
  totalPlots: number;
  waterSaved: number;
  isPremium: boolean;
  twoFactorEnabled: boolean;
  theme: 'light' | 'dark';
  language: string;
  timezone: string;
  plan: string;
}

const AccountScreen = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [profile, setProfile] = useState<UserProfile>({
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    avatar: "",
    memberSince: "March 2024",
    totalPlots: 5,
    waterSaved: 142,
    isPremium: true,
    twoFactorEnabled: false,
    theme: 'light',
    language: 'en',
    timezone: 'America/New_York',
    plan: 'Premium'
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const languages = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Español' },
    { value: 'hi', label: 'हिंदी' },
    { value: 'fr', label: 'Français' }
  ];

  const timezones = [
    { value: 'America/New_York', label: 'Eastern Time' },
    { value: 'America/Chicago', label: 'Central Time' },
    { value: 'America/Denver', label: 'Mountain Time' },
    { value: 'America/Los_Angeles', label: 'Pacific Time' },
    { value: 'UTC', label: 'UTC' }
  ];

  const validateProfile = () => {
    const newErrors: Record<string, string> = {};
    
    if (!profile.name.trim()) {
      newErrors.name = "Name is required";
    } else if (profile.name.length > 50) {
      newErrors.name = "Name must be less than 50 characters";
    }

    if (!profile.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(profile.email)) {
      newErrors.email = "Please enter a valid email";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveChanges = async () => {
    if (!validateProfile()) return;

    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Profile updated",
        description: "Your changes have been saved successfully.",
      });
      
      setIsDirty(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save changes. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleAvatarChange = async () => {
    // Create a file input element
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        try {
          // Simulate upload
          const reader = new FileReader();
          reader.onload = (e) => {
            const result = e.target?.result as string;
            setProfile(prev => ({ ...prev, avatar: result }));
            setIsDirty(true);
          };
          reader.readAsDataURL(file);
          
          toast({
            title: "Avatar updated",
            description: "Your profile picture has been changed.",
          });
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to upload avatar. Please try again.",
            variant: "destructive"
          });
        }
      }
    };
    
    input.click();
  };

  const handleToggle2FA = async () => {
    if (profile.twoFactorEnabled) {
      // Disable 2FA
      setProfile(prev => ({ ...prev, twoFactorEnabled: false }));
      toast({
        title: "2FA Disabled",
        description: "Two-factor authentication has been disabled.",
      });
    } else {
      // Enable 2FA - in real app, this would navigate to setup flow
      setProfile(prev => ({ ...prev, twoFactorEnabled: true }));
      toast({
        title: "2FA Enabled",
        description: "Two-factor authentication has been enabled.",
      });
    }
    setIsDirty(true);
  };

  const handleThemeChange = (theme: 'light' | 'dark') => {
    setProfile(prev => ({ ...prev, theme }));
    setIsDirty(true);
    // In real app, would update theme context
  };

  const handleLanguageChange = (language: string) => {
    setProfile(prev => ({ ...prev, language }));
    setIsDirty(true);
  };

  const handleTimezoneChange = (timezone: string) => {
    setProfile(prev => ({ ...prev, timezone }));
    setIsDirty(true);
  };

  const handleSignOut = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      navigate('/welcome');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleDeleteAccount = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Account deleted",
        description: "Your account has been permanently deleted.",
      });
      navigate('/welcome');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete account. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleCancel = () => {
    // Reset to original values - in real app, would fetch from server
    setProfile({
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      avatar: "",
      memberSince: "March 2024",
      totalPlots: 5,
      waterSaved: 142,
      isPremium: true,
      twoFactorEnabled: false,
      theme: 'light',
      language: 'en',
      timezone: 'America/New_York',
      plan: 'Premium'
    });
    setIsDirty(false);
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
          <p className="text-gray-600">Manage your profile and preferences</p>
        </div>
      </header>

      <ScrollArea className="h-[calc(100vh-140px)]">
        <div className="px-6 py-6 space-y-8 pb-32">
          {/* Profile Card */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>Profile Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Section */}
              <div className="flex items-center space-x-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={profile.avatar} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-green-500 text-white text-xl font-bold">
                    {profile.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <Button variant="outline" onClick={handleAvatarChange} className="flex items-center space-x-2">
                  <Camera className="w-4 h-4" />
                  <span>Change</span>
                </Button>
              </div>

              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => {
                    setProfile(prev => ({ ...prev, name: e.target.value }));
                    setIsDirty(true);
                    if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
                  }}
                  className={errors.name ? "border-red-500" : ""}
                  maxLength={50}
                />
                {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => {
                    setProfile(prev => ({ ...prev, email: e.target.value }));
                    setIsDirty(true);
                    if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                  }}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
              </div>

              {/* Member Since */}
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Member since</span>
                <span className="font-medium">{profile.memberSince}</span>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{profile.totalPlots}</div>
                  <div className="text-sm text-gray-600">Active Plots</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{profile.waterSaved}L</div>
                  <div className="text-sm text-gray-600">Water Saved</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>Security & Authentication</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Password */}
              <div className="flex items-center justify-between">
                <div>
                  <Label>Password</Label>
                  <p className="text-sm text-gray-600">••••••••</p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/forgot-password')}
                  className="flex items-center space-x-2"
                >
                  <Lock className="w-4 h-4" />
                  <span>Change Password</span>
                </Button>
              </div>

              {/* Two-Factor Authentication */}
              <div className="flex items-center justify-between">
                <div>
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-gray-600">
                    Add an extra layer of security to your account
                  </p>
                  <Badge variant={profile.twoFactorEnabled ? "default" : "secondary"} className="mt-1">
                    {profile.twoFactorEnabled ? "Enabled" : "Disabled"}
                  </Badge>
                </div>
                <Switch
                  checked={profile.twoFactorEnabled}
                  onCheckedChange={handleToggle2FA}
                />
              </div>
            </CardContent>
          </Card>

          {/* Preferences */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="w-5 h-5" />
                <span>Preferences</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Theme */}
              <div className="space-y-3">
                <Label>Theme</Label>
                <RadioGroup 
                  value={profile.theme} 
                  onValueChange={(value: 'light' | 'dark') => handleThemeChange(value)}
                  className="flex space-x-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="light" id="light" />
                    <Label htmlFor="light" className="flex items-center space-x-2 cursor-pointer">
                      <Sun className="w-4 h-4" />
                      <span>Light</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dark" id="dark" />
                    <Label htmlFor="dark" className="flex items-center space-x-2 cursor-pointer">
                      <Moon className="w-4 h-4" />
                      <span>Dark</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Language */}
              <div className="space-y-3">
                <Label>Language</Label>
                <RadioGroup 
                  value={profile.language} 
                  onValueChange={handleLanguageChange}
                  className="grid grid-cols-2 gap-4"
                >
                  {languages.map((lang) => (
                    <div key={lang.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={lang.value} id={lang.value} />
                      <Label htmlFor={lang.value} className="cursor-pointer">
                        {lang.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Timezone */}
              <div className="space-y-3">
                <Label>Timezone</Label>
                <RadioGroup 
                  value={profile.timezone} 
                  onValueChange={handleTimezoneChange}
                  className="space-y-2"
                >
                  {timezones.map((tz) => (
                    <div key={tz.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={tz.value} id={tz.value} />
                      <Label htmlFor={tz.value} className="cursor-pointer">
                        {tz.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Notification Settings */}
              <div onClick={() => navigate('/notifications')} className="cursor-pointer">
                <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex items-center space-x-3">
                    <Bell className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="font-medium">Notification Settings</p>
                      <p className="text-sm text-gray-600">Manage alerts and reminders</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* Subscription */}
              <div onClick={() => navigate('/subscription')} className="cursor-pointer">
                <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex items-center space-x-3">
                    <CreditCard className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="font-medium">Manage Subscription</p>
                      <p className="text-sm text-gray-600">Current plan: {profile.plan}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* Help & Support */}
              <div onClick={() => navigate('/help')} className="cursor-pointer">
                <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex items-center space-x-3">
                    <HelpCircle className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="font-medium">Help & Support</p>
                      <p className="text-sm text-gray-600">FAQs, contact support</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Legal Links */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Legal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <a href="/terms" className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-gray-600" />
                  <span className="font-medium">Terms of Service</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </a>
              
              <a href="/privacy" className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-gray-600" />
                  <span className="font-medium">Privacy Policy</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </a>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-red-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-red-600">Danger Zone</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="w-full">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Account
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your account
                      and remove all your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={handleDeleteAccount}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Delete Account
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>

      {/* Sticky Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 space-y-3">
        {isDirty && (
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="flex-1"
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveChanges}
              disabled={isSaving || !isDirty}
              className="flex-1"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        )}
        
        <Button
          variant="outline"
          className="w-full border-red-200 text-red-600 hover:bg-red-50"
          onClick={handleSignOut}
        >
          <LogOut className="w-5 h-5 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default AccountScreen;
