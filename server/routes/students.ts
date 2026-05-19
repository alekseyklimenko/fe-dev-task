import { Router } from 'express';
import { students, findStudent } from '../db';

const router = Router();

router.get('/students', async (req, res) => {
  const q = String(req.query.q ?? '').toLowerCase();
  const delay = q.length === 0 ? 200 : Math.max(200, 900 - q.length * 100);
  await new Promise((r) => setTimeout(r, delay));

  const filtered = q
    ? students.filter((s) => s.fullName.toLowerCase().includes(q))
    : students;
  res.json(filtered);
});

router.get('/students/:id', async (req, res) => {
  const delay = 300 + Math.floor(Math.random() * 200);
  await new Promise((r) => setTimeout(r, delay));
  const student = findStudent(req.params.id);
  if (!student) {
    res.status(404).json({ error: 'Student not found' });
    return;
  }
  res.json(student);
});

export default router;
