import mongoose, { Schema } from 'mongoose';
import { TJob } from './job.interface';

const jobSchema = new mongoose.Schema<TJob>(
  {
    jobTitle: {
      type: String,
      required: [true, 'Job title is required'],
    },
    companyName: {
      type: String,
      required: [true, 'Company name is required'],
    },
    companyLogo: {
      type: String,
      required: [true, 'Company logo is required'],
    },
    workPlaceType: {
      type: String,
      required: [true, 'Workplace type is required'],
    },
    jobType: {
      type: String,
      required: [true, 'Job type is required'],
    },
    description: {
      type: String,
      required: [true, 'Job description is required'],
    },
    skills: {
      type: String,
      required: [true, 'Skills are required'],
    },
    experience: {
      type: String,
      required: [true, 'Experience is required'],
    },
    additionalRequirements: {
      type: String,
      required: [true, 'Additional requirements are required'],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Author is required'],
    },
    selectedCandidate: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Author is required'],
    },
    candidate: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Job = mongoose.model<TJob>('Job', jobSchema);

export default Job;
