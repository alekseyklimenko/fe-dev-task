import { useQuery } from '@tanstack/react-query';
import { fetchStudent, fetchStudents } from '@/api/students';

export function useStudents() {
  return useQuery({
    queryKey: ['students'],
    queryFn: fetchStudents,
  });
}

export function useStudent(id: string) {
  return useQuery({
    queryKey: ['student', id],
    queryFn: () => fetchStudent(id),
    enabled: Boolean(id),
  });
}
