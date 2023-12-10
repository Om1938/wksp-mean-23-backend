import User from "../models/user.js";

/**
 * Creates and saves a new user to the database.
 *
 * @param {Object} user - The user object containing necessary user information.
 * @returns {Promise<Object>} A promise that resolves to the newly created user object.
 */
export const addUserService = async (user) => {
  const userModel = new User(user);
  return userModel.save();
};

/**
 * Retrieves all users from the database.
 *
 * @returns {Promise<Array>} A promise that resolves to an array of user objects.
 */
export const getUsersService = async () => {
  return User.find({});
};

/**
 * Retrieves a user by their ID.
 *
 * @param {string} id - The unique identifier of the user.
 * @returns {Promise<Object>} A promise that resolves to the user object if found.
 */
export const getUserByIdService = async (id) => {
  return User.findById(id);
};

/**
 * Updates a user identified by their ID.
 *
 * @param {string} id - The ID of the user to update.
 * @param {Object} userUpdate - An object containing the updated data for the user.
 * @returns {Promise<Object>} A promise that resolves to the updated user object.
 */
export const updateUserByIdService = async (id, userUpdate) => {
  return User.findByIdAndUpdate(id, userUpdate, { new: false });
};

/**
 * Deletes a user by their ID.
 *
 * @param {string} id - The ID of the user to delete.
 * @returns {Promise<Object>} A promise that resolves to the deleted user object.
 */
export const deleteUserByIdService = async (id) => {
  return User.findByIdAndDelete(id);
};
