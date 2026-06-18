import {useState, useEffect} from 'react';
import type {Student} from '@/schemas/student';
import {searchStudents} from '@/api/students';

export function useStudentSearch() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Student[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (query.length === 0) {
            setResults([]);
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        searchStudents(query).then((data) => {
            setResults(data);
            setIsLoading(false);
        });
    }, [query]);

    return {query, setQuery, results, isLoading};
}
