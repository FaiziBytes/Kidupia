import express from "express";
import {
  addOrUpdateReview,
  getProductReviews,
  deleteReview,
} from "../controllers/review.controller.js";
import {
  AuthorizeUser,
  AuthorizeRole,
} from "../middlewares/authorization.middleware.js";

const router = express.Router();

// Anyone logged in can add or update a review
router.post("/", AuthorizeUser, addOrUpdateReview);

// Public route to get reviews for a product
router.get("/product/:productId", getProductReviews);

// Admin or review owner can delete review
router.delete("/:reviewId", AuthorizeUser, deleteReview);

export default router;
