
import React from 'react';
import { Card, CardContent } from './card';
import { Badge } from './badge';
import { cn } from '@/lib/utils';

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
}

export const CalendarSchedule: React.FC<CalendarScheduleProps> = ({
  schedule,
  onDayClick,
  className
}) => {
  const getTimeSlotColor = (slot: { time: string; duration: number; volume: number }) => {
    if (slot.volume >= 20) return 'bg-gradient-to-r from-blue-500 to-blue-600';
    if (slot.volume >= 10) return 'bg-gradient-to-r from-blue-400 to-blue-500';
    return 'bg-gradient-to-r from-blue-300 to-blue-400';
  };

  const getDayColor = (day: ScheduleDay) => {
    if (day.isToday) return 'ring-2 ring-emerald-400 bg-white shadow-lg';
    if (day.hasWatering) return 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200';
    return 'bg-gray-50 border-gray-200';
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Modern Calendar Grid */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-6 py-4">
          <h3 className="text-lg font-semibold">Weekly Schedule</h3>
          <p className="text-emerald-100 text-sm">Tap any day to view details</p>
        </div>

        {/* Days Grid */}
        <div className="p-6">
          <div className="grid grid-cols-7 gap-3 mb-4">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <div key={day} className="text-center">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">{day}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-3">
            {schedule.slice(0, 7).map((day, index) => (
              <div
                key={day.date}
                className={cn(
                  "aspect-square rounded-xl border-2 transition-all duration-200 cursor-pointer hover:scale-105 hover:shadow-md",
                  getDayColor(day)
                )}
                onClick={() => onDayClick?.(day)}
              >
                <div className="h-full p-2 flex flex-col justify-between">
                  <div className="text-center">
                    <div className={cn(
                      "text-sm font-semibold",
                      day.isToday ? "text-emerald-600" : "text-gray-700"
                    )}>
                      {new Date(day.date).getDate()}
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    {[day.morning, day.afternoon, day.evening].map((slot, slotIndex) => (
                      slot ? (
                        <div key={slotIndex} className="space-y-1">
                          <div className={cn(
                            "h-1.5 rounded-full",
                            getTimeSlotColor(slot)
                          )} />
                        </div>
                      ) : (
                        <div key={slotIndex} className="h-1.5 bg-gray-200 rounded-full opacity-30" />
                      )
                    ))}
                  </div>

                  {day.hasWatering && (
                    <div className="text-center">
                      <span className="text-xs font-medium text-blue-600">
                        {(day.morning?.volume || 0) + (day.afternoon?.volume || 0) + (day.evening?.volume || 0)}L
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modern Legend */}
      <div className="flex items-center justify-center space-x-6 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-2 bg-gradient-to-r from-blue-300 to-blue-400 rounded-full" />
          <span className="text-gray-600">Light (5-10L)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-2 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full" />
          <span className="text-gray-600">Medium (10-20L)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full" />
          <span className="text-gray-600">Heavy (20L+)</span>
        </div>
      </div>
    </div>
  );
};
