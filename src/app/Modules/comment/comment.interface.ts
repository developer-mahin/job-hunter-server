import { Types } from 'mongoose';

export type TUpdateCommentData = {
  commentBody: string;
  image?: string;
  commentId: Types.ObjectId;
};
