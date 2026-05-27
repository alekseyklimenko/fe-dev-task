import {Input} from '@/components/ui/input';

type Props = {
    value: Date | null;
    onChange: (value: Date | null) => void;
    disabled?: boolean;
};

export function DateTimePicker({value, onChange, disabled}: Props) {
    const dateStr = value ? toLocalDateInputValue(value) : '';
    const timeStr = value ? toLocalTimeInputValue(value) : '';

    const update = (date: string, time: string) => {
        if (!date || !time) {
            onChange(null);
            return;
        }
        onChange(new Date(`${date}T${time}`));
    };

    return (
        <div className="flex gap-2">
            <Input
                type="date"
                value={dateStr}
                disabled={disabled}
                onChange={(e) => update(e.target.value, timeStr)}
            />
            <Input
                type="time"
                value={timeStr}
                disabled={disabled}
                onChange={(e) => update(dateStr, e.target.value)}
            />
        </div>
    );
}

function toLocalDateInputValue(d: Date) {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
}

function toLocalTimeInputValue(d: Date) {
    const hh = String(d.getHours()).padStart(2, '0');
    const mm = String(d.getMinutes()).padStart(2, '0');
    return `${hh}:${mm}`;
}
