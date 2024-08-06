import mongoose, { Schema } from 'mongoose';
import { TComment, TLike, TPost } from './post.interface';

const commentSchema = new mongoose.Schema<TComment>({
  commentBody: {
    type: String,
    required: true,
    trim: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const likeSchema = new mongoose.Schema<TLike>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const postSchema = new mongoose.Schema<TPost>(
  {
    postDetails: {
      type: String,
      required: true,
      trim: true,
    },
    postCategory: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
    },
    comments: [commentSchema],
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    likes: [likeSchema],
    dislikes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true },
);

const Post = mongoose.model<TPost>('Post', postSchema);
export default Post;
