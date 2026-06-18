import {useEffect} from 'react';
import {createFileRoute} from '@tanstack/react-router';

import {PageContainer} from '@/components/layout/PageContainer';
import {Skeleton} from '@/components/ui/skeleton';
import {useStudent} from '@/hooks/useStudents';
import {useInstructorOptions} from '@/hooks/useInstructors';
import {useLessonsView} from '@/hooks/useLessons';
import {startOfWeek, formatWeekStart, formatTime} from '@/lib/date';

export const Route = createFileRoute('/students/$studentId')({
    component: StudentDetailPage,
});

const STAGE_LABEL: Record<string, string> = {
    theory: 'Theory',
    practice: 'Practice',
    'exam-ready': 'Exam-ready',
};

function StudentDetailPage() {
    const {studentId} = Route.useParams();
    const {data: student, isLoading, error} = useStudent(studentId);
    const {data: instructors = []} = useInstructorOptions();

    const weekStartStr = formatWeekStart(startOfWeek(new Date()));
    const view = useLessonsView(weekStartStr);

    useEffect(() => {
        view.setFilter('studentIds', [studentId]);
    }, [studentId, view]);

    const instructorName = (id: string) =>
        instructors.find((i) => i.id === id)?.fullName ?? 'Unknown';

    if (isLoading) {
        return (
            <PageContainer>
                <Skeleton className="mb-4 h-8 w-64"/>
                <Skeleton className="h-32 w-full"/>
            </PageContainer>
        );
    }

    if (error || !student) {
        return (
            <PageContainer>
                <p className="text-sm text-destructive">Student not found.</p>
            </PageContainer>
        );
    }

    const lessons = view.filtered;

    return (
        <PageContainer>
            <h1 className="text-xl font-semibold">{student.fullName}</h1>
            <p className="text-sm text-muted-foreground">{student.email}</p>
            <p className="text-sm text-muted-foreground">{student.phone}</p>
            <p className="mt-1 inline-block rounded bg-muted px-2 py-0.5 text-xs uppercase tracking-wide">
                {STAGE_LABEL[student.licenseStage] ?? student.licenseStage}
            </p>

            <section className="mt-6">
                <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                    This week's lessons
                </h2>
                {view.isLoading ? (
                    <Skeleton className="h-24 w-full"/>
                ) : lessons.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No lessons this week.</p>
                ) : (
                    <ul className="space-y-2">
                        {lessons.map((l) => (
                            <li
                                key={l.id}
                                className="flex items-center justify-between rounded-md border bg-card p-3 text-sm"
                            >
                                <span className="font-medium">{formatTime(l.startTime)}</span>
                                <span className="text-muted-foreground">
                  {instructorName(l.instructorId)}
                </span>
                                <span className="text-xs uppercase tracking-wide text-muted-foreground">
                  {l.durationMinutes} min
                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </PageContainer>
    );
}
