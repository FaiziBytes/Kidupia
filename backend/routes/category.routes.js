import express from "express";
import {
  createCategory,
  getCategories,
  deleteCategory,
} from "../controllers/category.controller.js";
import {
  AuthorizeUser,
  AuthorizeRole,
} from "../middlewares/authorization.middleware.js";

const router = express.Router();

// Anyone can get categories
router.get("/", getCategories);
router.post("/", createCategory);

// Only admin can create or delete categories
// router.post("/", AuthorizeUser, AuthorizeRole("admin"), createCategory);
router.delete("/:id", AuthorizeUser, AuthorizeRole("admin"), deleteCategory);

export default router;
