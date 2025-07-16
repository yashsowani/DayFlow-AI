
import * as React from "react";
import { format } from "date-fns";
import {
  Calendar as CalendarIcon,
  Edit,
  Flag,
  MoreHorizontal,
  Save,
  Trash2,
  X,
} from "lucide-react";
import type { Task, Priority } from "@/types";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDeleteTask: (id:string) => void;
  onUpdateTask: (id: string, newTitle: string) => void;
  onSetPriority: (id: string, priority: Priority) => void;
}

const priorityConfig: Record<Priority, { label: string; className: string }> = {
  high: { label: "High", className: "bg-red-500/20 text-red-700 border-red-500/30 hover:bg-red-500/30" },
  medium: { label: "Medium", className: "bg-yellow-500/20 text-yellow-700 border-yellow-500/30 hover:bg-yellow-500/30" },
  low: { label: "Low", className: "bg-gray-500/20 text-gray-700 border-gray-500/30 hover:bg-gray-500/30" },
};

export function TaskItem({
  task,
  onToggleComplete,
  onDeleteTask,
  onUpdateTask,
  onSetPriority,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [title, setTitle] = React.useState(task.title);

  const handleUpdate = () => {
    if (title.trim()) {
      onUpdateTask(task.id, title);
      setIsEditing(false);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleUpdate();
    }
    if (e.key === 'Escape') {
      setTitle(task.title);
      setIsEditing(false);
    }
  }

  return (
    <Card
      className={cn(
        "transition-all",
        task.completed ? "bg-card/50" : "bg-card"
      )}
    >
      <div className="p-4 flex items-center gap-4">
        <Checkbox
          id={`task-${task.id}`}
          checked={task.completed}
          onCheckedChange={() => onToggleComplete(task.id)}
          aria-label={`Mark "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`}
        />
        <div className="flex-grow">
          {isEditing ? (
            <div className="flex items-center gap-2">
              <Input value={title} onChange={(e) => setTitle(e.target.value)} onKeyDown={handleKeyDown} className="h-8"/>
              <Button size="icon" variant="ghost" className="h-8 w-8 text-green-600" onClick={handleUpdate}><Save className="h-4 w-4"/></Button>
              <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => setIsEditing(false)}><X className="h-4 w-4"/></Button>
            </div>
          ) : (
            <label
              htmlFor={`task-${task.id}`}
              className={cn(
                "font-medium cursor-pointer",
                task.completed && "line-through text-muted-foreground"
              )}
            >
              {task.title}
            </label>
          )}
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline" className={cn(priorityConfig[task.priority].className)}>
              {priorityConfig[task.priority].label}
            </Badge>
            {task.dueDate && (
              <div className="text-xs text-muted-foreground flex items-center gap-1">
                <CalendarIcon className="h-3 w-3" />
                <span>{format(new Date(task.dueDate), "MMM d")}</span>
              </div>
            )}
          </div>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="flex-shrink-0">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">More options</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={() => setIsEditing(true)}>
              <Edit className="mr-2 h-4 w-4" />
              <span>Edit</span>
            </DropdownMenuItem>
            
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Flag className="mr-2 h-4 w-4" />
                <span>Set Priority</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                {(['high', 'medium', 'low'] as Priority[]).map(p => (
                  <DropdownMenuItem key={p} onSelect={() => onSetPriority(task.id, p)}>
                    {priorityConfig[p].label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuSub>

            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive" onSelect={() => onDeleteTask(task.id)}>
              <Trash2 className="mr-2 h-4 w-4" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Card>
  );
}
