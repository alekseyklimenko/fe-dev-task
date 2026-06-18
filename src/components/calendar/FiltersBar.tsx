import {Button} from '@/components/ui/button';
import {Select} from '@/components/ui/select';
import type {InstructorOption} from '@/schemas/instructor';

type LessonsFilters = {
    instructorIds: string[];
    studentIds: string[];
    showOnlyFavourites: boolean;
    search: string;
};

type SortBy = 'time' | 'instructor' | 'student';

type Props = {
    filters: LessonsFilters;
    setFilter: <K extends keyof LessonsFilters>(key: K, value: LessonsFilters[K]) => void;
    resetFilters: () => void;
    sortBy: SortBy;
    setSortBy: (s: SortBy) => void;
    instructors: InstructorOption[];
};

export function FiltersBar({
                               filters,
                               setFilter,
                               resetFilters,
                               sortBy,
                               setSortBy,
                               instructors,
                           }: Props) {
    return (
        <div className="flex flex-wrap items-center gap-3 rounded-lg border bg-card p-3">
            <label className="text-sm">
                <span className="mr-2 text-muted-foreground">Instructor</span>
                <Select
                    value={filters.instructorIds[0] ?? ''}
                    onChange={(e) =>
                        setFilter('instructorIds', e.target.value ? [e.target.value] : [])
                    }
                    className="w-48"
                >
                    <option value="">All instructors</option>
                    {instructors.map((i) => (
                        <option key={i.id} value={i.id}>
                            {i.fullName}
                        </option>
                    ))}
                </Select>
            </label>

            <label className="flex items-center gap-2 text-sm">
                <input
                    type="checkbox"
                    checked={filters.showOnlyFavourites}
                    onChange={(e) => setFilter('showOnlyFavourites', e.target.checked)}
                />
                <span>Favourites only</span>
            </label>

            <label className="text-sm">
                <span className="mr-2 text-muted-foreground">Sort by</span>
                <Select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortBy)}
                    className="w-36"
                >
                    <option value="time">Time</option>
                    <option value="instructor">Instructor</option>
                    <option value="student">Student</option>
                </Select>
            </label>

            <Button variant="ghost" size="sm" onClick={resetFilters} className="ml-auto">
                Reset
            </Button>
        </div>
    );
}
