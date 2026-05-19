import { apiFetch } from './client';
import { InstructorListSchema, type Instructor } from '@/schemas/instructor';

export async function fetchInstructors(): Promise<Instructor[]> {
  const data = await apiFetch('/instructors');
  return InstructorListSchema.parse(data);
}
