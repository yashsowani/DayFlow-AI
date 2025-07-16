import * as React from 'react';
import { format } from "date-fns";
import { Calendar as CalendarIcon, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';

interface AddTaskFormProps {
  onAddTask: (title: string, dueDate?: Date) => void;
}

export function AddTaskForm({ onAddTask }: AddTaskFormProps) {
  const [title, setTitle] = React.useState('');
  const [dueDate, setDueDate] = React.useState<Date | undefined>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTask(title, dueDate);
    setTitle('');
    setDueDate(undefined);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 mb-4">
      <Input
        type="text"
        placeholder="Add a new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-grow"
        aria-label="New task title"
      />
      <div className="flex gap-2">
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[200px] justify-start text-left font-normal",
                        !dueDate && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dueDate ? format(dueDate, "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={dueDate}
                    onSelect={setDueDate}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
        <Button type="submit" aria-label="Add task" className="bg-accent hover:bg-accent/90">
            <Plus className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}
