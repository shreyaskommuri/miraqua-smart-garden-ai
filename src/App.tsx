
import React, { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CommandPalette } from "./components/ui/CommandPalette";
import { VoiceCommand } from "./components/ui/VoiceCommand";
import { NotificationPermission, PushNotificationManager } from "./components/ui/PushNotifications";
import { RealTimeProvider, RealTimeIndicator } from "./components/ui/RealTimeUpdates";
import MainTabs from "./components/navigation/MainTabs";
import Index from "./pages/Index";

const queryClient = new QueryClient();

const App: React.FC = () => {
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [isVoiceListening, setIsVoiceListening] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  // Command palette keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowCommandPalette(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Check existing notification permission
  useEffect(() => {
    if ('Notification' in window) {
      setNotificationsEnabled(Notification.permission === 'granted');
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <RealTimeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="w-full relative">
              {/* Real-time connection indicator */}
              <div className="fixed top-4 right-4 z-50">
                <RealTimeIndicator />
              </div>

              {/* Main app routes */}
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/app/*" element={<MainTabs />} />
              </Routes>

              {/* Command Palette */}
              <CommandPalette
                isOpen={showCommandPalette}
                onClose={() => setShowCommandPalette(false)}
              />

              {/* Voice Commands */}
              <VoiceCommand
                isListening={isVoiceListening}
                onToggleListening={() => setIsVoiceListening(!isVoiceListening)}
              />

              {/* Push Notifications */}
              <div className="fixed top-20 left-4 right-4 z-40">
                <NotificationPermission
                  onPermissionGranted={setNotificationsEnabled}
                />
              </div>
              
              <PushNotificationManager isEnabled={notificationsEnabled} />
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </RealTimeProvider>
    </QueryClientProvider>
  );
};

export default App;
