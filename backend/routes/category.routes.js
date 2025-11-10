import express from "express";
import {
  createCategory,
  getCategories,
  deleteCategory,
} from "../controllers/category.controller.js";
import { isAuthenticated,AuthorizeRole } from "../middlewares/isAuthenticated.js";
const router = express.Router();

// Anyone can get categories
router.get("/", getCategories);
router.post("/create", createCategory);

// Only admin can create or delete categories
// router.post("/", AuthorizeUser, AuthorizeRole("admin"), createCategory);
router.delete("/:id", isAuthenticated, AuthorizeRole("admin"), deleteCategory);

export default router;
