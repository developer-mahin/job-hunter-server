import { Types } from 'mongoose';

export type TJobApply = {
  candidateId: Types.ObjectId;
  jobId: Types.ObjectId;
  candidateName: string;
  candidateEmail: string;
  expectedSalary: string;
  experience: string;
  noticePeriod: string;
  resume: string;
};

