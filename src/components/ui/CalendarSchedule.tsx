
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
    if (slot.volume >= 20) return 'bg-blue-600';
    if (slot.volume >= 10) return 'bg-blue-400';
    return 'bg-blue-200';
  };

  return (
    <div className={cn("space-y-2", className)}>
      {/* Header */}
      <div className="grid grid-cols-8 gap-1 text-xs font-medium text-gray-500 px-2">
        <div></div>
        <div className="text-center">Mon</div>
        <div className="text-center">Tue</div>
        <div className="text-center">Wed</div>
        <div className="text-center">Thu</div>
        <div className="text-center">Fri</div>
        <div className="text-center">Sat</div>
        <div className="text-center">Sun</div>
      </div>

      {/* Schedule Grid */}
      <div className="space-y-1">
        {['Morning', 'Afternoon', 'Evening'].map((timeSlot, slotIndex) => (
          <div key={timeSlot} className="grid grid-cols-8 gap-1">
            {/* Time Slot Label */}
            <div className="text-xs font-medium text-gray-600 py-3 px-2">
              {timeSlot}
            </div>
            
            {/* Days */}
            {schedule.slice(0, 7).map((day, dayIndex) => {
              const slot = timeSlot === 'Morning' ? day.morning : 
                          timeSlot === 'Afternoon' ? day.afternoon : 
                          day.evening;
              
              return (
                <Card
                  key={`${timeSlot}-${day.date}`}
                  className={cn(
                    "h-12 cursor-pointer transition-all duration-200 hover:shadow-md border",
                    day.isToday ? "ring-2 ring-emerald-500 ring-offset-1" : "",
                    slot ? "border-blue-200 bg-blue-50" : "border-gray-200 bg-gray-50"
                  )}
                  onClick={() => onDayClick?.(day)}
                >
                  <CardContent className="p-1 h-full flex flex-col justify-center items-center">
                    {slot ? (
                      <>
                        <div className="text-[10px] font-medium text-blue-800">
                          {slot.time}
                        </div>
                        <div className={cn(
                          "w-full h-1.5 rounded-full mt-0.5",
                          getTimeSlotColor(slot)
                        )} />
                        <div className="text-[9px] text-blue-600 mt-0.5">
                          {slot.volume}L
                        </div>
                      </>
                    ) : (
                      <div className="text-[10px] text-gray-400">—</div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center space-x-4 text-xs text-gray-600 pt-2">
        <div className="flex items-center space-x-1">
          <div className="w-3 h-1.5 bg-blue-200 rounded-full" />
          <span>Light (5-10L)</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-1.5 bg-blue-400 rounded-full" />
          <span>Medium (10-20L)</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-1.5 bg-blue-600 rounded-full" />
          <span>Heavy (20L+)</span>
        </div>
      </div>
    </div>
  );
};
