import { apiFetch } from './client';
import {
  LessonListSchema,
  LessonSchema,
  type Lesson,
  type CreateLessonInput,
} from '@/schemas/lesson';

export async function fetchLessons(weekStart: string): Promise<Lesson[]> {
  const data = await apiFetch(`/lessons?weekStart=${weekStart}`);
  return LessonListSchema.parse(data);
}

export async function createLesson(input: CreateLessonInput): Promise<Lesson> {
  const data = await apiFetch('/lessons', {
    method: 'POST',
    body: JSON.stringify(input),
  });
  return LessonSchema.parse(data);
}
