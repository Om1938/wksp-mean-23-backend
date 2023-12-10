import User from "../models/user.js";

export const addUserService = async (user) => {
  const userModel = new User(user);
  return userModel.save();
};

export const getUsersService = async () => {
  return User.find({});
};

export const getUserByIdService = async (id) => {
  return User.findById(id);
};

export const updateUserByIdService = async (id, user) => {
  return User.findByIdAndUpdate(id, user, { new: false });
};

export const deleteUserByIdService = async (id) => {
  return User.findByIdAndDelete(id);
};
