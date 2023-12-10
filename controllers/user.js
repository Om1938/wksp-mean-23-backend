import {
  addUserService,
  getUsersService,
  getUserByIdService,
  deleteUserByIdService,
  updateUserByIdService,
} from "../services/user.js";

export const addUser = (req, res, next) => {
  const user = req.body;
  addUserService(user)
    .then((data) => {
      res.json(data);
    })
    .catch(next);
};

export const getAllUsers = (req, res, next) => {
  getUsersService()
    .then((data) => {
      res.json(data);
    })
    .catch(next);
};

export const getUserById = (req, res, next) => {
  const { id } = req.params;
  getUserByIdService(id)
    .then((data) => {
      res.json(data);
    })
    .catch(next);
};

export const updateUser = (req, res, next) => {
  const { id } = req.params;
  const user = req.body;

  updateUserByIdService(id, user)
    .then((data) => {
      res.json(data);
    })
    .catch(next);
};

export const deleteUser = (req, res, next) => {
  const { id } = req.params;
  deleteUserByIdService(id)
    .then((data) => {
      res.json(data);
    })
    .catch(next);
};
