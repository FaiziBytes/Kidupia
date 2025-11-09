import express from "express";
import {
  createOrder,
  getAllOrders,
  getUserOrders,
  updateOrderStatus,
  deleteOrder,
} from "../controllers/order.controller.js";
import { isAuthenticated,AuthorizeRole } from "../middlewares/isAuthenticated.js";

const router = express.Router();

// Create a new order (user)
router.post("/", isAuthenticated, AuthorizeRole("user", "admin"), createOrder);

// Get all orders (admin)
router.get("/", isAuthenticated, AuthorizeRole("admin"), getAllOrders);

// Get orders for a specific user
router.get(
  "/user/:userId",
  isAuthenticated,
  AuthorizeRole("user", "admin"),
  getUserOrders
);

// Update order status (admin)
router.put(
  "/:id/status",
  isAuthenticated,
  AuthorizeRole("admin"),
  updateOrderStatus
);

// Delete an order (admin)
router.delete("/:id", isAuthenticated, AuthorizeRole("admin"), deleteOrder);

export default router;
