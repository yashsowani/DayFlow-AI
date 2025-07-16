import * as React from 'react';
import type { Task } from '@/types';
import { Calendar } from '@/components/ui/calendar';

interface CalendarViewProps {
  tasks: Task[];
}

export function CalendarView({ tasks }: CalendarViewProps) {
  const dueDates = tasks
    .map((task) => (task.dueDate ? new Date(task.dueDate) : null))
    .filter((date): date is Date => date !== null);

  return (
    <Calendar
      mode="multiple"
      selected={dueDates}
      className="rounded-md border"
      classNames={{
        month: 'space-y-4 p-3',
        day_selected:
          'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
      }}
    />
  );
}
