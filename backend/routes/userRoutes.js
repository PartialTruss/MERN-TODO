import express from "express";
import User from "../models/userModel.js";

const router = express.Router();

// Get a user by username
router.get("/", async (req, res) => {
  try {
    const { username } = req.query; // Get username from the query string

    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }

    const user = await User.findOne({ username }, "username"); // Find user by username
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
