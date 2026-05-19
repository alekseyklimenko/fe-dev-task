import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { useLessonsView } from '@/hooks/useLessons';
import type { Lesson } from '@/schemas/lesson';

const WEEK_START = '2026-05-18';

function makeLesson(overrides: Partial<Lesson>): Lesson {
  return {
    id: crypto.randomUUID(),
    studentId: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
    instructorId: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
    startTime: '2026-05-18T09:00:00.000Z',
    durationMinutes: 60,
    createdAt: '2026-05-18T08:00:00.000Z',
    ...overrides,
  };
}

function makeWrapper(lessons: Lesson[]) {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  client.setQueryData(['lessons', { weekStart: WEEK_START }], lessons);
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return React.createElement(QueryClientProvider, { client }, children);
  };
}

describe('useLessonsView', () => {
  it('applies instructor filter', () => {
    const lessons = [
      makeLesson({ instructorId: 'instructor-x' }),
      makeLesson({ instructorId: 'instructor-y' }),
      makeLesson({ instructorId: 'instructor-x' }),
    ];
    const wrapper = makeWrapper(lessons);
    const { result } = renderHook(() => useLessonsView(WEEK_START), { wrapper });

    act(() => {
      result.current.setFilter('instructorIds', ['instructor-x']);
    });

    expect(result.current.filtered).toHaveLength(2);
    expect(result.current.filtered.every((l) => l.instructorId === 'instructor-x')).toBe(true);
  });

  it('groups by weekday', () => {
    const lessons = [
      makeLesson({ startTime: '2026-05-18T09:00:00.000Z' }),
      makeLesson({ startTime: '2026-05-19T10:00:00.000Z' }),
      makeLesson({ startTime: '2026-05-20T11:00:00.000Z' }),
    ];
    const wrapper = makeWrapper(lessons);
    const { result } = renderHook(() => useLessonsView(WEEK_START), { wrapper });

    const totals = Object.values(result.current.byWeekday).reduce(
      (sum, arr) => sum + arr.length,
      0,
    );
    expect(totals).toBe(3);

    const dayCounts = Object.entries(result.current.byWeekday)
      .filter(([, arr]) => arr.length > 0)
      .map(([, arr]) => arr.length);
    expect(dayCounts).toEqual([1, 1, 1]);
  });
});
