import { z } from 'zod';

const createJobValidationSchema = z.object({
  body: z.object({
    jobTitle: z.string({
      required_error: 'Job title is required',
    }),
    companyName: z.string({
      required_error: 'Company name is required',
    }),
    companyLogo: z
      .string({
        required_error: 'Company logo is required',
      })
      .optional(),
    workPlaceType: z.string({
      required_error: 'Workplace type is required',
    }),

    jobType: z.string({
      required_error: 'Job type is required',
    }),
    jobDescription: z.string({
      required_error: 'Job description is required',
    }),
    website: z.string({
      required_error: 'website are required',
    }),
    location: z.string({
      required_error: 'location are required',
    }),
  }),
});

const updateJobValidationSchema = z.object({
  body: z.object({
    jobTitle: z
      .string({
        required_error: 'Job title is required',
      })
      .optional(),
    companyName: z
      .string({
        required_error: 'Company name is required',
      })
      .optional(),
    companyLogo: z
      .string({
        required_error: 'Company logo is required',
      })
      .optional(),
    workPlaceType: z
      .string({
        required_error: 'Workplace type is required',
      })
      .optional(),
    jobType: z
      .string({
        required_error: 'Job type is required',
      })
      .optional(),
    description: z
      .string({
        required_error: 'Job description is required',
      })
      .optional(),
    skills: z
      .string({
        required_error: 'Skills are required',
      })
      .optional(),
    website: z
      .string({
        required_error: 'website are required',
      })
      .optional(),
    location: z
      .string({
        required_error: 'location are required',
      })
      .optional(),
    experience: z
      .string({
        required_error: 'Experience is required',
      })
      .optional(),
    additionalRequirements: z
      .string({
        required_error: 'Additional requirements are required',
      })
      .optional(),
    author: z
      .string({
        required_error: 'Author is required',
      })
      .refine((value) => /^[0-9a-fA-F]{24}$/.test(value), {
        message: 'Author must be a valid ObjectId',
      })
      .optional(),
    candidate: z
      .array(
        z.string().refine((value) => /^[0-9a-fA-F]{24}$/.test(value), {
          message: 'Each candidate must be a valid ObjectId',
        }),
      )
      .optional(),
  }),
});

export const jobValidation = {
  createJobValidationSchema,
  updateJobValidationSchema,
};
