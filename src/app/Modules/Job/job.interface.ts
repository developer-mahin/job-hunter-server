import { Types } from 'mongoose';

export type TJob = {
  jobTitle: string;
  companyName: string;
  companyLogo: string;
  workPlaceType: string;
  jobType: string;
  description: string;
  skills: string;
  experience: string;
  additionalRequirements: string;
  author: Types.ObjectId;
  candidate?: Types.ObjectId[];
  selectedCandidate?: Types.ObjectId;
};
