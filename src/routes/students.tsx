import { createFileRoute } from '@tanstack/react-router';

import { PageContainer } from '@/components/layout/PageContainer';
import { Skeleton } from '@/components/ui/skeleton';
import { StudentRow } from '@/components/students/StudentRow';
import { StudentSearchBox } from '@/components/students/StudentSearchBox';
import { useStudents } from '@/hooks/useStudents';
import { useStudentSearch } from '@/hooks/useStudentSearch';

export const Route = createFileRoute('/students')({
  component: StudentsPage,
});

function StudentsPage() {
  const { query, setQuery, results, isLoading: isSearching } = useStudentSearch();
  const { data: allStudents = [], isLoading: isLoadingAll } = useStudents();

  const showSearchResults = query.length > 0;
  const list = showSearchResults ? results : allStudents;
  const showSkeleton = showSearchResults ? isSearching : isLoadingAll;

  return (
    <PageContainer>
      <h1 className="mb-4 text-xl font-semibold">Students</h1>
      <div className="mb-4">
        <StudentSearchBox value={query} onChange={setQuery} />
      </div>

      {showSkeleton ? (
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-14 w-full" />
          ))}
        </div>
      ) : list.length === 0 ? (
        <p className="text-sm text-muted-foreground">No students found.</p>
      ) : (
        <ul className="space-y-2">
          {list.map((s) => (
            <li key={s.id}>
              <StudentRow student={s} />
            </li>
          ))}
        </ul>
      )}
    </PageContainer>
  );
}
