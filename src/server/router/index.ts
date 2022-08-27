import * as trpc from '@trpc/server';
import { Context } from '../context';
import { noteRouter } from './noteRouter';
import { userRouter } from './userRouter';

export const serverRouter = trpc.router<Context>()
  .merge('user.', userRouter)
  .merge('note.', noteRouter);

export type ServerRouter = typeof serverRouter;