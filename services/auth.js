import User from "../models/user.js";
import jwt from "jsonwebtoken";

export const loginAuthService = async (email, password) => {
  // Find user by email
  const user = await User.findOne(
    { email },
    { password: 1, email: 1, username: 1 },
  );
  // Check if user exists
  if (!user) {
    throw new Error("User not found");
  }

  // Check if password is correct
  const isMatch = password === user.password;
  if (!isMatch) {
    throw new Error("Wrong password");
  }

  // User is authenticated
  // Generate token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  // Remove password from user object
  const { password: userPassword, ...rest } = user._doc;

  return { user: rest, token };
};

export const registerAuthService = async (username, email, password) => {
  const user = await User.create({ username, email, password });
  return user;
};
