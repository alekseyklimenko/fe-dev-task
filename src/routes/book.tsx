import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';

import { PageContainer } from '@/components/layout/PageContainer';
import { Skeleton } from '@/components/ui/skeleton';
import { BookingForm } from '@/components/booking/BookingForm';
import { useStudents } from '@/hooks/useStudents';
import { useInstructors } from '@/hooks/useInstructors';

export const Route = createFileRoute('/book')({
  component: BookPage,
});

function BookPage() {
  const navigate = useNavigate();
  const { data: students, isLoading: studentsLoading } = useStudents();
  const { data: instructors, isLoading: instructorsLoading } = useInstructors();

  const isLoading = studentsLoading || instructorsLoading;

  return (
    <PageContainer className="max-w-xl">
      <h1 className="mb-4 text-xl font-semibold">Book a Lesson</h1>
      {isLoading || !students || !instructors ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      ) : (
        <BookingForm
          students={students}
          instructors={instructors}
          onSuccess={() => {
            toast.success('Lesson booked');
            void navigate({ to: '/' });
          }}
        />
      )}
    </PageContainer>
  );
}
