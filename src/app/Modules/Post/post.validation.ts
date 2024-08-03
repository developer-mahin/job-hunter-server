import { z } from 'zod';

export const commentValidationSchema = z.object({
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
});

const createPostValidationSchema = z.object({
  body: z.object({
    postDetails: z.string().min(1, 'Post details are required'),
    image: z.string().optional(),
    comments: z.array(commentValidationSchema).optional(),
    author: z
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
    likes: z
      .array(
        z.string().refine(
          (val) => {
            return /^[0-9a-fA-F]{24}$/.test(val);
          },
          {
            message: 'Invalid like ObjectId',
          },
        ),
      )
      .optional(),
    dislikes: z
      .array(
        z.string().refine(
          (val) => {
            return /^[0-9a-fA-F]{24}$/.test(val);
          },
          {
            message: 'Invalid dislike ObjectId',
          },
        ),
      )
      .optional(),
  }),
});

const updatePostValidationSchema = z.object({
  body: z.object({
    postDetails: z.string().min(1, 'Post details are required'),
    image: z.string().optional(),
  }),
});

export const postValidation = {
  createPostValidationSchema,
  updatePostValidationSchema,
};
