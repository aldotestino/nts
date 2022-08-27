import { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { verify } from 'argon2';

import { prisma } from './prisma';
import { loginSchema } from './validation/auth';

export const nextAuthOptions: NextAuthOptions = {
  secret: process.env.JWT_SECRET,
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'jsmith@gmail.com'
        },
        password: {
          label: 'Password',
          type: 'password'
        },
      },
      authorize: async (credentials, request) => {
        const creds = await loginSchema.parseAsync(credentials);

        const user = await prisma.user.findFirst({
          where: {
            email: creds.email
          }
        });

        if (!user) {
          return null;
        }

        const isValidPassword = await verify(user.password, creds.password);

        if (!isValidPassword) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          username: user.username
        };
      }
    })
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username = user.username;
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.id = token.id;
        session.username = token.username;
      }

      return session;
    },
  },
  session: {
    strategy: 'jwt'
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    maxAge: 15 * 24 * 30 * 60 // 15 days
  },
  pages: {
    signIn: '/login',
    newUser: '/signup'
  }
};