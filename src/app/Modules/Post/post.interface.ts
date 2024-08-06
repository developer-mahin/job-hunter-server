import { Types } from 'mongoose';

export type TComment = {
  commentBody: string;
  image?: string;
  user: Types.ObjectId;
};

export type TLike = {
  user: Types.ObjectId;
};

export type TPost = {
  postDetails: string;
  image?: string;
  postCategory: string;
  comments?: TComment[];
  author: Types.ObjectId;
  likes?: TLike[];
  dislikes?: Types.ObjectId[];
};
