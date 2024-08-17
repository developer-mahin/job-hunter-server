import { z } from 'zod';

const updateUserValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: 'Name is required' }).optional(),
    photo: z
      .string()
      .url({ message: 'Invalid photo URL' })
      .min(1, { message: 'Photo is required' })
      .optional(),
    coverPhoto: z
      .string()
      .url({ message: 'Invalid cover photo URL' })
      .optional(),
    education: z.string().optional(),
    headline: z.string().optional(),
    info: z
      .object({
        tag: z.string().optional(),
        website: z.string().url({ message: 'Invalid website URL' }).optional(),
        country: z.string().optional(),
        city: z.string().optional(),
      })
      .optional(),
  }),
});

const deleteUserValidationSchema = z.object({
  body: z.object({
    isDeleted: z.boolean(),
  }),
});

export const userValidation = {
  updateUserValidationSchema,
  deleteUserValidationSchema,
};
