import * as trpc from '@trpc/server';
import { signupSchama } from '../../common/validation/auth';
import { Context } from '../context';
import { hash } from 'argon2';

export const userRouter = trpc.router<Context>()
  .mutation('signup', {
    input: signupSchama,
    resolve: async ({ input, ctx }) => {

      const { username, email, password } = input;

      const hashedPassword = await hash(password);

      try {
        const newUser = await ctx.prisma.user.create({
          data: {
            username,
            email,
            password: hashedPassword
          }
        });

        return {
          status: 201,
          message: 'Account created succesfully',
          result: newUser.email
        };

      } catch (e: any) {
        if (e.code === 'P2002') {
          throw new trpc.TRPCError({
            code: 'CONFLICT',
            message: 'User already exists.'
          });
        } else {
          throw new trpc.TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: e.message
          });
        }
      }
    }
  });