import { Star } from 'lucide-react';
import type { Lesson } from '@/schemas/lesson';
import { formatTime } from '@/lib/date';
import { cn } from '@/lib/cn';

type Props = {
  lesson: Lesson;
  studentName: string;
  instructorName: string;
  isFavourite: boolean;
  onToggleFavourite: (instructorId: string) => void;
};

export function LessonCard({
  lesson,
  studentName,
  instructorName,
  isFavourite,
  onToggleFavourite,
}: Props) {
  return (
    <div className="rounded-md border bg-card p-2 text-sm shadow-sm">
      <div className="flex items-center justify-between">
        <span className="font-medium">{formatTime(lesson.startTime)}</span>
        <button
          type="button"
          onClick={() => onToggleFavourite(lesson.instructorId)}
          className="p-1 text-muted-foreground hover:text-yellow-500"
          aria-label="Toggle favourite instructor"
        >
          <Star
            className={cn('h-4 w-4', isFavourite && 'fill-yellow-400 text-yellow-500')}
          />
        </button>
      </div>
      <p className="truncate text-xs">{studentName}</p>
      <p className="truncate text-xs text-muted-foreground">{instructorName}</p>
      <p className="mt-1 text-[10px] uppercase tracking-wide text-muted-foreground">
        {lesson.durationMinutes} min
      </p>
    </div>
  );
}
