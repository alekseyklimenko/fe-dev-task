import { Router } from 'express';
import { instructors } from '../db';

const router = Router();

router.get('/instructors', async (_req, res) => {
  const delay = 300 + Math.floor(Math.random() * 200);
  await new Promise((r) => setTimeout(r, delay));
  res.json(instructors);
});

export default router;
