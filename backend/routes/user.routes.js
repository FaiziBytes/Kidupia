// routes/user.routes.js
import express from "express";
import { registerUser } from "../controllers/RegisterUser.controller.js";
import { AuthenticateUser } from "../controllers/Auth.user.js";
import {
  AuthorizeUser,
  AuthorizeRole,
} from "../middlewares/authorization.middleware.js";

const router = express.Router();

// Public routes
router.post("/register", registerUser); // POST /api/users/register
router.post("/login", AuthenticateUser); // POST /api/users/login

// Protected routes
router.get(
  "/dashboard",
  AuthorizeUser,
  AuthorizeRole("user", "admin"), // Only logged-in users
  (req, res) => {
    res.json({
      message: `Welcome ${req.user.email}! You are a ${req.user.role}`,
    });
  }
);

router.get(
  "/admin-panel",
  AuthorizeUser,
  AuthorizeRole("admin"), // Only admins
  (req, res) => {
    res.json({ message: "Welcome Admin Panel!" });
  }
);

export default router;
