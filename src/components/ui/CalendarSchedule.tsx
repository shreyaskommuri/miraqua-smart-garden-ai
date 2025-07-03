
import React from 'react';
import { Card, CardContent } from './card';
import { Badge } from './badge';
import { Button } from './button';
import { cn } from '@/lib/utils';
import { Droplets, Calendar, Plus, Minus, ChevronRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface ScheduleDay {
  date: string;
  dayOfWeek: string;
  morning?: { time: string; duration: number; volume: number };
  afternoon?: { time: string; duration: number; volume: number };
  evening?: { time: string; duration: number; volume: number };
  hasWatering: boolean;
  isToday?: boolean;
}

interface CalendarScheduleProps {
  schedule: ScheduleDay[];
  onDayClick?: (day: ScheduleDay) => void;
  className?: string;
  showManualControls?: boolean;
  onVolumeAdjust?: (date: string, adjustment: number) => void;
}

export const CalendarSchedule: React.FC<CalendarScheduleProps> = ({
  schedule,
  onDayClick,
  className,
  showManualControls = false,
  onVolumeAdjust
}) => {
  const isMobile = useIsMobile();

  const getTimeSlotColor = (slot: { time: string; duration: number; volume: number }) => {
    if (slot.volume >= 20) return 'bg-gradient-to-r from-blue-600 to-blue-700';
    if (slot.volume >= 10) return 'bg-gradient-to-r from-blue-500 to-blue-600';
    return 'bg-gradient-to-r from-blue-400 to-blue-500';
  };

  const getDayColor = (day: ScheduleDay) => {
    if (day.isToday) return 'ring-2 ring-emerald-400 bg-emerald-50 border-emerald-200';
    if (day.hasWatering) return 'bg-blue-50 border-blue-200';
    return 'bg-white border-gray-200';
  };

  const getTotalVolume = (day: ScheduleDay) => {
    return (day.morning?.volume || 0) + (day.afternoon?.volume || 0) + (day.evening?.volume || 0);
  };

  const handleVolumeAdjust = (day: ScheduleDay, adjustment: number, e: React.MouseEvent) => {
    e.stopPropagation();
    onVolumeAdjust?.(day.date, adjustment);
  };

  // Generate 14 days of schedule data
  const generateTwoWeeksSchedule = () => {
    const twoWeeksData = [];
    const today = new Date();
    
    for (let i = 0; i < 14; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      
      const dateStr = currentDate.toISOString().split('T')[0];
      const dayOfWeek = currentDate.toLocaleDateString('en-US', { weekday: 'short' });
      
      const existingDay = schedule.find(day => day.date === dateStr);
      
      if (existingDay) {
        twoWeeksData.push(existingDay);
      } else {
        const hasWatering = Math.random() > 0.3;
        const mockDay: ScheduleDay = {
          date: dateStr,
          dayOfWeek,
          hasWatering,
          isToday: i === 0,
        };
        
        if (hasWatering) {
          if (Math.random() > 0.5) {
            mockDay.morning = { time: '06:00', duration: 5, volume: Math.floor(Math.random() * 15) + 5 };
          }
          if (Math.random() > 0.7) {
            mockDay.evening = { time: '18:00', duration: 3, volume: Math.floor(Math.random() * 10) + 3 };
          }
        }
        
        twoWeeksData.push(mockDay);
      }
    }
    
    return twoWeeksData;
  };

  const twoWeeksSchedule = generateTwoWeeksSchedule();

  return (
    <div className={cn("space-y-4", className)}>
      {/* Mobile-Optimized Schedule Card */}
      <Card className="border-0 shadow-lg rounded-2xl bg-white/90 backdrop-blur-sm overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold">2-Week Schedule</h3>
                <p className="text-emerald-100 text-sm">Tap days to view details</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile-First Schedule List */}
        <div className="p-4">
          <div className="space-y-3">
            {twoWeeksSchedule.map((day, index) => (
              <div
                key={day.date}
                className={cn(
                  "rounded-xl border-2 transition-all duration-200 cursor-pointer active:scale-95",
                  getDayColor(day),
                  "min-h-[80px] p-4"
                )}
                onClick={() => onDayClick?.(day)}
              >
                <div className="flex items-center justify-between">
                  {/* Left: Date Info */}
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className={cn(
                        "text-2xl font-bold",
                        day.isToday ? "text-emerald-600" : "text-gray-900"
                      )}>
                        {new Date(day.date).getDate()}
                      </div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                        {day.dayOfWeek}
                      </div>
                    </div>
                    
                    {/* Watering Schedule */}
                    <div className="flex-1">
                      {day.hasWatering ? (
                        <div className="space-y-2">
                          {/* Time slots */}
                          <div className="flex space-x-2">
                            {[day.morning, day.afternoon, day.evening].map((slot, slotIndex) => (
                              slot ? (
                                <div key={slotIndex} className="flex items-center space-x-1">
                                  <div className={cn(
                                    "w-3 h-3 rounded-full",
                                    getTimeSlotColor(slot)
                                  )} />
                                  <span className="text-xs text-gray-600">{slot.time}</span>
                                </div>
                              ) : null
                            ))}
                          </div>
                          
                          {/* Total volume */}
                          <div className="flex items-center space-x-2">
                            <Droplets className="w-4 h-4 text-blue-500" />
                            <span className="text-sm font-medium text-gray-900">
                              {getTotalVolume(day)}L total
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 rounded-full bg-gray-200" />
                          <span className="text-sm text-gray-500">Rest day</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right: Controls */}
                  <div className="flex items-center space-x-2">
                    {/* Manual Controls */}
                    {showManualControls && day.hasWatering && (
                      <div className="flex items-center space-x-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="w-8 h-8 p-0 bg-gray-100 hover:bg-gray-200"
                          onClick={(e) => handleVolumeAdjust(day, -2, e)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="w-8 h-8 p-0 bg-gray-100 hover:bg-gray-200"
                          onClick={(e) => handleVolumeAdjust(day, 2, e)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    )}
                    
                    {/* Arrow indicator */}
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </div>

                {/* Today indicator */}
                {day.isToday && (
                  <div className="mt-2 flex items-center space-x-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-xs font-medium text-emerald-600">Today</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Compact Legend */}
      <Card className="border-0 shadow-md rounded-2xl bg-white/80 backdrop-blur-sm">
        <CardContent className="p-4">
          <h4 className="font-medium text-gray-900 mb-3 text-center text-sm">Watering Intensity</h4>
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-3 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full" />
              <span className="text-gray-700">Light</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full" />
              <span className="text-gray-700">Medium</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-3 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full" />
              <span className="text-gray-700">Heavy</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
