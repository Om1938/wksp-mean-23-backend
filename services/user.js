import User from "../models/user.js";

export const addUserService = async (user) => {
    const userModel = new User(user);
    return userModel.save();
}

export const getUsersService = async () => {
    return User.find({});
}

export const getUserByIdService = async (id) => {
    return User.findById(id);
}

