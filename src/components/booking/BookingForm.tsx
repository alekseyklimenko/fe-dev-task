import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {
    CreateLessonInputSchema,
    type CreateLessonInput,
} from '@/schemas/lesson';
import {DateTimePicker} from './DateTimePicker';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Select} from '@/components/ui/select';
import {Textarea} from '@/components/ui/textarea';
import {useBookLesson} from '@/hooks/useBookLesson';

type Props = {
    students: Array<{ id: string; fullName: string }>;
    instructors: Array<{ id: string; fullName: string }>;
    onSuccess?: () => void;
};

export function BookingForm({students, instructors, onSuccess}: Props) {
    const {
        register,
        handleSubmit,
        control,
        formState: {errors, isValid, isSubmitting, touchedFields},
    } = useForm<CreateLessonInput>({
        resolver: zodResolver(CreateLessonInputSchema),
        mode: 'onChange',
        defaultValues: {
            studentId: '',
            instructorId: '',
            startTime: '',
            durationMinutes: 60,
            notes: '',
        },
    });

    const {mutateAsync} = useBookLesson();

    const onSubmit = handleSubmit(async (values) => {
        await mutateAsync(values);
        onSuccess?.();
    });

    return (
        <form onSubmit={onSubmit} className="space-y-4">
            <Field label="Student" error={touchedFields.studentId && errors.studentId?.message}>
                <Select {...register('studentId')}>
                    <option value="">Pick a student…</option>
                    {students.map((s) => (
                        <option key={s.id} value={s.id}>{s.fullName}</option>
                    ))}
                </Select>
            </Field>

            <Field label="Instructor" error={touchedFields.instructorId && errors.instructorId?.message}>
                <Select {...register('instructorId')}>
                    <option value="">Pick an instructor…</option>
                    {instructors.map((i) => (
                        <option key={i.id} value={i.id}>{i.fullName}</option>
                    ))}
                </Select>
            </Field>

            <Field label="Start time" error={touchedFields.startTime && errors.startTime?.message}>
                <Controller
                    control={control}
                    name="startTime"
                    render={({field}) => (
                        <DateTimePicker
                            value={field.value ? new Date(field.value) : null}
                            onChange={(d) => field.onChange(d)}
                        />
                    )}
                />
            </Field>

            <Field label="Duration (min)" error={touchedFields.durationMinutes && errors.durationMinutes?.message}>
                <Input type="number" {...register('durationMinutes', {valueAsNumber: true})} />
            </Field>

            <Field label="Notes" error={touchedFields.notes && errors.notes?.message}>
                <Textarea {...register('notes')} rows={3}/>
            </Field>

            <Button type="submit" disabled={!isValid || isSubmitting}>
                {isSubmitting ? 'Saving…' : 'Save'}
            </Button>
        </form>
    );
}

function Field({
                   label,
                   error,
                   children,
               }: {
    label: string;
    error?: string | false;
    children: React.ReactNode;
}) {
    return (
        <label className="block space-y-1">
            <span className="text-sm font-medium">{label}</span>
            {children}
            {error ? <span className="block text-xs text-destructive">{error}</span> : null}
        </label>
    );
}
