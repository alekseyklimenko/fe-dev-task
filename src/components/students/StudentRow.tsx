import {Link} from '@tanstack/react-router';
import type {Student} from '@/schemas/student';

const STAGE_LABEL: Record<Student['licenseStage'], string> = {
    theory: 'Theory',
    practice: 'Practice',
    'exam-ready': 'Exam-ready',
};

export function StudentRow({student}: { student: Student }) {
    return (
        <Link
            to="/students/$studentId"
            params={{studentId: student.id}}
            className="flex items-center justify-between rounded-md border bg-card p-3 transition-colors hover:bg-accent"
        >
            <div>
                <p className="font-medium">{student.fullName}</p>
                <p className="text-sm text-muted-foreground">{student.email}</p>
            </div>
            <span className="text-xs uppercase tracking-wide text-muted-foreground">
        {STAGE_LABEL[student.licenseStage]}
      </span>
        </Link>
    );
}
