import * as z from 'zod';

export const createNoteSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1)
});

export type CreateNoteVariables = z.infer<typeof createNoteSchema>