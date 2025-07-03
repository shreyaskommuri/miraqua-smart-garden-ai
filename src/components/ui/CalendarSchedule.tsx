
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from './card';
import { Badge } from './badge';
import { Button } from './button';
import { cn } from '@/lib/utils';
import { Droplets, Calendar, Plus, Minus } from 'lucide-react';
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
  onCalendarClick?: (date: string) => void;
  className?: string;
  showManualControls?: boolean;
  onVolumeAdjust?: (date: string, adjustment: number) => void;
  plotId?: string;
}

export const CalendarSchedule: React.FC<CalendarScheduleProps> = ({
  schedule,
  onDayClick,
  onCalendarClick,
  className,
  showManualControls = false,
  onVolumeAdjust,
  plotId
}) => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const generateNext14Days = () => {
    const days = [];
    const today = new Date();
    
    for (let i = 0; i < 14; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      
      const dateStr = currentDate.toISOString().split('T')[0];
      const isToday = i === 0;
      
      const existingDay = schedule.find(day => day.date === dateStr);
      const hasWatering = existingDay?.hasWatering || Math.random() > 0.6;
      
      days.push({
        date: dateStr,
        dayOfWeek: currentDate.toLocaleDateString('en-US', { weekday: 'short' }),
        day: currentDate.getDate(),
        month: currentDate.toLocaleDateString('en-US', { month: 'short' }),
        isToday,
        hasWatering,
        scheduleData: existingDay
      });
    }
    
    return days;
  };

  const calendarDays = generateNext14Days();

  const handleDayClick = (day: any, e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Navigate to SpecificDayScreen
    const searchParams = new URLSearchParams({
      date: day.date,
      lat: '37.7749', // You might want to pass these as props
      lon: '-122.4194'
    });
    
    navigate(`/app/day/${plotId}/${day.date}?${searchParams.toString()}`);
  };

  const handleCalendarClick = (day: any) => {
    // Navigate to full calendar view
    const searchParams = new URLSearchParams({
      date: day.date,
      lat: '37.7749',
      lon: '-122.4194'
    });
    
    navigate(`/app/calendar/${plotId}?${searchParams.toString()}`);
  };

  const getTotalVolume = (day: any) => {
    if (!day.scheduleData) return 0;
    const schedule = day.scheduleData;
    return (schedule.morning?.volume || 0) + (schedule.afternoon?.volume || 0) + (schedule.evening?.volume || 0);
  };

  return (
    <div className={cn("space-y-4", className)}>
      <Card className="border-0 shadow-lg rounded-2xl bg-white/90 backdrop-blur-sm overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Next 2 Weeks</h3>
                <p className="text-emerald-100 text-sm">Tap dates for details</p>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar Grid - Mobile Optimized */}
        <div className="p-6">
          <div className="grid grid-cols-2 gap-3">
            {calendarDays.map((day, index) => (
              <div
                key={index}
                className={cn(
                  "relative rounded-xl border-2 transition-all duration-200 cursor-pointer active:scale-95 p-4 min-h-[80px]",
                  "border-gray-200 hover:border-blue-300 bg-white",
                  day.isToday && "ring-2 ring-emerald-400 ring-opacity-50 animate-pulse bg-emerald-50 border-emerald-200",
                  day.hasWatering && "bg-blue-50 border-blue-200"
                )}
                onClick={() => handleCalendarClick(day)}
              >
                {/* Date and Month */}
                <div 
                  className="flex flex-col items-start mb-2 cursor-pointer"
                  onClick={(e) => handleDayClick(day, e)}
                >
                  <div className={cn(
                    "text-2xl font-bold transition-colors",
                    "text-gray-900",
                    day.isToday && "text-emerald-600"
                  )}>
                    {day.day}
                  </div>
                  <div className="text-sm text-gray-500 font-medium">
                    {day.month} • {day.dayOfWeek}
                  </div>
                </div>

                {/* Watering Indicator */}
                {day.hasWatering && (
                  <div className="flex items-center space-x-2">
                    <Droplets className="w-4 h-4 text-blue-500" />
                    {day.scheduleData && (
                      <span className="text-sm text-blue-600 font-medium">
                        {getTotalVolume(day)}L
                      </span>
                    )}
                  </div>
                )}

                {/* Manual Controls */}
                {showManualControls && day.hasWatering && day.scheduleData && (
                  <div className="absolute top-2 right-2 flex space-x-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="w-6 h-6 p-0 bg-white shadow-md hover:bg-gray-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        onVolumeAdjust?.(day.date, -2);
                      }}
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="w-6 h-6 p-0 bg-white shadow-md hover:bg-gray-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        onVolumeAdjust?.(day.date, 2);
                      }}
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                )}

                {/* Today Pulse Indicator */}
                {day.isToday && (
                  <div className="absolute inset-0 rounded-xl ring-2 ring-emerald-400 ring-opacity-30 animate-pulse pointer-events-none" />
                )}
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Legend */}
      <Card className="border-0 shadow-md rounded-2xl bg-white/80 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-emerald-100 border-2 border-emerald-400 rounded-lg animate-pulse" />
              <span className="text-gray-700">Today</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-100 border-2 border-blue-200 rounded-lg flex items-center justify-center">
                <Droplets className="w-2 h-2 text-blue-500" />
              </div>
              <span className="text-gray-700">Scheduled</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-white border-2 border-gray-200 rounded-lg" />
              <span className="text-gray-700">Available</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
