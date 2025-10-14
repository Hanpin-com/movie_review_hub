const { Router } = require("express");
const usersRoute = Router();

const createUserRules = require("./middlewares/create-users-rules");
const updateUserRules = require("./middlewares/update-users-rules");
const checkValidation = require("../../../shared/middlewares/check-validation");
const UserModel = require("./users-model");

// GET all users
usersRoute.get("/", async (req, res) => {
  try {
    const users = await UserModel.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users", error: err.message });
  }
});

// GET user by ID
usersRoute.get("/:id", async (req, res) => {
  try {
    const user = await UserModel.getUserByID(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user", error: err.message });
  }
});

// POST create new user
usersRoute.post("/", createUserRules, checkValidation, async (req, res) => {
  try {
    const newUser = await UserModel.addNewUser(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: "Error creating user", error: err.message });
  }
});

// PUT update user
usersRoute.put("/:id", updateUserRules, checkValidation, async (req, res) => {
  try {
    const updatedUser = await UserModel.updateExistingUser(req.params.id, req.body);
    if (!updatedUser) return res.status(404).json({ message: "User not found" });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Error updating user", error: err.message });
  }
});

// DELETE user
usersRoute.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await UserModel.deleteUser(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting user", error: err.message });
  }
});

module.exports = { usersRoute };
