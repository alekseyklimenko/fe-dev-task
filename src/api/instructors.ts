import {apiFetch} from './client';
import {
    InstructorListSchema,
    InstructorOptionListSchema,
    type Instructor,
    type InstructorOption,
} from '@/schemas/instructor';

export async function fetchInstructors(): Promise<Instructor[]> {
    const data = await apiFetch('/instructors');
    return InstructorListSchema.parse(data);
}

export async function fetchInstructorOptions(): Promise<InstructorOption[]> {
    const data = await apiFetch('/instructors');
    return InstructorOptionListSchema.parse(data);
}
