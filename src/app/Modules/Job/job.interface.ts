import { Types } from 'mongoose';

export type TJob = {
  jobTitle: string;
  companyName: string;
  companyLogo?: string;
  location: string;
  website: string;
  workPlaceType: string;
  jobType: string;
  jobDescription: string;
  author: Types.ObjectId;
  candidate?: Types.ObjectId[];
  selectedCandidate?: Types.ObjectId;
};
