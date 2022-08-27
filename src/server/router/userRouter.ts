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

      } catch (e) {
        throw new trpc.TRPCError({
          code: 'CONFLICT',
          message: 'User already exists.'
        });
      }
    }
  });