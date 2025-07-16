import * as React from 'react';
import type { Task } from '@/types';
import { Calendar } from '@/components/ui/calendar';

interface CalendarViewProps {
  tasks: Task[];
  onDateSelect: (date?: Date) => void;
}

export function CalendarView({ tasks, onDateSelect }: CalendarViewProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>();

  const taskDueDates = tasks
    .map((task) => (task.dueDate ? new Date(task.dueDate) : null))
    .filter((date): date is Date => date !== null);
  
  const handleSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    onDateSelect(date);
  };

  return (
    <Calendar
      mode="single"
      selected={selectedDate}
      onSelect={handleSelect}
      modifiers={{ taskDays: taskDueDates }}
      className="rounded-md border"
      classNames={{
        month: 'space-y-4 p-3',
        day_selected:
          'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
        day_today: "bg-accent text-accent-foreground",
        modifiers: {
            taskDays: 'bg-primary/20 rounded-full'
        }
      }}
      modifiersClassNames={{
        taskDays: 'bg-primary/20 rounded-full'
      }}
    />
  );
}
