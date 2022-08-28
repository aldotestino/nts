import * as trpc from '@trpc/server';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createNoteSchema } from '../../common/validation/note';
import { Context } from '../context';

export const noteRouter = trpc.router<Context>()
  .mutation('delete', {
    input: z.object({
      noteId: z.string()
    }),
    resolve: async ({ input, ctx }) => {
      if (!ctx.session?.user) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Only authenticated user can delete notes.'
        });
      }

      const userId = ctx.session.id as string;

      const noteToDelete = await ctx.prisma.note.findUnique({
        where: {
          id: input.noteId
        }
      });

      if (noteToDelete?.userId !== userId) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'You don\'t own this note.'
        });
      }

      await ctx.prisma.note.delete({
        where: {
          id: input.noteId
        }
      });

      return {
        status: 200,
        message: 'Note deleted succesfully',
        result: noteToDelete.id
      };
    }
  })
  .mutation('create', {
    input: createNoteSchema,
    resolve: async ({ input, ctx }) => {
      if (!ctx.session?.user) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Only authenticated user can add notes.'
        });
      }

      const userId = ctx.session.id as string;

      const newNote = await ctx.prisma.note.create({
        data: {
          title: input.title,
          content: input.content,
          userId
        }
      });

      return {
        status: 201,
        message: 'Note created succesfully',
        result: {
          note: newNote
        }
      };
    }
  });