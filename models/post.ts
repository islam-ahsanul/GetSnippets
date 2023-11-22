import mongoose, { Schema, model, models } from 'mongoose';

const PostSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },

  title: {
    type: String,
    required: [true, 'Title is required'],
  },

  body: {
    type: String,
    required: [true, 'Body is required'],
  },

  tag: {
    type: String,
    required: [true, 'Tag is required'],
  },
});

const Post = models.Post || model('Post', PostSchema);
export default Post;
