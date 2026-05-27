import {useMemo, useState, useEffect, useRef, useCallback} from 'react';
import {useQuery} from '@tanstack/react-query';
import {type Lesson} from '@/schemas/lesson';
import {fetchLessons} from '@/api/lessons';

const FAVOURITES_KEY = 'lessons:favourite-instructors';

type LessonsFilters = {
    instructorIds: string[];
    studentIds: string[];
    showOnlyFavourites: boolean;
    search: string;
};

type SortBy = 'time' | 'instructor' | 'student';

const defaultFilters: LessonsFilters = {
    instructorIds: [],
    studentIds: [],
    showOnlyFavourites: false,
    search: '',
};

export function useLessons(weekStart: string) {
    return useQuery({
        queryKey: ['lessons', {weekStart}],
        queryFn: () => fetchLessons(weekStart),
        staleTime: 5 * 60_000,
    });
}

export function useLessonsView(weekStart: string) {
    const {data: lessons = [], isLoading, error} = useLessons(weekStart);
    const [filters, setFilters] = useState<LessonsFilters>(defaultFilters);
    const [sortBy, setSortBy] = useState<SortBy>('time');

    const [favourites, setFavourites] = useState<string[]>([]);
    const hydrated = useRef(false);

    useEffect(() => {
        try {
            const raw = localStorage.getItem(FAVOURITES_KEY);
            if (raw) setFavourites(JSON.parse(raw));
        } catch {
            // ignore
        }
        hydrated.current = true;
    }, []);

    useEffect(() => {
        if (!hydrated.current) return;
        try {
            localStorage.setItem(FAVOURITES_KEY, JSON.stringify(favourites));
        } catch {
            // ignore
        }
    }, [favourites]);

    const toggleFavourite = useCallback((instructorId: string) => {
        setFavourites((prev) =>
            prev.includes(instructorId)
                ? prev.filter((id) => id !== instructorId)
                : [...prev, instructorId]
        );
    }, []);

    const filtered = useMemo(() => {
        let out = lessons;
        if (filters.instructorIds.length > 0) {
            out = out.filter((l) => filters.instructorIds.includes(l.instructorId));
        }
        if (filters.studentIds.length > 0) {
            out = out.filter((l) => filters.studentIds.includes(l.studentId));
        }
        if (filters.showOnlyFavourites) {
            out = out.filter((l) => favourites.includes(l.instructorId));
        }
        if (filters.search.trim()) {
            const q = filters.search.trim().toLowerCase();
            out = out.filter(
                (l) =>
                    l.notes?.toLowerCase().includes(q) ||
                    l.studentId.toLowerCase().includes(q) ||
                    l.instructorId.toLowerCase().includes(q)
            );
        }
        return out;
    }, [lessons, filters, favourites]);

    const sorted = useMemo(() => {
        const copy = [...filtered];
        switch (sortBy) {
            case 'time':
                copy.sort((a, b) => a.startTime.localeCompare(b.startTime));
                break;
            case 'instructor':
                copy.sort((a, b) => a.instructorId.localeCompare(b.instructorId));
                break;
            case 'student':
                copy.sort((a, b) => a.studentId.localeCompare(b.studentId));
                break;
        }
        return copy;
    }, [filtered, sortBy]);

    const byWeekday = useMemo(() => {
        const groups: Record<number, Lesson[]> = {0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: []};
        for (const lesson of sorted) {
            const day = new Date(lesson.startTime).getDay();
            groups[day].push(lesson);
        }
        return groups;
    }, [sorted]);

    const availableSlots = useMemo(() => {
        const result: Record<string, Record<number, Array<{ start: string; end: string }>>> = {};
        const instructorIds = Array.from(new Set(lessons.map((l) => l.instructorId)));
        for (const id of instructorIds) {
            result[id] = {0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: []};
            for (let day = 0; day < 7; day++) {
                const dayLessons = lessons
                    .filter((l) => l.instructorId === id && new Date(l.startTime).getDay() === day)
                    .sort((a, b) => a.startTime.localeCompare(b.startTime));
                let cursor = 8 * 60;
                for (const l of dayLessons) {
                    const d = new Date(l.startTime);
                    const start = d.getHours() * 60 + d.getMinutes();
                    const end = start + l.durationMinutes;
                    if (start > cursor) {
                        result[id][day].push({
                            start: minutesToHHMM(cursor),
                            end: minutesToHHMM(start),
                        });
                    }
                    cursor = Math.max(cursor, end);
                }
                if (cursor < 20 * 60) {
                    result[id][day].push({
                        start: minutesToHHMM(cursor),
                        end: minutesToHHMM(20 * 60),
                    });
                }
            }
        }
        return result;
    }, [lessons]);

    const lessonsPerInstructor = useMemo(() => {
        const counts: Record<string, number> = {};
        for (const l of lessons) {
            counts[l.instructorId] = (counts[l.instructorId] ?? 0) + 1;
        }
        return counts;
    }, [lessons]);

    const setFilter = useCallback(<K extends keyof LessonsFilters>(key: K, value: LessonsFilters[K]) => {
        setFilters((prev) => ({...prev, [key]: value}));
    }, []);

    const resetFilters = useCallback(() => setFilters(defaultFilters), []);

    return {
        lessons,
        isLoading,
        error,
        filters,
        setFilter,
        resetFilters,
        sortBy,
        setSortBy,
        filtered: sorted,
        byWeekday,
        availableSlots,
        lessonsPerInstructor,
        favourites,
        toggleFavourite,
        isFavourite: (id: string) => favourites.includes(id),
    };
}

function minutesToHHMM(m: number) {
    const h = Math.floor(m / 60);
    const mm = m % 60;
    return `${String(h).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
}
