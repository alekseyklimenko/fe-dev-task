# Lessons Scheduler

A small scheduling app for driving instructors. Manage students, view a weekly calendar of lessons grouped by instructor, and book new lessons.

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** for the dev server and build
- **TanStack Router** for file-based routing
- **TanStack Query** for server state
- **React Hook Form** + **Zod** for forms and validation
- **Tailwind CSS** + **shadcn/ui** primitives
- **Express** mock API (in-memory, seeded on startup)
- **Vitest** + Testing Library for tests

## Getting Started

```bash
npm install
npm run dev
```

`npm run dev` starts both the Vite dev server (http://localhost:5173) and the mock API (http://localhost:3001) concurrently.

Other scripts:

```bash
npm test           # run unit tests
npm run typecheck  # tsc --noEmit
npm run build      # production build
npm run lint       # eslint
```

## Project Structure

```
src/
├── routes/             # File-based routes (TanStack Router)
│   ├── __root.tsx
│   ├── index.tsx       # / → calendar
│   ├── students.tsx    # /students
│   ├── students.$studentId.tsx
│   ├── instructors.tsx # /instructors
│   └── book.tsx        # /book
├── api/                # API client functions (fetch + Zod parse)
├── schemas/            # Zod schemas (shared between API and forms)
├── hooks/              # Custom hooks (data fetching, form helpers)
├── components/         # UI components
│   ├── calendar/
│   ├── booking/
│   ├── students/
│   └── ui/             # shadcn primitives (button, input, dialog, …)
└── lib/                # Date helpers, debounce, classnames

server/                 # Express mock API
├── server.ts
├── db.ts               # In-memory store with seeded data
└── routes/             # Route handlers per resource
```

## API

All endpoints simulate network latency between 200–800 ms.

| Method | Path                                  | Description                          |
|--------|---------------------------------------|--------------------------------------|
| GET    | `/api/students?q=<query>`             | List students (optional text search) |
| GET    | `/api/students/:id`                   | Student detail                       |
| GET    | `/api/instructors`                    | List instructors                     |
| GET    | `/api/lessons?weekStart=YYYY-MM-DD`   | Lessons starting in that ISO week    |
| POST   | `/api/lessons`                        | Create a lesson booking              |

## Features

- **Calendar (`/`)** — weekly grid of lessons, columns are weekdays, rows are time slots. Week selector at the top.
- **Students (`/students`)** — searchable list. Click a row to open the student page.
- **Student detail (`/students/:id`)** — student info plus their upcoming lessons.
- **Instructors (`/instructors`)** — instructor cards showing certifications and weekly availability.
- **Book (`/book`)** — form to schedule a new lesson: pick a student, instructor, date/time, and duration.

## Development Notes

The app uses a mock backend with seeded fixtures. Restarting the dev server resets all data. There's no auth — every request is treated as the same logged-in instructor.

This is an early-stage codebase. Some areas are in better shape than others.
