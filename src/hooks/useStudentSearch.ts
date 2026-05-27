import {useState, useRef, useEffect} from 'react';
import type {Student} from '@/schemas/student';
import {searchStudents} from '@/api/students';

export function useStudentSearch() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Student[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (query.length === 0) {
            setResults([]);
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        if (timerRef.current) clearTimeout(timerRef.current);

        timerRef.current = setTimeout(async () => {
            const data = await searchStudents(query);
            setResults(data);
            setIsLoading(false);
        }, 300);

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [query]);

    return {query, setQuery, results, isLoading};
}
