import { z } from 'zod';

export const StudentSchema = z.object({
  id: z.string().uuid(),
  fullName: z.string(),
  email: z.string().email(),
  phone: z.string(),
  enrolledAt: z.string().datetime(),
  licenseStage: z.enum(['theory', 'practice', 'exam-ready']),
});

export const StudentListSchema = z.array(StudentSchema);

export type Student = z.infer<typeof StudentSchema>;
