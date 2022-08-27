import * as z from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4)
});

export const signupSchama = loginSchema.extend({
  username: z.string()
});

export type LoginVariables = z.infer<typeof loginSchema>
export type SignupVariables = z.infer<typeof signupSchama>