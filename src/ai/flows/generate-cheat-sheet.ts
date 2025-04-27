'use server';

/**
 * @fileOverview Generates a concise cheat sheet for interview preparation based on past experiences.
 *
 * - generateCheatSheet - A function that generates the cheat sheet.
 * - GenerateCheatSheetInput - The input type for the generateCheatSheet function.
 * - GenerateCheatSheetOutput - The return type for the generateCheatSheet function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const GenerateCheatSheetInputSchema = z.object({
  rejectionReasons: z
    .string()
    .describe('A summary of the rejection reasons from past interviews.'),
  interviewExperiences: z
    .string()
    .describe('A summary of the user\'s past interview experiences.'),
});
export type GenerateCheatSheetInput = z.infer<typeof GenerateCheatSheetInputSchema>;

const GenerateCheatSheetOutputSchema = z.object({
  cheatSheet: z.string().describe('A concise cheat sheet for interview preparation.'),
  progress: z.string().describe('Summary of what has been generated'),
});
export type GenerateCheatSheetOutput = z.infer<typeof GenerateCheatSheetOutputSchema>;

export async function generateCheatSheet(input: GenerateCheatSheetInput): Promise<GenerateCheatSheetOutput> {
  return generateCheatSheetFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCheatSheetPrompt',
  input: {
    schema: z.object({
      rejectionReasons: z
        .string()
        .describe('A summary of the rejection reasons from past interviews.'),
      interviewExperiences: z
        .string()
        .describe('A summary of the user\'s past interview experiences.'),
    }),
  },
  output: {
    schema: z.object({
      cheatSheet: z.string().describe('A concise cheat sheet for interview preparation.'),
    }),
  },
  prompt: `You are an AI assistant designed to help users prepare for future interviews.

  Based on the user's past interview experiences and rejection reasons, generate a concise cheat sheet summarizing key concepts and tips.

  Interview Experiences: {{{interviewExperiences}}}
  Rejection Reasons: {{{rejectionReasons}}}

  Cheat Sheet:`,
});

const generateCheatSheetFlow = ai.defineFlow<
  typeof GenerateCheatSheetInputSchema,
  typeof GenerateCheatSheetOutputSchema
>({
  name: 'generateCheatSheetFlow',
  inputSchema: GenerateCheatSheetInputSchema,
  outputSchema: GenerateCheatSheetOutputSchema,
}, async input => {
  const {output} = await prompt(input);
  return {
    cheatSheet: output!.cheatSheet,
    progress: 'Generated a cheat sheet summarizing key concepts and tips for future interviews.',
  };
});
