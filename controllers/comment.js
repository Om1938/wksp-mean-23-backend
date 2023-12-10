import {
  deleteCommentService,
  getCommentByID,
  updateCommentService,
} from "../services/comment.js";

export const getAllComments = async (req, res, next) => {
  res
    .status(403)
    .json({ message: "Forbidden to get all comments, use posts route" });
};

export const addComment = async (req, res, next) => {
  res
    .status(403)
    .json({ message: "Forbidden to add comment, user posts route" });
};

export const getComment = async (req, res, next) => {
  const id = req.params.id;

  getCommentByID(id)
    .then((data) => {
      res.json(data);
    })
    .catch(next);
};

export const updateComment = async (req, res, next) => {
  const user = req.user;
  const id = req.params.id;
  const { content } = req.body;

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (!id) {
    return res.status(400).json({ message: "Comment ID is required" });
  }

  updateCommentService(id, user._id, { content })
    .then((data) => {
      res.json(data);
    })
    .catch(next);
};

export const deleteComment = async (req, res, next) => {
  const user = req.user;
  const id = req.params.id;

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (!id) {
    return res.status(400).json({ message: "Comment ID is required" });
  }

  deleteCommentService(id, user._id)
    .then((data) => {
      res.json(data);
    })
    .catch(next);
};
