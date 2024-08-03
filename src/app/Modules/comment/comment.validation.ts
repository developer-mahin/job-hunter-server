import { z } from 'zod';

export const commentValidationSchema = z.object({
  body: z.object({
    commentBody: z.string().min(1, 'Comment is required'),
    image: z.string().optional(),
    user: z
      .string()
      .refine(
        (val) => {
          return /^[0-9a-fA-F]{24}$/.test(val);
        },
        {
          message: 'Invalid author ObjectId',
        },
      )
      .optional(),
  }),
});

export const updateCommentValidationSchema = z.object({
  body: z.object({
    commentBody: z.string().min(1, 'Comment is required').optional(),
    image: z.string().optional(),
    commentId: z
      .string()
      .refine(
        (val) => {
          return /^[0-9a-fA-F]{24}$/.test(val);
        },
        {
          message: 'Invalid author ObjectId',
        },
      )
      .optional(),
    user: z
      .string()
      .refine(
        (val) => {
          return /^[0-9a-fA-F]{24}$/.test(val);
        },
        {
          message: 'Invalid author ObjectId',
        },
      )
      .optional(),
  }),
});

export const commentValidation = {
  commentValidationSchema,
  updateCommentValidationSchema,
};
