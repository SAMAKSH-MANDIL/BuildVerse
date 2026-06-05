import { z } from 'zod';

export const SaveEvaluationSchema = z.object({
  assignmentId: z.string().min(1, "Assignment ID is required"),
  scores: z.array(z.object({
    criterionId: z.string().min(1, "Criterion ID is required"),
    score: z.number().int().min(0, "Score cannot be negative"), // The max is checked dynamically against maxMarks in the handler
    feedback: z.string().max(2000, "Feedback is too long").optional().default("")
  })).max(50, "Too many criteria"),
  overallFeedback: z.string().max(5000, "Overall feedback is too long").optional().default(""),
  status: z.enum(['DRAFT', 'SUBMITTED'])
});

export const CreateAssignmentsSchema = z.object({
  evaluatorProfileId: z.string().min(1, "Evaluator ID is required"),
  roundId: z.string().min(1, "Round ID is required"),
  teamIds: z.array(z.string().min(1, "Team ID cannot be empty")).min(1, "At least one team is required").max(100, "Cannot assign more than 100 teams at once"),
});

export const DeleteAssignmentSchema = z.object({
  assignmentId: z.string().min(1, "Assignment ID is required"),
});
