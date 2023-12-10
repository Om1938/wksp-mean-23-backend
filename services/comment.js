import Comment from "../models/comment.js";
import { getPostByIdService } from "./post.js";

export const getCommentByID = async (id) => {
  const comment = await Comment.findById(id);
  if (!comment) {
    throw new Error("Comment not found");
  }

  return comment;
};

export const updateCommentService = async (id, author, comment) => {
  const SelectedComment = await getCommentByID(id);

  if (!SelectedComment.author._id.equals(author)) {
    throw new Error("Forbidden: Not your comment");
  }

  SelectedComment.content = comment.content;

  SelectedComment.save();
};

export const deleteCommentService = async (id, author) => {
  const SelectedComment = await (await getCommentByID(id)).populate("post");

  console.log(SelectedComment);

  if (
    !SelectedComment.author.equals(author) &&
    !SelectedComment.post.author.equals(author)
  ) {
    throw new Error("Forbidden: Not your comment");
  }

  return SelectedComment;
};
