import { Router } from 'express';
import personRoutes from './personRoutes';

const router = Router();

router.use('/person', personRoutes);

export default router;
