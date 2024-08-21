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
      .min(1, { message: 'Name is required' })
      .optional(),
    education: z.string().min(1, { message: 'Name is required' }).optional(),
    headline: z.string().min(1, { message: 'Name is required' }).optional(),
    phoneNumber: z.string().min(1, { message: 'Name is required' }).optional(),
    about: z.string().min(1, { message: 'Name is required' }).optional(),
    info: z
      .object({
        tag: z.string().min(1, { message: 'Name is required' }).optional(),
        website: z
          .string()
          .min(1, { message: 'Name is required' })
          .url({ message: 'Invalid website URL' })
          .optional(),
        country: z.string().min(1, { message: 'Name is required' }).optional(),
        city: z.string().min(1, { message: 'Name is required' }).optional(),
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
