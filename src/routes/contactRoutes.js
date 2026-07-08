import { Router } from 'express';
import { validateContactInput } from '../middlewares/validator.js';
import { sendContactEmail } from '../controllers/contactController.js';

const router = Router();

router.post('/', validateContactInput, sendContactEmail);

export default router;
