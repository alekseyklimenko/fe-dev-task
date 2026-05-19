import express from 'express';
import cors from 'cors';
import studentsRouter from './routes/students';
import instructorsRouter from './routes/instructors';
import lessonsRouter from './routes/lessons';

const app = express();
const PORT = 3001;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ ok: true });
});

app.use('/api', studentsRouter);
app.use('/api', instructorsRouter);
app.use('/api', lessonsRouter);

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
