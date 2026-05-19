import { apiFetch } from './client';
import { StudentSchema, StudentListSchema, type Student } from '@/schemas/student';

export async function fetchStudents(): Promise<Student[]> {
  const data = await apiFetch('/students');
  return StudentListSchema.parse(data);
}

export async function searchStudents(query: string): Promise<Student[]> {
  const data = await apiFetch(`/students?q=${encodeURIComponent(query)}`);
  return StudentListSchema.parse(data);
}

export async function fetchStudent(id: string): Promise<Student> {
  const data = await apiFetch(`/students/${id}`);
  return StudentSchema.parse(data);
}
