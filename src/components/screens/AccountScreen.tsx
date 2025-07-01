
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
import { useTheme } from "@/contexts/ThemeContext";
import { useI18n } from "@/contexts/I18nContext";
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
  theme: 'light' | 'dark' | 'system';
  language: string;
  timezone: string;
  plan: string;
}

const AccountScreen = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { language, setLanguage } = useI18n();
  
  const [profile, setProfile] = useState<UserProfile>({
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    avatar: "",
    memberSince: "March 2024",
    totalPlots: 5,
    waterSaved: 142,
    isPremium: true,
    twoFactorEnabled: false,
    theme: 'system',
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

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    setProfile(prev => ({ ...prev, theme: newTheme }));
    setIsDirty(true);
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage as 'en' | 'es' | 'hi' | 'fr');
    setProfile(prev => ({ ...prev, language: newLanguage }));
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
    <div className="min-h-screen bg-background transition-colors duration-200">
      {/* Header - Fixed with proper spacing */}
      <header className="bg-card border-b border-border sticky top-0 z-40 shadow-sm">
        <div className="px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-foreground">Account Settings</h1>
              <p className="text-muted-foreground text-sm sm:text-base">Manage your profile and preferences</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
              className="p-2"
            >
              {resolvedTheme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </header>

      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="px-4 sm:px-6 py-6 space-y-6 sm:space-y-8 pb-32">
          {/* Profile Card */}
          <Card className="border-0 shadow-lg bg-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>Profile Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Section - Responsive */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
                <Avatar className="w-16 h-16 sm:w-20 sm:h-20">
                  <AvatarImage src={profile.avatar} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-green-500 text-white text-lg sm:text-xl font-bold">
                    {profile.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <Button variant="outline" onClick={handleAvatarChange} className="flex items-center space-x-2">
                  <Camera className="w-4 h-4" />
                  <span>Change Photo</span>
                </Button>
              </div>

              {/* Form fields with proper spacing */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
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
                    className={errors.name ? "border-destructive" : ""}
                    maxLength={50}
                  />
                  {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                </div>

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
                    className={errors.email ? "border-destructive" : ""}
                  />
                  {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                </div>
              </div>

              {/* Member Since */}
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm text-muted-foreground">Member since</span>
                <span className="font-medium text-foreground">{profile.memberSince}</span>
              </div>

              {/* Stats - Responsive grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{profile.totalPlots}</div>
                  <div className="text-sm text-muted-foreground">Active Plots</div>
                </div>
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">{profile.waterSaved}L</div>
                  <div className="text-sm text-muted-foreground">Water Saved</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="border-0 shadow-lg bg-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>Security & Authentication</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Password */}
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <Label>Password</Label>
                  <p className="text-sm text-muted-foreground">••••••••</p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/forgot-password')}
                  className="flex items-center space-x-2 flex-shrink-0"
                >
                  <Lock className="w-4 h-4" />
                  <span className="hidden sm:inline">Change Password</span>
                  <span className="sm:hidden">Change</span>
                </Button>
              </div>

              {/* Two-Factor Authentication */}
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">
                    Add an extra layer of security to your account
                  </p>
                  <Badge variant={profile.twoFactorEnabled ? "default" : "secondary"} className="mt-1">
                    {profile.twoFactorEnabled ? "Enabled" : "Disabled"}
                  </Badge>
                </div>
                <Switch
                  checked={profile.twoFactorEnabled}
                  onCheckedChange={handleToggle2FA}
                  className="flex-shrink-0"
                />
              </div>
            </CardContent>
          </Card>

          {/* Preferences */}
          <Card className="border-0 shadow-lg bg-card">
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
                  value={theme} 
                  onValueChange={(value: 'light' | 'dark' | 'system') => handleThemeChange(value)}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-4"
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
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="system" id="system" />
                    <Label htmlFor="system" className="flex items-center space-x-2 cursor-pointer">
                      <Settings className="w-4 h-4" />
                      <span>System</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Language */}
              <div className="space-y-3">
                <Label>Language</Label>
                <RadioGroup 
                  value={language} 
                  onValueChange={handleLanguageChange}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
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
                <div className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
                  <div className="flex items-center space-x-3">
                    <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <div>
                      <p className="font-medium">Notification Settings</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Manage alerts and reminders</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* Subscription */}
              <div onClick={() => navigate('/subscription')} className="cursor-pointer">
                <div className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
                  <div className="flex items-center space-x-3">
                    <CreditCard className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <div>
                      <p className="font-medium">Manage Subscription</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Current plan: {profile.plan}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* Help & Support */}
              <div onClick={() => navigate('/help')} className="cursor-pointer">
                <div className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
                  <div className="flex items-center space-x-3">
                    <HelpCircle className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <div>
                      <p className="font-medium">Help & Support</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">FAQs, contact support</p>
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
              <a href="/terms" className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <span className="font-medium">Terms of Service</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </a>
              
              <a href="/privacy" className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <span className="font-medium">Privacy Policy</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </a>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-red-200 dark:border-red-800 shadow-lg">
            <CardHeader>
              <CardTitle className="text-red-600 dark:text-red-400">Danger Zone</CardTitle>
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

      {/* Sticky Action Buttons - Fixed positioning */}
      <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t border-border p-4 space-y-3 z-30">
        {isDirty && (
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
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
          className="w-full border-red-200 dark:border-red-700 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
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
