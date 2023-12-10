import Comment from "../models/comment.js";

/**
 * Retrieves a comment by its ID from the database.
 *
 * @param {string} id - The ID of the comment to retrieve.
 * @returns {Promise<Object>} A promise that resolves to the comment object if found.
 * @throws {Error} If the comment is not found.
 */
export const getCommentByID = async (id) => {
  const comment = await Comment.findById(id);
  if (!comment) {
    throw new Error("Comment not found");
  }

  return comment;
};

/**
 * Updates the content of a comment. Only the author of the comment can update it.
 *
 * @param {string} id - The ID of the comment to update.
 * @param {string} author - The ID of the author of the comment.
 * @param {Object} commentUpdate - Object containing the updated content of the comment.
 * @throws {Error} If the comment is not found or the author does not match.
 */
export const updateCommentService = async (id, author, commentUpdate) => {
  const SelectedComment = await getCommentByID(id);

  if (!SelectedComment.author._id.equals(author)) {
    throw new Error("Forbidden: Not your comment");
  }

  SelectedComment.content = commentUpdate.content;

  await SelectedComment.save();
};

/**
 * Deletes a comment. Either the author of the comment or the author of the post can delete the comment.
 *
 * @param {string} id - The ID of the comment to delete.
 * @param {string} author - The ID of the user attempting to delete the comment.
 * @returns {Promise<Object>} A promise that resolves to the deleted comment object.
 * @throws {Error} If neither the comment's author nor the post's author matches the provided author ID.
 */
export const deleteCommentService = async (id, author) => {
  const SelectedComment = await (await getCommentByID(id)).populate("post");

  if (
    !SelectedComment.author.equals(author) &&
    !SelectedComment.post.author.equals(author)
  ) {
    throw new Error("Forbidden: Not your comment");
  }

  await SelectedComment.remove();
  return SelectedComment;
};
