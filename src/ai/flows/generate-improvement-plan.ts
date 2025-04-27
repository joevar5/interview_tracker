// This file is machine-generated - DO NOT EDIT.
'use server';
/**
 * @fileOverview A flow for generating a tailored improvement plan based on rejection reasons.
 *
 * - generateImprovementPlan - A function that generates an improvement plan.
 * - GenerateImprovementPlanInput - The input type for the generateImprovementPlan function.
 * - GenerateImprovementPlanOutput - The return type for the generateImprovementPlan function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const GenerateImprovementPlanInputSchema = z.object({
  rejectionReason: z
    .string()
    .describe('The reason for the interview rejection provided by the company.'),
  jobDescription: z.string().describe('The job description for the role applied for.'),
});
export type GenerateImprovementPlanInput = z.infer<typeof GenerateImprovementPlanInputSchema>;

const GenerateImprovementPlanOutputSchema = z.object({
  improvementPlan: z
    .string()
    .describe(
      'A detailed, tailored improvement plan including specific action items and resources to address the weaknesses identified in the rejection reason.'
    ),
});
export type GenerateImprovementPlanOutput = z.infer<typeof GenerateImprovementPlanOutputSchema>;

export async function generateImprovementPlan(
  input: GenerateImprovementPlanInput
): Promise<GenerateImprovementPlanOutput> {
  return generateImprovementPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateImprovementPlanPrompt',
  input: {
    schema: z.object({
      rejectionReason: z
        .string()
        .describe('The reason for the interview rejection provided by the company.'),
      jobDescription: z.string().describe('The job description for the role applied for.'),
    }),
  },
  output: {
    schema: z.object({
      improvementPlan: z
        .string()
        .describe(
          'A detailed, tailored improvement plan including specific action items and resources to address the weaknesses identified in the rejection reason.'
        ),
    }),
  },
  prompt: `You are an AI career coach specializing in providing interview feedback and improvement plans.

  Based on the following rejection reason and the job description, generate a tailored improvement plan with specific action items and resources.

  Rejection Reason: {{{rejectionReason}}}
  Job Description: {{{jobDescription}}}

  Improvement Plan:`,
});

const generateImprovementPlanFlow = ai.defineFlow<
  typeof GenerateImprovementPlanInputSchema,
  typeof GenerateImprovementPlanOutputSchema
>(
  {
    name: 'generateImprovementPlanFlow',
    inputSchema: GenerateImprovementPlanInputSchema,
    outputSchema: GenerateImprovementPlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
