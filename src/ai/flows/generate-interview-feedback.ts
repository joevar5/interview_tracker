'use server';

/**
 * @fileOverview Generates personalized interview feedback and suggestions for improvement based on rejection reasons.
 *
 * - generateInterviewFeedback - A function that generates interview feedback.
 * - GenerateInterviewFeedbackInput - The input type for the generateInterviewFeedback function.
 * - GenerateInterviewFeedbackOutput - The return type for the generateInterviewFeedback function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const GenerateInterviewFeedbackInputSchema = z.object({
  company: z.string().describe('The name of the company where the interview took place.'),
  round: z.string().describe('The round of the interview (e.g., first round, technical interview, final round).'),
  rejectionReason: z.string().describe('The reason provided for the rejection after the interview.'),
});
export type GenerateInterviewFeedbackInput = z.infer<typeof GenerateInterviewFeedbackInputSchema>;

const GenerateInterviewFeedbackOutputSchema = z.object({
  feedback: z.string().describe('Personalized feedback based on the rejection reason.'),
  improvementPlan: z.string().describe('An action plan for improving performance in future interviews.'),
  cheatSheet: z.string().describe('A cheat sheet with key concepts and tips related to the interview.'),
});
export type GenerateInterviewFeedbackOutput = z.infer<typeof GenerateInterviewFeedbackOutputSchema>;

export async function generateInterviewFeedback(input: GenerateInterviewFeedbackInput): Promise<GenerateInterviewFeedbackOutput> {
  return generateInterviewFeedbackFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateInterviewFeedbackPrompt',
  input: {
    schema: z.object({
      company: z.string().describe('The name of the company where the interview took place.'),
      round: z.string().describe('The round of the interview (e.g., first round, technical interview, final round).'),
      rejectionReason: z.string().describe('The reason provided for the rejection after the interview.'),
    }),
  },
  output: {
    schema: z.object({
      feedback: z.string().describe('Personalized feedback based on the rejection reason.'),
      improvementPlan: z.string().describe('An action plan for improving performance in future interviews.'),
      cheatSheet: z.string().describe('A cheat sheet with key concepts and tips related to the interview.'),
    }),
  },
  prompt: `You are an AI career coach specializing in providing interview feedback.

  Based on the interview details and rejection reason, provide personalized feedback, an improvement plan, and a cheat sheet to help the user improve their performance in future interviews.

  Company: {{{company}}}
  Round: {{{round}}}
  Rejection Reason: {{{rejectionReason}}}

  Your response should be structured as follows:

  Feedback: [Personalized feedback based on the rejection reason]
  Improvement Plan: [An action plan for improving performance in future interviews]
  Cheat Sheet: [A cheat sheet with key concepts and tips related to the interview]`,
});

const generateInterviewFeedbackFlow = ai.defineFlow<
  typeof GenerateInterviewFeedbackInputSchema,
  typeof GenerateInterviewFeedbackOutputSchema
>({
  name: 'generateInterviewFeedbackFlow',
  inputSchema: GenerateInterviewFeedbackInputSchema,
  outputSchema: GenerateInterviewFeedbackOutputSchema,
}, async input => {
  const {output} = await prompt(input);
  return output!;
});
