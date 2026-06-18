import {useMemo} from 'react';
import {createFileRoute} from '@tanstack/react-router';
import {z} from 'zod';

import {PageContainer} from '@/components/layout/PageContainer';
import {Calendar} from '@/components/calendar/Calendar';
import {FiltersBar} from '@/components/calendar/FiltersBar';
import {Skeleton} from '@/components/ui/skeleton';
import {Button} from '@/components/ui/button';
import {useLessonsView} from '@/hooks/useLessons';
import {useStudents} from '@/hooks/useStudents';
import {useInstructorOptions} from '@/hooks/useInstructors';
import {startOfWeek, formatWeekStart} from '@/lib/date';

const searchSchema = z.object({
    weekStart: z.string().optional(),
});

export const Route = createFileRoute('/')({
    validateSearch: searchSchema,
    component: CalendarPage,
});

function CalendarPage() {
    const search = Route.useSearch();
    const navigate = Route.useNavigate();

    const weekStartDate = useMemo(() => {
        if (search.weekStart) return new Date(`${search.weekStart}T00:00:00`);
        return startOfWeek(new Date());
    }, [search.weekStart]);

    const weekStartStr = formatWeekStart(weekStartDate);

    const view = useLessonsView(weekStartStr);
    const {data: students = []} = useStudents();
    const {data: instructors = []} = useInstructorOptions();

    const studentName = (id: string) =>
        students.find((s) => s.id === id)?.fullName ?? 'Unknown';
    const instructorName = (id: string) =>
        instructors.find((i) => i.id === id)?.fullName ?? 'Unknown';

    const goToWeek = (offsetWeeks: number) => {
        const next = new Date(weekStartDate);
        next.setDate(next.getDate() + offsetWeeks * 7);
        void navigate({search: {weekStart: formatWeekStart(next)}});
    };

    return (
        <PageContainer>
            <div className="mb-4 flex items-center justify-between">
                <h1 className="text-xl font-semibold">Weekly Calendar</h1>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => goToWeek(-1)}>
                        ‹ Prev
                    </Button>
                    <span className="min-w-[8rem] text-center text-sm text-muted-foreground">
            Week of {weekStartStr}
          </span>
                    <Button variant="outline" size="sm" onClick={() => goToWeek(1)}>
                        Next ›
                    </Button>
                </div>
            </div>

            <FiltersBar
                filters={view.filters}
                setFilter={view.setFilter}
                resetFilters={view.resetFilters}
                sortBy={view.sortBy}
                setSortBy={view.setSortBy}
                instructors={instructors}
            />

            <div className="mt-4">
                {view.isLoading ? (
                    <div className="grid grid-cols-7 gap-2">
                        {Array.from({length: 7}).map((_, i) => (
                            <Skeleton key={i} className="h-48 w-full"/>
                        ))}
                    </div>
                ) : view.error ? (
                    <div
                        className="rounded-md border border-destructive bg-destructive/10 p-4 text-sm text-destructive">
                        Failed to load lessons.
                    </div>
                ) : (
                    <Calendar
                        weekStart={weekStartDate}
                        byWeekday={view.byWeekday}
                        studentName={studentName}
                        instructorName={instructorName}
                        isFavourite={view.isFavourite}
                        toggleFavourite={view.toggleFavourite}
                    />
                )}
            </div>
        </PageContainer>
    );
}
