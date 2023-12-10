import Post from "../models/post.js";
import Comment from "../models/comment.js";
import Like from "../models/like.js";

/**
 * Retrieves all posts.
 *
 * @returns {Promise<Array>} A promise that resolves to an array of all post objects, each populated with author details.
 */
export const getPostsService = async () => {
  return Post.find({}).populate("author");
};

/**
 * Creates and saves a new post.
 *
 * @param {Object} post - The post object containing title, content, and other relevant data.
 * @returns {Promise<Object>} A promise that resolves to the newly created post object.
 */
export const addPostService = async (post) => {
  const postModel = new Post(post);
  return postModel.save();
};

/**
 * Retrieves a post by its ID.
 *
 * @param {string} id - The unique identifier of the post.
 * @returns {Promise<Object>} A promise that resolves to the post object, if found.
 * @throws {Error} If no post with the given ID is found.
 */
export const getPostByIdService = async (id) => {
  const post = await Post.findById(id).populate("author");

  if (!post) {
    throw new Error("Post not found");
  }

  return post;
};

/**
 * Updates a post identified by its ID. Only the author of the post can update it.
 *
 * @param {string} id - The ID of the post to update.
 * @param {string} author - The ID of the author attempting to update the post.
 * @param {Object} postUpdate - An object containing the updated title and content of the post.
 * @returns {Promise<Object>} A promise that resolves to the updated post object.
 * @throws {Error} If the post is not found or if the user is not the author of the post.
 */
export const updatePostService = async (id, author, postUpdate) => {
  const selectedPost = await getPostByIdService(id);
  if (!selectedPost) {
    throw new Error("Post not found");
  }

  if (!selectedPost.author._id.equals(author)) {
    throw new Error("Forbidden: Not your post");
  }

  selectedPost.title = postUpdate.title;
  selectedPost.content = postUpdate.content;

  const updatedPost = await selectedPost.save();

  return updatedPost;
};

/**
 * Deletes a post by its ID.
 *
 * @param {string} id - The ID of the post to delete.
 * @returns {Promise<Object>} A promise that resolves to the deleted post object.
 * @throws {Error} If no post with the given ID is found.
 */
export const deletePostService = async (id) => {
  const deletedPost = await Post.findByIdAndDelete(id);
  if (!deletedPost) {
    throw new Error("Post not found");
  }

  return deletedPost;
};

/**
 * Adds a comment to a post.
 *
 * @param {string} postId - The ID of the post to which the comment is being added.
 * @param {string} authorId - The ID of the author of the comment.
 * @param {string} content - The content of the comment.
 * @returns {Promise<Object>} A promise that resolves to the newly created comment object.
 */
export const addCommentToPostService = async (postId, authorId, content) => {
  const commentModel = new Comment({ author: authorId, content, post: postId });
  return commentModel.save();
};

/**
 * Retrieves all comments for a specific post.
 *
 * @param {string} postId - The ID of the post for which comments are being retrieved.
 * @returns {Promise<Array>} A promise that resolves to an array of comment objects associated with the post.
 */
export const getCommentsByPostIdService = async (postId) => {
  return Comment.find({ post: postId });
};

export const likePostService = async (postId, userId) => {
  const like = await Like.findOne({ post: postId, user: userId });

  if (like) {
    throw new Error("Already liked");
  }

  const likeModel = new Like({ post: postId, user: userId });

  return likeModel.save();
};

export const unlikePostService = async (postId, userId) => {
  const like = await Like.findOne({ post: postId, user: userId });

  if (!like) {
    throw new Error("Not liked");
  }

  return Like.findByIdAndDelete(like._id);
};

export const getAggregateLikesService = async (postId) => {
  const pipeline = [
    {
      $lookup: {
        from: "users",
        localField: "author",
        foreignField: "_id",
        as: "authorDetails",
      },
    },
    {
      $unwind: "$authorDetails",
    },
    {
      $lookup: {
        from: "likes",
        let: { postId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$post", "$$postId"],
              },
            },
          },
          {
            $count: "likeCount",
          },
        ],
        as: "likeData",
      },
    },
    {
      $lookup: {
        from: "comments",
        localField: "_id",
        foreignField: "post",
        as: "comments",
      },
    },
    {
      $addFields: {
        likeCount: {
          $ifNull: [{ $arrayElemAt: ["$likeData.likeCount", 0] }, 0],
        },
      },
    },
    {
      $project: {
        title: 1,
        content: 1,
        "authorDetails.username": 1,
        "authorDetails.email": 1,
        likeCount: 1,
        comments: 1,
      },
    },
  ];

  // Execute the aggregation pipeline on the Post model
  return Post.aggregate(pipeline);
};
