import {useQuery} from '@tanstack/react-query';
import {fetchInstructors, fetchInstructorOptions} from '@/api/instructors';

export function useInstructors() {
    return useQuery({
        queryKey: ['instructors'],
        queryFn: fetchInstructors,
        throwOnError: true
    });
}

export function useInstructorOptions() {
    return useQuery({
        queryKey: ['instructors', 'options'],
        queryFn: fetchInstructorOptions,
    });
}
