import * as React from 'react';
import type { Task } from '@/types';
import { Progress } from '@/components/ui/progress';

interface ProgressTrackerProps {
  tasks: Task[];
}

export function ProgressTracker({ tasks }: ProgressTrackerProps) {
  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center font-medium">
        <p className="text-lg font-headline">Daily Progress</p>
        <p className="text-muted-foreground">{`${completedTasks} / ${totalTasks} completed`}</p>
      </div>
      <Progress value={progress} aria-label={`${Math.round(progress)}% of tasks complete`} />
    </div>
  );
}
