import express from "express";
import {
  addOrUpdateReview,
  getProductReviews,
  deleteReview,
} from "../controllers/review.controller.js";
import { AuthorizeRole, isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

// Anyone logged in can add or update a review
router.post("/", isAuthenticated, addOrUpdateReview);

// Public route to get reviews for a product
router.get("/product/:productId", getProductReviews);

// Admin or review owner can delete review
router.delete("/:reviewId", isAuthenticated, deleteReview);

export default router;
