import { Router } from 'express';
import healthRouter from './health.routes';
import disciplinaRouter from './disciplina.routes'

const router = Router();

router.use(healthRouter);        // /healthz e /readyz
router.use('/disciplinas', disciplinaRouter)

export default router;
