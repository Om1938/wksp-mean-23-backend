import User from "../models/user.js";
import jwt from "jsonwebtoken";

export const loginAuthService = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }
  const isMatch = password === user.password;
  if (!isMatch) {
    throw new Error("Wrong password");
  }

  // User is authenticated
  // Generate token\
  
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });



  return { user, token };
};
