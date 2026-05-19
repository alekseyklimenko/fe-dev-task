import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import { LessonCard } from '@/components/calendar/LessonCard';
import type { Lesson } from '@/schemas/lesson';

const lesson: Lesson = {
  id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
  studentId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
  instructorId: 'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
  startTime: '2026-05-18T09:30:00.000Z',
  durationMinutes: 90,
  createdAt: '2026-05-17T08:00:00.000Z',
};

describe('<LessonCard />', () => {
  it('renders student name and formatted time', () => {
    render(
      <LessonCard
        lesson={lesson}
        studentName="Emma Schneider"
        instructorName="Anna Petrenko"
        isFavourite={false}
        onToggleFavourite={vi.fn()}
      />,
    );

    expect(screen.getByText('Emma Schneider')).toBeInTheDocument();
    expect(screen.getByText('Anna Petrenko')).toBeInTheDocument();
    expect(screen.getByText('90 min')).toBeInTheDocument();
    expect(screen.getByText(/\d{2}:\d{2}/)).toBeInTheDocument();
  });
});
