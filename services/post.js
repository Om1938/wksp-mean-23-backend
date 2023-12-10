import Post from "../models/post.js";
import Comment from "../models/comment.js";

export const getPostsService = async () => {
  return Post.find({}).populate("author");
};

export const addPostService = async (post) => {
  const postModel = new Post(post);
  return postModel.save();
};

export const getPostByIdService = async (id) => {
  const post = await Post.findById(id).populate("author");

  if (!post) {
    throw new Error("Post not found");
  }

  return post;
};

export const updatePostService = async (id, author, post) => {
  const selectedPost = await getPostByIdService(id);
  if (!selectedPost) {
    throw new Error("Post not found");
  }

  if (!selectedPost.author._id.equals(author)) {
    throw new Error("Forbidden: Not your post");
  }

  return Post.findByIdAndUpdate(id, post);
};

export const deletePostService = async (id) => {
  const deltetdPost = await Post.findByIdAndDelete(id);
  if (!deltetdPost) {
    throw new Error("Post not found");
  }

  return deltetdPost;
};

export const addCommentToPostService = async (post, author, content) => {
  const commentModel = new Comment({ author, content, post });
  return commentModel.save();
};

export const getCommentsByPostIdService = async (postId) => {
  return Comment.find({ post: postId });
};
