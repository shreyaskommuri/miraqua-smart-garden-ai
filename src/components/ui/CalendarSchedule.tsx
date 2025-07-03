
import React from 'react';
import { Card, CardContent } from './card';
import { Badge } from './badge';
import { Button } from './button';
import { cn } from '@/lib/utils';
import { Droplets, Calendar, Plus, Minus, ChevronLeft, ChevronRight } from 'lucide-react';
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
}

export const CalendarSchedule: React.FC<CalendarScheduleProps> = ({
  schedule,
  onDayClick,
  onCalendarClick,
  className,
  showManualControls = false,
  onVolumeAdjust
}) => {
  const isMobile = useIsMobile();
  const [currentMonth, setCurrentMonth] = React.useState(new Date());

  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const today = new Date();
    
    for (let i = 0; i < 42; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      
      const dateStr = currentDate.toISOString().split('T')[0];
      const isCurrentMonth = currentDate.getMonth() === month;
      const isToday = currentDate.toDateString() === today.toDateString();
      
      const existingDay = schedule.find(day => day.date === dateStr);
      const hasWatering = existingDay?.hasWatering || (isCurrentMonth && Math.random() > 0.6);
      
      days.push({
        date: dateStr,
        dayOfWeek: currentDate.toLocaleDateString('en-US', { weekday: 'short' }),
        day: currentDate.getDate(),
        isCurrentMonth,
        isToday,
        hasWatering,
        scheduleData: existingDay
      });
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();
  const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
      return newDate;
    });
  };

  const handleDayClick = (day: any, e: React.MouseEvent) => {
    e.stopPropagation();
    if (day.scheduleData) {
      onDayClick?.(day.scheduleData);
    }
  };

  const handleCalendarClick = (day: any) => {
    onCalendarClick?.(day.date);
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
                <h3 className="text-lg font-bold">Watering Schedule</h3>
                <p className="text-emerald-100 text-sm">Tap dates for details</p>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar Navigation */}
        <div className="px-6 py-4 bg-gray-50 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateMonth('prev')}
            className="text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <h4 className="text-lg font-semibold text-gray-900">{monthName}</h4>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateMonth('next')}
            className="text-gray-600 hover:text-gray-900"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Calendar Grid */}
        <div className="p-6">
          {/* Week Headers */}
          <div className="grid grid-cols-7 gap-2 mb-3">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-xs font-medium text-gray-500 uppercase tracking-wide py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((day, index) => (
              <div
                key={index}
                className={cn(
                  "relative aspect-square rounded-xl border-2 transition-all duration-200 cursor-pointer active:scale-95 flex flex-col items-center justify-center p-2",
                  day.isCurrentMonth ? "border-gray-200 hover:border-blue-300 bg-white" : "border-transparent bg-gray-50",
                  day.isToday && "ring-2 ring-emerald-400 ring-opacity-50 animate-pulse bg-emerald-50 border-emerald-200",
                  day.hasWatering && day.isCurrentMonth && "bg-blue-50 border-blue-200"
                )}
                onClick={() => handleCalendarClick(day)}
              >
                {/* Date Number */}
                <div 
                  className={cn(
                    "text-lg font-semibold mb-1 transition-colors cursor-pointer",
                    day.isCurrentMonth ? "text-gray-900" : "text-gray-400",
                    day.isToday && "text-emerald-600"
                  )}
                  onClick={(e) => handleDayClick(day, e)}
                >
                  {day.day}
                </div>

                {/* Watering Indicator */}
                {day.hasWatering && day.isCurrentMonth && (
                  <div className="flex flex-col items-center space-y-1">
                    <Droplets className="w-3 h-3 text-blue-500" />
                    {day.scheduleData && (
                      <span className="text-xs text-blue-600 font-medium">
                        {getTotalVolume(day)}L
                      </span>
                    )}
                  </div>
                )}

                {/* Manual Controls */}
                {showManualControls && day.hasWatering && day.scheduleData && (
                  <div className="absolute -bottom-1 -right-1 flex space-x-1">
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
