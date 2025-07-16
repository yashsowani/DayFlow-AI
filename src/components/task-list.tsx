import * as React from 'react';
import type { Task, Priority } from '@/types';
import { TaskItem } from '@/components/task-item';

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onUpdateTask: (id: string, newTitle: string) => void;
  onSetPriority: (id: string, priority: Priority) => void;
}

const priorityOrder: Record<Priority, number> = { high: 0, medium: 1, low: 2 };

export function TaskList({ tasks, ...props }: TaskListProps) {
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  if (tasks.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        <p className="font-headline">No tasks yet!</p>
        <p>Add a task above or get suggestions from the AI assistant.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {sortedTasks.map((task) => (
        <TaskItem key={task.id} task={task} {...props} />
      ))}
    </div>
  );
}
