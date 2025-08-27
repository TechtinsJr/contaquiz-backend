import { Router, Request, Response, NextFunction } from 'express';
import { validate } from '../middlewares/validate';
import {
    createDisciplineSchema,
    updateDisciplineSchema,
    getByIdSchema,
    listDisciplineSchema,
} from '../models/Disciplina';
import {
    createDiscipline,
    getDisciplineById,
    listDisciplines,
    updateDiscipline,
    deleteDiscipline,
} from '../services/disciplina.service';

const router = Router();

// helper pra evitar try/catch repetido e jogar pro errorHandler
const ah =
    (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
        (req: Request, res: Response, next: NextFunction) =>
            Promise.resolve(fn(req, res, next)).catch(next);

// LIST
router.get(
    '/',
    validate(listDisciplineSchema),
    ah(async (req, res) => {
        const { page, limit, q, active } = req.query as any;
        const result = await listDisciplines({
            page: page ? Number(page) : undefined,
            limit: limit ? Number(limit) : undefined,
            q,
            active, // já vem boolean pelo schema (se usar o validate)
        });
        res.json(result);
    })
);

// GET BY ID
router.get(
    '/:id',
    validate(getByIdSchema),
    ah(async (req, res) => {
        const doc = await getDisciplineById(req.params.id);
        res.json({ data: doc });
    })
);

// CREATE
router.post(
    '/',
    validate(createDisciplineSchema),
    ah(async (req, res) => {
        const created = await createDiscipline(req.body);
        res.status(201).json({ data: created });
    })
);

// UPDATE
router.put(
    '/:id',
    validate(updateDisciplineSchema),
    ah(async (req, res) => {
        const updated = await updateDiscipline(req.params.id, req.body);
        res.json({ data: updated });
    })
);

// DELETE
router.delete(
    '/:id',
    validate(getByIdSchema),
    ah(async (req, res) => {
        await deleteDiscipline(req.params.id);
        res.status(204).send();
    })
);

export default router;
