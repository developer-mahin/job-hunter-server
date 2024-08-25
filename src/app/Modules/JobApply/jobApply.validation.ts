import { z } from 'zod';

const createJobApplyValidationSchema = z.object({
  body: z.object({
    candidateName: z.string({
      required_error: 'Candidate name is required',
    }),
    candidateEmail: z
      .string({
        required_error: 'Candidate email is required',
      })
      .email('Please enter a valid email address'),
    expectedSalary: z.string({
      required_error: 'Expected salary is required',
    }),
    experience: z.string({
      required_error: 'Experience is required',
    }),
    noticePeriod: z.string({
      required_error: 'Notice period is required',
    }),
    resume: z.string({
      required_error: 'Resume is required',
    }),
  }),
});

export const jobApplyValidation = {
  createJobApplyValidationSchema,
};
