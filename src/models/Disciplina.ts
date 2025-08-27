import { Schema, model, models, Types } from "mongoose";
import { z } from 'zod';

export interface IDiscipline {
    _id: Types.ObjectId;
    name: string;
    description?: string;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const DisciplineSchema = new Schema<IDiscipline>(
    {
        name: { type: String, required: true, trim: true },
        description: { type: String },
        active: { type: Boolean, default: true },
    },
    { timestamps: true, versionKey: false }
);

DisciplineSchema.index({ name: 1 }, { unique: true });

export const createDisciplineSchema = z.object({
    body: z.object({
        name: z.string().min(2, 'Nome muito curto'),
        description: z.string().optional(),
        active: z.boolean().optional(),
    }),
});

export const updateDisciplineSchema = z.object({
    params: z.object({ id: z.string().min(1) }),
    body: z.object({
        name: z.string().min(2).optional(),
        description: z.string().optional(),
        active: z.boolean().optional(),
    }),
});

export const getByIdSchema = z.object({
    params: z.object({ id: z.string().min(1) }),
});

export const listDisciplineSchema = z.object({
    query: z.object({
        page: z.string().transform(Number).optional(),
        limit: z.string().transform(Number).optional(),
        q: z.string().optional(),
        active: z
            .enum(['true', 'false'])
            .transform((v) => v === 'true')
            .optional(),
    }),
});

export type CreateDisciplineDTO = z.infer<typeof createDisciplineSchema>['body'];
export type UpdateDisciplineDTO = z.infer<typeof updateDisciplineSchema>['body'];
export default models.Discipline || model<IDiscipline>("Discipline", DisciplineSchema);
