import Post from "../models/post.js";
import Comment from "../models/comment.js";

export const getPostsService = async () => {
  return Post.find({});
};

export const addPostService = async (post) => {
  const postModel = new Post(post);
  return postModel.save();
};

export const getPostByIdService = async (id) => {
  return Post.findById(id);
};

export const updatePostService = async (id, post) => {
  return Post.findByIdAndUpdate(id, post, {
    new: false,
  });
};

export const deletePostService = async (id) => {
  return Post.findByIdAndDelete(id);
};

export const addCommentToPostService = async (post,author, content) => {
const commentModel = new Comment({author,content, post});
return commentModel.save();
}

export const getCommentsByPostIdService = async (id) => {
  return Comment.find({post:id});
}

export const deleteCommentService = async (id) => {
  return Comment.findByIdAndDelete(id);
}

