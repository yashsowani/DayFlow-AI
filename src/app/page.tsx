"use client";

import * as React from "react";
import { v4 as uuidv4 } from "uuid";
import type { Task, Priority } from "@/types";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Logo } from "@/components/logo";
import { ProgressTracker } from "@/components/progress-tracker";
import { AddTaskForm } from "@/components/add-task-form";
import { TaskList } from "@/components/task-list";
import { CalendarView } from "@/components/calendar-view";
import { AiSuggester } from "@/components/ai-suggester";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", []);

  const handleAddTask = (title: string) => {
    if (title.trim()) {
      const newTask: Task = {
        id: uuidv4(),
        title,
        completed: false,
        priority: "medium",
      };
      setTasks((prevTasks) => [...prevTasks, newTask]);
    }
  };

  const handleToggleComplete = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const handleUpdateTask = (id: string, newTitle: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, title: newTitle } : task
      )
    );
  };
  
  const handleSetPriority = (id: string, priority: Priority) => {
    setTasks(prev => prev.map(task => task.id === id ? {...task, priority} : task));
  }

  const handleSetDueDate = (id: string, dueDate?: Date) => {
    setTasks(prev => prev.map(task => task.id === id ? {...task, dueDate: dueDate?.toISOString() } : task));
  }


  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto p-4 md:p-8">
        <header className="flex items-center gap-4 mb-8">
          <Logo />
          <h1 className="text-4xl font-bold font-headline text-primary">
            DayFlow AI
          </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6">
                <ProgressTracker tasks={tasks} />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                 <AddTaskForm onAddTask={handleAddTask} />
                 <TaskList
                    tasks={tasks}
                    onToggleComplete={handleToggleComplete}
                    onDeleteTask={handleDeleteTask}
                    onUpdateTask={handleUpdateTask}
                    onSetPriority={handleSetPriority}
                    onSetDueDate={handleSetDueDate}
                  />
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1 space-y-6 mt-6 lg:mt-0">
             <Card>
              <CardHeader>
                <CardTitle className="font-headline">Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <CalendarView tasks={tasks} />
              </CardContent>
            </Card>
            <AiSuggester onAddTask={handleAddTask} />
          </div>
        </div>
      </main>
    </div>
  );
}
