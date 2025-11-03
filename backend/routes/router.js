import express from "express";
import { registerUser } from "../controllers/RegisterUser.controller.js";
import { AuthenticateUser } from "../controllers/Auth.user.js";
import { AuthorizeUser,AuthorizeRole } from "../config/middlewares/authorization.middleware.js";
const Router = express.Router();
Router.post("/register/user",registerUser);
Router.post("/user/login",AuthenticateUser);

Router.get("/dashboard", AuthorizeUser, AuthorizeRole("user", "admin"), (req, res) => {
  res.json({ message: `Welcome ${req.user.email}! You are a ${req.user.role}` });
});

Router.get("/admin-panel", AuthorizeUser, AuthorizeRole("admin"), (req, res) => {
  res.json({ message: "Welcome Admin Panel!" });
});
export default Router;