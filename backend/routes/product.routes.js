import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
} from "../controllers/product.controller.js";
import {
  AuthorizeUser,
  AuthorizeRole,
} from "../middlewares/authorization.middleware.js";

const router = express.Router();

// Public routes
router.get("/", getAllProducts);
router.get("/category/:categoryId", getProductById);
router.post("/", createProduct);

// Admin-only routes
// router.post("/", AuthorizeUser, AuthorizeRole("admin"), createProduct);

export default router;
