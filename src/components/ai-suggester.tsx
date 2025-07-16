"use client"

import * as React from "react"
import { Loader, Plus, Sparkles } from "lucide-react"
import { suggestTasks, type SuggestTasksInput, type SuggestTasksOutput } from "@/ai/flows/suggest-tasks"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

interface AiSuggesterProps {
  onAddTask: (title: string) => void
}

export function AiSuggester({ onAddTask }: AiSuggesterProps) {
  const [form, setForm] = React.useState<SuggestTasksInput>({
    userHabits: "Loves to read, goes for a run in the evening.",
    timeOfDay: "morning",
    currentWorkload: "Light workload, mostly meetings.",
  })
  const [suggestions, setSuggestions] = React.useState<SuggestTasksOutput | null>(null)
  const [loading, setLoading] = React.useState(false)
  const { toast } = useToast()

  const handleInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  
  const handleSelectChange = (value: string) => {
    setForm({ ...form, timeOfDay: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSuggestions(null)
    try {
      const result = await suggestTasks(form)
      setSuggestions(result)
    } catch (error) {
      console.error("AI suggestion failed:", error)
      toast({
        variant: "destructive",
        title: "Oh no! Something went wrong.",
        description: "Couldn't get AI suggestions. Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <Sparkles className="h-6 w-6 text-accent" />
          <span>AI Task Suggester</span>
        </CardTitle>
        <CardDescription>
          Get smart task suggestions based on your habits and workload.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="userHabits">Your Habits & Preferences</Label>
            <Textarea
              id="userHabits"
              name="userHabits"
              value={form.userHabits}
              onChange={handleInputChange}
              placeholder="e.g., Early bird, enjoy coding in the morning..."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="currentWorkload">Today's Workload</Label>
            <Textarea
              id="currentWorkload"
              name="currentWorkload"
              value={form.currentWorkload}
              onChange={handleInputChange}
              placeholder="e.g., Heavy meeting day, project deadline..."
            />
          </div>
           <div className="space-y-2">
            <Label htmlFor="timeOfDay">Time of Day</Label>
            <Select name="timeOfDay" value={form.timeOfDay} onValueChange={handleSelectChange}>
              <SelectTrigger id="timeOfDay">
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="morning">Morning</SelectItem>
                <SelectItem value="afternoon">Afternoon</SelectItem>
                <SelectItem value="evening">Evening</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-stretch">
          <Button type="submit" disabled={loading} className="bg-accent hover:bg-accent/90">
            {loading ? (
              <Loader className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="mr-2 h-4 w-4" />
            )}
            Suggest Tasks
          </Button>

          {suggestions && suggestions.suggestedTasks.length > 0 && (
            <div className="mt-6 space-y-2">
                <h4 className="font-semibold">Suggestions:</h4>
                <ul className="list-disc list-outside space-y-2 pl-4">
                    {suggestions.suggestedTasks.map((task, index) => (
                        <li key={index} className="flex items-center justify-between">
                            <span>{task}</span>
                            <Button variant="ghost" size="icon" onClick={() => onAddTask(task)} aria-label={`Add task: ${task}`}>
                                <Plus className="h-4 w-4 text-primary"/>
                            </Button>
                        </li>
                    ))}
                </ul>
            </div>
          )}
        </CardFooter>
      </form>
    </Card>
  )
}
