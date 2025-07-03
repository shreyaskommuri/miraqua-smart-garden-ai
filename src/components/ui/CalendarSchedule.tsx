
import React from 'react';
import { Card, CardContent } from './card';
import { Badge } from './badge';
import { Button } from './button';
import { cn } from '@/lib/utils';
import { Droplets, Calendar, Plus, Minus } from 'lucide-react';

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
  const getTimeSlotColor = (slot: { time: string; duration: number; volume: number }) => {
    if (slot.volume >= 20) return 'bg-gradient-to-r from-blue-600 to-blue-700';
    if (slot.volume >= 10) return 'bg-gradient-to-r from-blue-500 to-blue-600';
    return 'bg-gradient-to-r from-blue-400 to-blue-500';
  };

  const getDayColor = (day: ScheduleDay) => {
    if (day.isToday) return 'ring-2 ring-emerald-400 bg-white shadow-xl scale-105';
    if (day.hasWatering) return 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 shadow-md hover:shadow-lg';
    return 'bg-white/80 border-slate-200 hover:bg-white hover:shadow-md';
  };

  const getTotalVolume = (day: ScheduleDay) => {
    return (day.morning?.volume || 0) + (day.afternoon?.volume || 0) + (day.evening?.volume || 0);
  };

  const handleVolumeAdjust = (day: ScheduleDay, adjustment: number, e: React.MouseEvent) => {
    e.stopPropagation();
    onVolumeAdjust?.(day.date, adjustment);
  };

  // Generate 2 weeks of schedule data (14 days)
  const generateTwoWeeksSchedule = () => {
    const twoWeeksData = [];
    const today = new Date();
    
    for (let i = 0; i < 14; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      
      const dateStr = currentDate.toISOString().split('T')[0];
      const dayOfWeek = currentDate.toLocaleDateString('en-US', { weekday: 'short' });
      
      // Find existing schedule data or create mock data
      const existingDay = schedule.find(day => day.date === dateStr);
      
      if (existingDay) {
        twoWeeksData.push(existingDay);
      } else {
        // Generate mock watering schedule
        const hasWatering = Math.random() > 0.3; // 70% chance of watering
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
    <div className={cn("space-y-6", className)}>
      {/* Modern Calendar Card */}
      <Card className="border-0 shadow-xl rounded-3xl bg-white/90 backdrop-blur-sm overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-8 py-6">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold">2-Week Schedule</h3>
              <p className="text-emerald-100 text-sm">
                {showManualControls ? 'Tap days to view • Use +/- to adjust' : 'Tap any day to view details'}
              </p>
            </div>
          </div>
        </div>

        {/* 2-Week Calendar Grid */}
        <div className="p-8">
          {/* Week 1 */}
          <div className="mb-8">
            <h4 className="text-sm font-semibold text-slate-600 mb-4">This Week</h4>
            
            {/* Day Labels */}
            <div className="grid grid-cols-7 gap-3 mb-4">
              {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day) => (
                <div key={day} className="text-center">
                  <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">{day}</span>
                </div>
              ))}
            </div>

            {/* Week 1 Days */}
            <div className="grid grid-cols-7 gap-3">
              {twoWeeksSchedule.slice(0, 7).map((day, index) => (
                <div
                  key={day.date}
                  className={cn(
                    "aspect-square rounded-2xl border-2 transition-all duration-300 cursor-pointer hover:scale-105 relative overflow-hidden",
                    getDayColor(day)
                  )}
                  onClick={() => onDayClick?.(day)}
                >
                  {/* Today indicator */}
                  {day.isToday && (
                    <div className="absolute top-2 right-2 w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                  )}

                  {/* Manual Controls */}
                  {showManualControls && day.hasWatering && (
                    <div className="absolute top-1 left-1 right-1 flex justify-between">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="w-5 h-5 p-0 bg-white/80 hover:bg-white"
                        onClick={(e) => handleVolumeAdjust(day, -2, e)}
                      >
                        <Minus className="w-2 h-2" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="w-5 h-5 p-0 bg-white/80 hover:bg-white"
                        onClick={(e) => handleVolumeAdjust(day, 2, e)}
                      >
                        <Plus className="w-2 h-2" />
                      </Button>
                    </div>
                  )}

                  <div className="h-full p-3 flex flex-col justify-between">
                    {/* Date */}
                    <div className="text-center">
                      <div className={cn(
                        "text-lg font-bold mb-1",
                        day.isToday ? "text-emerald-600" : "text-slate-900"
                      )}>
                        {new Date(day.date).getDate()}
                      </div>
                    </div>
                    
                    {/* Watering Indicators */}
                    <div className="space-y-1">
                      {day.hasWatering ? (
                        <>
                          {[day.morning, day.afternoon, day.evening].map((slot, slotIndex) => (
                            slot ? (
                              <div key={slotIndex} className="space-y-1">
                                <div className={cn(
                                  "h-1.5 rounded-full shadow-sm",
                                  getTimeSlotColor(slot)
                                )} />
                              </div>
                            ) : (
                              <div key={slotIndex} className="h-1.5 bg-slate-100 rounded-full opacity-30" />
                            )
                          ))}
                          
                          {/* Volume Badge */}
                          <div className="text-center mt-1">
                            <Badge variant="secondary" className="text-xs px-1 py-0">
                              {getTotalVolume(day)}L
                            </Badge>
                          </div>
                        </>
                      ) : (
                        <div className="text-center">
                          <span className="text-xs text-slate-400">Rest</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Week 2 */}
          <div>
            <h4 className="text-sm font-semibold text-slate-600 mb-4">Next Week</h4>
            
            {/* Day Labels */}
            <div className="grid grid-cols-7 gap-3 mb-4">
              {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day) => (
                <div key={day} className="text-center">
                  <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">{day}</span>
                </div>
              ))}
            </div>

            {/* Week 2 Days */}
            <div className="grid grid-cols-7 gap-3">
              {twoWeeksSchedule.slice(7, 14).map((day, index) => (
                <div
                  key={day.date}
                  className={cn(
                    "aspect-square rounded-2xl border-2 transition-all duration-300 cursor-pointer hover:scale-105 relative overflow-hidden",
                    getDayColor(day)
                  )}
                  onClick={() => onDayClick?.(day)}
                >
                  {/* Manual Controls */}
                  {showManualControls && day.hasWatering && (
                    <div className="absolute top-1 left-1 right-1 flex justify-between">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="w-5 h-5 p-0 bg-white/80 hover:bg-white"
                        onClick={(e) => handleVolumeAdjust(day, -2, e)}
                      >
                        <Minus className="w-2 h-2" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="w-5 h-5 p-0 bg-white/80 hover:bg-white"
                        onClick={(e) => handleVolumeAdjust(day, 2, e)}
                      >
                        <Plus className="w-2 h-2" />
                      </Button>
                    </div>
                  )}

                  <div className="h-full p-3 flex flex-col justify-between">
                    {/* Date */}
                    <div className="text-center">
                      <div className="text-lg font-bold mb-1 text-slate-900">
                        {new Date(day.date).getDate()}
                      </div>
                    </div>
                    
                    {/* Watering Indicators */}
                    <div className="space-y-1">
                      {day.hasWatering ? (
                        <>
                          {[day.morning, day.afternoon, day.evening].map((slot, slotIndex) => (
                            slot ? (
                              <div key={slotIndex} className="space-y-1">
                                <div className={cn(
                                  "h-1.5 rounded-full shadow-sm",
                                  getTimeSlotColor(slot)
                                )} />
                              </div>
                            ) : (
                              <div key={slotIndex} className="h-1.5 bg-slate-100 rounded-full opacity-30" />
                            )
                          ))}
                          
                          {/* Volume Badge */}
                          <div className="text-center mt-1">
                            <Badge variant="secondary" className="text-xs px-1 py-0">
                              {getTotalVolume(day)}L
                            </Badge>
                          </div>
                        </>
                      ) : (
                        <div className="text-center">
                          <span className="text-xs text-slate-400">Rest</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Modern Legend */}
      <Card className="border-0 shadow-lg rounded-3xl bg-white/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <h4 className="font-semibold text-slate-900 mb-4 text-center">Watering Intensity</h4>
          <div className="flex items-center justify-center space-x-8 text-sm">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-3 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full shadow-sm" />
              <span className="text-slate-700 font-medium">Light (5-10L)</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-sm" />
              <span className="text-slate-700 font-medium">Medium (10-20L)</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-3 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full shadow-sm" />
              <span className="text-slate-700 font-medium">Heavy (20L+)</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
