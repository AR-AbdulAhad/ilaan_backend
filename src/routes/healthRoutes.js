import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({ status: 'true', message: 'Ilaan Backend Server is running' });
});

export default router;
