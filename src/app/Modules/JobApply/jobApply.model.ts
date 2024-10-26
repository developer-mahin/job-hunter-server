import mongoose, { Schema } from 'mongoose';

const jobApplySchema = new mongoose.Schema(
  {
    candidateId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Candidate ID is required'],
    },
    jobId: {
      type: Schema.Types.ObjectId,
      ref: 'Job',
      required: [true, 'Job ID is required'],
    },
    candidateName: {
      type: String,
      required: [true, 'Candidate name is required'],
    },
    candidateEmail: {
      type: String,
      required: [true, 'Candidate email is required'],
    },
    expectedSalary: {
      type: String,
      required: [true, 'Expected salary is required'],
    },
    experience: {
      type: String,
      required: [true, 'Experience is required'],
    },
    noticePeriod: {
      type: String,
      required: [true, 'Notice period is required'],
    },
    resume: {
      type: String,
      required: [true, 'Resume is required'],
    },
  },
  {
    timestamps: true,
  },
);

const JobApply = mongoose.model('JobApply', jobApplySchema);
export default JobApply;
