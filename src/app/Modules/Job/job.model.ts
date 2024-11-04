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
      // required: [true, 'Company logo is required'],
    },
    workPlaceType: {
      type: String,
      required: [true, 'Workplace type is required'],
    },
    Industryndustry: {
      type: String,
      required: [true, 'Workplace type is required'],
    },
    jobType: {
      type: String,
      required: [true, 'Job type is required'],
    },
    jobDescription: {
      type: String,
      required: [true, 'Job description is required'],
    },

    location: {
      type: String,
      required: [true, 'location is required'],
    },
    website: {
      type: String,
      required: [true, 'website is required'],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Author is required'],
    },
    selectedCandidate: {
      type: Schema.Types.ObjectId,
      ref: 'User',
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
