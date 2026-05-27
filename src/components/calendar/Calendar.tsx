import type {Lesson} from '@/schemas/lesson';
import {weekDays, WEEKDAY_LABELS} from '@/lib/date';
import {LessonCard} from './LessonCard';

type Props = {
    weekStart: Date;
    byWeekday: Record<number, Lesson[]>;
    studentName: (id: string) => string;
    instructorName: (id: string) => string;
    isFavourite: (instructorId: string) => boolean;
    toggleFavourite: (instructorId: string) => void;
};

const ORDER = [1, 2, 3, 4, 5, 6, 0] as const;

export function Calendar({
                             weekStart,
                             byWeekday,
                             studentName,
                             instructorName,
                             isFavourite,
                             toggleFavourite,
                         }: Props) {
    const days = weekDays(weekStart);
    return (
        <div className="grid grid-cols-7 gap-2">
            {ORDER.map((dayIdx, i) => {
                const date = days[i];
                const dayLessons = byWeekday[dayIdx] ?? [];
                return (
                    <div key={dayIdx} className="rounded-lg border bg-background p-2">
                        <div className="mb-2 flex items-baseline justify-between">
              <span className="text-xs font-medium text-muted-foreground">
                {WEEKDAY_LABELS[i]}
              </span>
                            <span className="text-sm font-semibold">{date.getDate()}</span>
                        </div>
                        <div className="space-y-2">
                            {dayLessons.map((l) => (
                                <LessonCard
                                    key={l.id}
                                    lesson={l}
                                    studentName={studentName(l.studentId)}
                                    instructorName={instructorName(l.instructorId)}
                                    isFavourite={isFavourite(l.instructorId)}
                                    onToggleFavourite={toggleFavourite}
                                />
                            ))}
                            {dayLessons.length === 0 ? (
                                <p className="text-xs text-muted-foreground">No lessons</p>
                            ) : null}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
