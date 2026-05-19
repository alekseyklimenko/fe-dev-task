import { randomUUID } from 'node:crypto';

export type LicenseStage = 'theory' | 'practice' | 'exam-ready';

export type Student = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  enrolledAt: string;
  licenseStage: LicenseStage;
};

export type Lesson = {
  id: string;
  studentId: string;
  instructorId: string;
  startTime: string;
  durationMinutes: number;
  notes?: string;
  createdAt: string;
};

export const instructors = [
  {
    id: '8c4d6a40-1f4e-4e3b-8b1c-9a2c5e1f4b21',
    fullName: 'Anna Petrenko',
    email: 'anna.p@scheduler.dev',
    certifications: ['Cat. B', 'Defensive Driving'],
    availability: [
      { weekday: 1, startHour: 9, endHour: 17 },
      { weekday: 3, startHour: 9, endHour: 17 },
    ],
    createdAt: '2024-03-12T09:00:00.000Z',
  },
  {
    id: 'b2e9c1d3-7a44-4f88-9b1d-3c5e7a8d2f10',
    fullName: 'Marcus Bauer',
    email: 'marcus.b@scheduler.dev',
    availability: [
      { weekday: 2, startHour: 8, endHour: 14 },
      { weekday: 4, startHour: 10, endHour: 18 },
    ],
    createdAt: '2024-05-03T09:00:00.000Z',
  },
  {
    id: 'd9a7e2b8-2c19-4d05-bb40-1f7a8c9e3b22',
    fullName: 'Sofia Romano',
    email: 'sofia.r@scheduler.dev',
    certifications: ['Cat. B', 'Cat. BE', 'Manual Transmission'],
    availability: [
      { weekday: 0, startHour: 12, endHour: 18 },
      { weekday: 5, startHour: 9, endHour: 15 },
    ],
    createdAt: '2024-01-22T09:00:00.000Z',
  },
  {
    id: 'f1c3a5d7-9e6b-4c2a-8d31-5b7e9f1a3c42',
    fullName: 'David Kim',
    email: 'david.k@scheduler.dev',
    availability: [
      { weekday: 1, startHour: 14, endHour: 20 },
      { weekday: 4, startHour: 14, endHour: 20 },
    ],
    createdAt: '2024-06-18T09:00:00.000Z',
  },
  {
    id: 'a3b5c7d9-1e2f-4a6c-9d8e-7f1b3c5d7e9a',
    fullName: 'Yulia Hrytsenko',
    email: 'yulia.h@scheduler.dev',
    certifications: ['Cat. B', 'Eco Driving'],
    availability: [
      { weekday: 2, startHour: 13, endHour: 19 },
      { weekday: 6, startHour: 10, endHour: 16 },
    ],
    createdAt: '2024-02-09T09:00:00.000Z',
  },
];

export const students: Student[] = [
  {
    id: '11111111-1111-4111-8111-111111111111',
    fullName: 'Emma Schneider',
    email: 'emma.s@example.com',
    phone: '+49 170 1112233',
    enrolledAt: '2025-09-12T10:00:00.000Z',
    licenseStage: 'theory',
  },
  {
    id: '22222222-2222-4222-8222-222222222222',
    fullName: 'Luca Conti',
    email: 'luca.c@example.com',
    phone: '+39 333 4445566',
    enrolledAt: '2025-08-03T10:00:00.000Z',
    licenseStage: 'practice',
  },
  {
    id: '33333333-3333-4333-8333-333333333333',
    fullName: 'Anastasia Volkov',
    email: 'ana.v@example.com',
    phone: '+380 67 7778899',
    enrolledAt: '2025-07-19T10:00:00.000Z',
    licenseStage: 'exam-ready',
  },
  {
    id: '44444444-4444-4444-8444-444444444444',
    fullName: 'Noah Müller',
    email: 'noah.m@example.com',
    phone: '+49 151 2223344',
    enrolledAt: '2025-10-01T10:00:00.000Z',
    licenseStage: 'theory',
  },
  {
    id: '55555555-5555-4555-8555-555555555555',
    fullName: 'Sophia Rossi',
    email: 'sophia.r@example.com',
    phone: '+39 320 5556677',
    enrolledAt: '2025-06-14T10:00:00.000Z',
    licenseStage: 'practice',
  },
  {
    id: '66666666-6666-4666-8666-666666666666',
    fullName: 'Liam Johansson',
    email: 'liam.j@example.com',
    phone: '+46 70 1239876',
    enrolledAt: '2025-05-22T10:00:00.000Z',
    licenseStage: 'practice',
  },
  {
    id: '77777777-7777-4777-8777-777777777777',
    fullName: 'Mia Andersen',
    email: 'mia.a@example.com',
    phone: '+47 92 1234567',
    enrolledAt: '2025-11-08T10:00:00.000Z',
    licenseStage: 'theory',
  },
  {
    id: '88888888-8888-4888-8888-888888888888',
    fullName: 'Hugo Lefebvre',
    email: 'hugo.l@example.com',
    phone: '+33 6 12345678',
    enrolledAt: '2025-04-30T10:00:00.000Z',
    licenseStage: 'exam-ready',
  },
  {
    id: '99999999-9999-4999-8999-999999999999',
    fullName: 'Anna Kowalski',
    email: 'anna.k@example.com',
    phone: '+48 600 112233',
    enrolledAt: '2025-09-25T10:00:00.000Z',
    licenseStage: 'practice',
  },
  {
    id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
    fullName: 'Daniel Becker',
    email: 'daniel.b@example.com',
    phone: '+49 175 9988776',
    enrolledAt: '2025-03-15T10:00:00.000Z',
    licenseStage: 'theory',
  },
  {
    id: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
    fullName: 'Olivia Garcia',
    email: 'olivia.g@example.com',
    phone: '+34 612 334455',
    enrolledAt: '2025-08-19T10:00:00.000Z',
    licenseStage: 'practice',
  },
  {
    id: 'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
    fullName: 'Maxim Petrov',
    email: 'maxim.p@example.com',
    phone: '+380 50 9988771',
    enrolledAt: '2025-07-02T10:00:00.000Z',
    licenseStage: 'exam-ready',
  },
];

function startOfIsoWeek(d: Date): Date {
  const date = new Date(d);
  const day = date.getUTCDay();
  const diff = (day === 0 ? -6 : 1 - day);
  date.setUTCDate(date.getUTCDate() + diff);
  date.setUTCHours(0, 0, 0, 0);
  return date;
}

function seedLessons(): Lesson[] {
  const today = new Date();
  const thisWeekMon = startOfIsoWeek(today);
  const lastWeekMon = new Date(thisWeekMon);
  lastWeekMon.setUTCDate(lastWeekMon.getUTCDate() - 7);

  const instructorIds = instructors.map((i) => i.id);
  const studentIds = students.map((s) => s.id);
  const durations = [60, 90, 120];
  const sampleNotes = [
    'Highway practice',
    'Parallel parking drills',
    'Roundabouts',
    undefined,
    undefined,
    'Night driving',
    'City centre route',
    undefined,
  ];

  const result: Lesson[] = [];

  const weeks = [lastWeekMon, thisWeekMon];
  for (const weekStart of weeks) {
    for (let i = 0; i < 15; i++) {
      const dayOffset = Math.floor(Math.random() * 6);
      const hour = 8 + Math.floor(Math.random() * 11);
      const minute = Math.random() < 0.5 ? 0 : 30;
      const start = new Date(weekStart);
      start.setUTCDate(start.getUTCDate() + dayOffset);
      start.setUTCHours(hour, minute, 0, 0);

      const lesson: Lesson = {
        id: randomUUID(),
        studentId: studentIds[i % studentIds.length],
        instructorId: instructorIds[i % instructorIds.length],
        startTime: start.toISOString(),
        durationMinutes: durations[i % durations.length],
        notes: sampleNotes[i % sampleNotes.length],
        createdAt: new Date().toISOString(),
      };
      result.push(lesson);
    }
  }
  return result;
}

export const lessons: Lesson[] = seedLessons();

export function findStudent(id: string): Student | undefined {
  return students.find((s) => s.id === id);
}

export function findInstructor(id: string) {
  return instructors.find((i) => i.id === id);
}

export function findLessonsInWeek(weekStartIsoDate: string): Lesson[] {
  const weekStart = new Date(`${weekStartIsoDate}T00:00:00.000Z`);
  const weekEnd = new Date(weekStart);
  weekEnd.setUTCDate(weekEnd.getUTCDate() + 7);
  return lessons.filter((l) => {
    const t = new Date(l.startTime).getTime();
    return t >= weekStart.getTime() && t < weekEnd.getTime();
  });
}
