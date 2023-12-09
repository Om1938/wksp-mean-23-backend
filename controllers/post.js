import {
  addPostService,
  deletePostService,
  getPostByIdService,
  getPostsService,
  updatePostService,
} from "../services/post.js";

export const getAllPosts = async (req, res) => {
  getPostsService()
    .then((data) => {
      res.json(data);
    })
    .catch(next);
};

export const addPost = async (req, res) => {
  const post = req.body;
  addPostService(post)
    .then((data) => {
      res.json(data);
    })
    .catch(next);
};

export const getPostById = async (req, res) => {
  const { id } = req.params;
  getPostByIdService(id)
    .then((data) => {
      res.json(data);
    })
    .catch(next);
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const post = req.body;
  updatePostService(id, post)
    .then((data) => {
      res.json(data);
    })
    .catch(next);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  deletePostService(id)
    .then((data) => {
      res.json(data);
    })
    .catch(next);
};
