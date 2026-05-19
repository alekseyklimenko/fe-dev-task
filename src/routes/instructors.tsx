import { createFileRoute } from '@tanstack/react-router';

import { PageContainer } from '@/components/layout/PageContainer';
import { Skeleton } from '@/components/ui/skeleton';
import { InstructorCard } from '@/components/instructors/InstructorCard';
import { useInstructors } from '@/hooks/useInstructors';

export const Route = createFileRoute('/instructors')({
  component: InstructorsPage,
  errorComponent: () => (
    <PageContainer>
      <div className="rounded-md border border-destructive bg-destructive/10 p-4 text-sm text-destructive">
        Something went wrong.
      </div>
    </PageContainer>
  ),
});

function InstructorsPage() {
  const { data: instructors, isLoading } = useInstructors();

  return (
    <PageContainer>
      <h1 className="mb-4 text-xl font-semibold">Instructors</h1>
      {isLoading ? (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {instructors?.map((i) => (
            <InstructorCard key={i.id} instructor={i} />
          ))}
        </div>
      )}
    </PageContainer>
  );
}
