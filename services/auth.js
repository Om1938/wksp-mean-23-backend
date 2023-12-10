import User from "../models/user.js";
import jwt from "jsonwebtoken";

/**
 * Authenticates a user and provides a JWT token if successful.
 *
 * @param {string} email - User's email.
 * @param {string} password - User's password.
 * @returns {Promise<Object>} An object containing the user's details and a JWT token.
 * @throws Will throw an error if the user is not found or the password is incorrect.
 */
export const loginAuthService = async (email, password) => {
  // Attempts to find a user by their email. Only retrieves necessary fields.
  const user = await User.findOne(
    { email },
    { password: 1, email: 1, username: 1 }
  );

  // If no user is found, an error is thrown.
  if (!user) {
    throw new Error("User not found");
  }

  // Compares the provided password with the stored one.
  const isMatch = password === user.password;
  if (!isMatch) {
    throw new Error("Wrong password");
  }

  // If authentication is successful, a JWT token is generated.
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  // Removes the password field from the user object before returning.
  const { password: userPassword, ...rest } = user._doc;

  return { user: rest, token };
};

/**
 * Registers a new user.
 *
 * @param {string} username - User's username.
 * @param {string} email - User's email.
 * @param {string} password - User's password.
 * @returns {Promise<Object>} The newly created user object.
 */
export const registerAuthService = async (username, email, password) => {
  // Creates a new user with the provided username, email, and password.
  const user = await User.create({ username, email, password });
  return user;
};
