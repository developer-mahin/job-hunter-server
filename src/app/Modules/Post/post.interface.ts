import { Types } from 'mongoose';

export type TComment = {
  commentBody: string;
  image?: string;
  user: Types.ObjectId;
};

export type TPost = {
  postDetails: string;
  image?: string;
  comments?: TComment[];
  author: Types.ObjectId;
  likes?: Types.ObjectId[];
  dislikes?: Types.ObjectId[];
};
