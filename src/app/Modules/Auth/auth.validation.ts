import { z } from 'zod';

const registerUserValidationSchema = z.object({
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
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ['confirmPassword'],
    }),
});

const loginUserValidationSchema = z.object({
  body: z.object({
    email: z
      .string()
      .email({ message: 'Invalid email address' })
      .min(1, { message: 'Email is required' }),
    password: z.string().min(1, { message: 'Password is required' }),
  }),
});

const changePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({ required_error: 'Id is required.' }),
    newPassword: z.string({ required_error: 'Password is required' }),
  }),
});

export const authValidation = {
  registerUserValidationSchema,
  loginUserValidationSchema,
  changePasswordValidationSchema
};
