import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  verification,
  forgotPassword,
  verifyOTP,
  changePassword
} from "../controllers/User.controller.js";

import { isAuthenticated,AuthorizeRole } from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/verify", verification);
router.post("/login", loginUser);
router.post("/logout", isAuthenticated, logoutUser);
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp/:email", verifyOTP);
router.post("/change-password/:email", changePassword);

// ✅ Accessible to both user & admin
router.get(
  "/dashboard",
  isAuthenticated,
  AuthorizeRole("user", "admin"),
  (req, res) => {
    res.json({
      message: `Welcome ${req.user.email}! You are a ${req.user.role}`,
    });
  }
);

// ✅ Admin-only route
router.get(
  "/admin-panel",
  isAuthenticated,
  AuthorizeRole("admin"),
  (req, res) => {
    res.json({ message: "Welcome Admin Panel!" });
  }
);

export default router;
