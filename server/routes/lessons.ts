import { Router } from 'express';
import { randomUUID } from 'node:crypto';
import { lessons, findLessonsInWeek, type Lesson } from '../db';

const router = Router();

router.get('/lessons', async (req, res) => {
  const weekStart = String(req.query.weekStart ?? '');
  const delay = 400 + Math.floor(Math.random() * 400);
  await new Promise((r) => setTimeout(r, delay));

  if (!weekStart) {
    res.json(lessons);
    return;
  }
  res.json(findLessonsInWeek(weekStart));
});

router.post('/lessons', async (req, res) => {
  const delay = 400 + Math.floor(Math.random() * 400);
  await new Promise((r) => setTimeout(r, delay));

  const { studentId, instructorId, startTime, durationMinutes, notes } = req.body ?? {};
  if (!studentId || !instructorId || !startTime || !durationMinutes) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  const lesson: Lesson = {
    id: randomUUID(),
    studentId,
    instructorId,
    startTime,
    durationMinutes,
    notes,
    createdAt: new Date().toISOString(),
  };
  lessons.push(lesson);
  res.status(201).json(lesson);
});

export default router;
