import { z } from 'zod';

const userSchema = z.object({
  body: z
    .object({
      name: z.string().min(1, { message: 'Name is required' }),
      email: z
        .string()
        .email({ message: 'Invalid email address' })
        .min(1, { message: 'Email is required' }),
      password: z.string().min(1, { message: 'Password is required' }),
      confirmPassword: z
        .string()
        .min(1, { message: 'Confirm Password is required' }),
      photo: z
        .string()
        .url({ message: 'Invalid photo URL' })
        .min(1, { message: 'Photo is required' }),
      coverPhoto: z
        .string()
        .url({ message: 'Invalid cover photo URL' })
        .optional(),
      education: z.string().optional(),
      headline: z.string().optional(),
      info: z
        .object({
          tag: z.string().optional(),
          website: z
            .string()
            .url({ message: 'Invalid website URL' })
            .optional(),
          country: z.string().optional(),
          city: z.string().optional(),
        })
        .optional(),
      status: z.enum(['active', 'blocked'], {
        message: "Status must be either 'active' or 'blocked'",
      }),
      role: z.enum(['user', 'recruiter', 'admin'], {
        message: "Role must be either 'user', 'recruiter', or 'admin'",
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ['confirmPassword'],
    }),
});

export const userValidation = {
  userSchema,
};
