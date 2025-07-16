// src/ai/flows/suggest-tasks.ts
'use server';
/**
 * @fileOverview A flow to intelligently suggest tasks based on user habits, time of day, and current workload.
 *
 * - suggestTasks - A function that suggests tasks.
 * - SuggestTasksInput - The input type for the suggestTasks function.
 * - SuggestTasksOutput - The return type for the suggestTasks function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestTasksInputSchema = z.object({
  userHabits: z
    .string()
    .describe('Description of the user habits and preferences.'),
  timeOfDay: z.string().describe('The current time of day.'),
  currentWorkload: z.string().describe('Description of the current workload.'),
});
export type SuggestTasksInput = z.infer<typeof SuggestTasksInputSchema>;

const SuggestTasksOutputSchema = z.object({
  suggestedTasks: z
    .array(z.string())
    .describe('A list of suggested tasks based on the input.'),
});
export type SuggestTasksOutput = z.infer<typeof SuggestTasksOutputSchema>;

export async function suggestTasks(input: SuggestTasksInput): Promise<SuggestTasksOutput> {
  return suggestTasksFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestTasksPrompt',
  input: {schema: SuggestTasksInputSchema},
  output: {schema: SuggestTasksOutputSchema},
  prompt: `You are a personal assistant that suggests tasks for the user.

  Based on the user's habits, the time of day, and the current workload, suggest a list of tasks that the user should do.

  User Habits: {{{userHabits}}}
  Time of Day: {{{timeOfDay}}}
  Current Workload: {{{currentWorkload}}}

  Suggest tasks that are relevant to the user's habits and workload, considering the time of day.
  Return the suggested tasks as a list of strings.
  `,
});

const suggestTasksFlow = ai.defineFlow(
  {
    name: 'suggestTasksFlow',
    inputSchema: SuggestTasksInputSchema,
    outputSchema: SuggestTasksOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
