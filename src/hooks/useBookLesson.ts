import {useMutation, useQueryClient} from '@tanstack/react-query';
import {createLesson} from '@/api/lessons';
import type {CreateLessonInput} from '@/schemas/lesson';

export function useBookLesson() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (input: CreateLessonInput) => createLesson(input),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['lessons'],
                exact: true,
            });
        },
    });
}
