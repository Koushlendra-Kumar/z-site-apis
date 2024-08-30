import mongoose from "@src/common/db";

const Post = new mongoose.Schema({
  text: String,
  user: {
    id: {
      type: Number,
      required: true,
      default: 234234,
    },
    name: {
      type: String,
      required: true,
      default: "John Doe",
    },
    username: {
      type: String,
      required: true,
      default: "johndoe",
    },
    avatar: {
      type: String,
      default: "XXXXXXXXXXXXXXXXXXXXXXXXX",
    },
  },
  created: {
    type: Date,
    default: Date.now,
  },
  image: {
    type: String,
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: {
    type: Number,
    default: 0,
  },
  shares: {
    type: Number,
    default: 0,
  },
  views: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model("Post", Post);
