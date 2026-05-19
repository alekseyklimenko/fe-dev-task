import { z } from 'zod';

export const LessonSchema = z.object({
  id: z.string().uuid(),
  studentId: z.string().uuid(),
  instructorId: z.string().uuid(),
  startTime: z.string().datetime(),
  durationMinutes: z.number().int().min(30).max(180),
  notes: z.string().max(500).optional(),
  createdAt: z.string().datetime(),
});

export const LessonListSchema = z.array(LessonSchema);

export const CreateLessonInputSchema = LessonSchema.omit({
  id: true,
  createdAt: true,
});

export type Lesson = z.infer<typeof LessonSchema>;
export type CreateLessonInput = z.infer<typeof CreateLessonInputSchema>;
