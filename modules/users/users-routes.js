const { Router } = require("express");
const usersRoute = Router();

const createUserRules = require("../users/middlewares/create-users-rules");
const updateUserRules = require("../users/middlewares/update-users-rules");

const checkValidation = require("../../shared/middlewares/check-validation");

const UserModel = require("./users-model");

usersRoute.get("/", async (req, res, next) => {
  try {
    const users = await UserModel.getAllUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

usersRoute.get("/:id", async (req, res, next) => {
  try {
    const user = await UserModel.getUserById(req.params.id); 
    if (!user) {
      const e = new Error("User not found");
      e.status = 404;
      throw e;
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
});

usersRoute.post("/", createUserRules, checkValidation, async (req, res, next) => {
  try {
    const newUser = await UserModel.addNewUser(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});

usersRoute.put("/:id", updateUserRules, checkValidation, async (req, res, next) => {
  try {
    const updatedUser = await UserModel.updateExistingUser(req.params.id, req.body);
    if (!updatedUser) {
      const e = new Error("User not found");
      e.status = 404;
      throw e;
    }
    res.json(updatedUser);
  } catch (err) {
    next(err);
  }
});

usersRoute.delete("/:id", async (req, res, next) => {
  try {
    const deletedUser = await UserModel.deleteUser(req.params.id);
    if (!deletedUser) {
      const e = new Error("User not found");
      e.status = 404;
      throw e;
    }
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    next(err);
  }
});

module.exports = { usersRoute }; 

