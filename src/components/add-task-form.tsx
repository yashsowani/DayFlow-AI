import * as React from 'react';
import { Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface AddTaskFormProps {
  onAddTask: (title: string) => void;
}

export function AddTaskForm({ onAddTask }: AddTaskFormProps) {
  const [title, setTitle] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTask(title);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <Input
        type="text"
        placeholder="Add a new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-grow"
        aria-label="New task title"
      />
      <Button type="submit" aria-label="Add task" className="bg-accent hover:bg-accent/90">
        <Plus className="h-4 w-4" />
      </Button>
    </form>
  );
}
