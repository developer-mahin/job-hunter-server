import { z } from 'zod';

const commentSchema = z.object({
  comment: z.string().min(1, 'Comment is required'),
  user: z.string().refine(
    (val) => {
      return /^[0-9a-fA-F]{24}$/.test(val);
    },
    {
      message: 'Invalid user ObjectId',
    },
  ),
});

const createPostValidationSchema = z.object({
  body: z.object({
    postDetails: z.string().min(1, 'Post details are required'),
    image: z.string().optional(),
    comments: z.array(commentSchema).optional(),
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
