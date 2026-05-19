import type { Instructor } from '@/schemas/instructor';

export function InstructorCard({ instructor }: { instructor: Instructor }) {
  return (
    <div className="rounded-lg border p-4">
      <h3 className="font-semibold">{instructor.fullName}</h3>
      <p className="text-sm text-muted-foreground">{instructor.email}</p>
      <div className="mt-3">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          Certifications
        </p>
        <ul className="mt-1 flex flex-wrap gap-1">
          {instructor.certifications.map((c) => (
            <li key={c} className="rounded bg-muted px-2 py-0.5 text-xs">
              {c}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
