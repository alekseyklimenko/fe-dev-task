import {Link} from '@tanstack/react-router';
import {cn} from '@/lib/cn';

const links = [
    {to: '/', label: 'Calendar'},
    {to: '/students', label: 'Students'},
    {to: '/instructors', label: 'Instructors'},
    {to: '/book', label: 'Book'},
] as const;

export function TopNav() {
    return (
        <header className="border-b">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
                <Link to="/" className="text-base font-semibold">
                    Lessons Scheduler
                </Link>
                <nav className="flex gap-4 text-sm">
                    {links.map((l) => (
                        <Link
                            key={l.to}
                            to={l.to}
                            className="text-muted-foreground transition-colors hover:text-foreground"
                            activeProps={{
                                className: cn('font-medium text-foreground underline underline-offset-4'),
                            }}
                        >
                            {l.label}
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    );
}
