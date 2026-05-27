import {Input} from '@/components/ui/input';

type Props = {
    value: string;
    onChange: (v: string) => void;
};

export function StudentSearchBox({value, onChange}: Props) {
    return (
        <Input
            type="search"
            placeholder="Search students by name…"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="max-w-md"
        />
    );
}
