import express from "express";
import {
  createCategory,
  getCategories,
  deleteCategory,
} from "../controllers/category.controller.js";
import { isAuthenticated,AuthorizeRole } from "../middlewares/isAuthenticated.js";
const router = express.Router();

// Anyone can get categories
router.get("/get", getCategories);
// router.post("/create", createCategory);

// Only admin can create or delete categories
router.post("/create", isAuthenticated, AuthorizeRole("admin"), createCategory);
router.delete("/delete/:id", isAuthenticated, AuthorizeRole("admin"), deleteCategory);

export default router;
