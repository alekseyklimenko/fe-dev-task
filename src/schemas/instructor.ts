import {z} from 'zod';

export const InstructorSchema = z.object({
    id: z.string().uuid(),
    fullName: z.string(),
    email: z.string().email(),
    certifications: z.array(z.string()),
    availability: z.array(
        z.object({
            weekday: z.number().int().min(0).max(6),
            startHour: z.number().int().min(0).max(23),
            endHour: z.number().int().min(0).max(23),
        })
    ),
    createdAt: z.string().datetime(),
});

export const InstructorListSchema = z.array(InstructorSchema);

export const InstructorOptionSchema = InstructorSchema.pick({id: true, fullName: true});

export const InstructorOptionListSchema = z.array(InstructorOptionSchema);

export type Instructor = z.infer<typeof InstructorSchema>;

export type InstructorOption = z.infer<typeof InstructorOptionSchema>;
