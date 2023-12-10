import {
  addCommentToPostService,
  addPostService,
  deletePostService,
  getCommentsByPostIdService,
  getPostByIdService,
  getPostsService,
  updatePostService,
} from "../services/post.js";

export const getAllPosts = async (req, res, next) => {
  getPostsService()
    .then((data) => {
      res.json(data);
    })
    .catch(next);
};

export const addPost = async (req, res, next) => {
  const post = req.body;
  const { user } = req;

  post.author = user._id;

  addPostService(post)
    .then((data) => {
      res.json(data);
    })
    .catch(next);
};

export const getPostById = async (req, res, next) => {
  const { id } = req.params;
  getPostByIdService(id)
    .then((data) => {
      res.json(data);
    })
    .catch(next);
};

export const updatePost = async (req, res, next) => {
  const { id } = req.params;

  const { user } = req;

  const post = req.body;
  updatePostService(id, user._id, post)
    .then((data) => {
      res.json(data);
    })
    .catch(next);
};

export const deletePost = async (req, res, next) => {
  const { id } = req.params;
  deletePostService(id)
    .then((data) => {
      res.json(data);
    })
    .catch(next);
};

export const addCommentToPost = (req, res, next) => {
  const { postId } = req.params;
  const { content } = req.body;
  const author = req.user?._id;

  if (!author) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (!content) {
    return res.status(400).json({ message: "Content is required" });
  }

  if (!postId) {
    return res.status(400).json({ message: "Post ID is required" });
  }

  addCommentToPostService(postId, author, content)
    .then((data) => {
      res.json(data);
    })
    .catch(next);
};

export const getCommentsForPost = (req, res, next) => {
  const { postId } = req.params;
  getCommentsByPostIdService(postId)
    .then((data) => {
      res.json(data);
    })
    .catch(next);
};
