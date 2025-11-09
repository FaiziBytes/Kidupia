import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
} from "../controllers/product.controller.js";
import {
  isAuthenticated,
  AuthorizeRole
} from "../middlewares/isAuthenticated.js";

const router = express.Router();

// Public routes
router.get("/", getAllProducts);
router.get("/get/product/:Id", getProductById);
// router.post("/", createProduct);

// Admin-only routes
router.post("/create/product", isAuthenticated, AuthorizeRole("admin"), createProduct);

export default router;
