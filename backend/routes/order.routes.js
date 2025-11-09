import express from "express";
import {
  createOrder,
  getAllOrders,
  getUserOrders,
  updateOrderStatus,
  deleteOrder,
} from "../controllers/order.controller.js";
import {
  AuthorizeUser,
  AuthorizeRole,
} from "../middlewares/authorization.middleware.js";

const router = express.Router();

// Create a new order (user)
router.post("/", AuthorizeUser, AuthorizeRole("user", "admin"), createOrder);

// Get all orders (admin)
router.get("/", AuthorizeUser, AuthorizeRole("admin"), getAllOrders);

// Get orders for a specific user
router.get(
  "/user/:userId",
  AuthorizeUser,
  AuthorizeRole("user", "admin"),
  getUserOrders
);

// Update order status (admin)
router.put(
  "/:id/status",
  AuthorizeUser,
  AuthorizeRole("admin"),
  updateOrderStatus
);

// Delete an order (admin)
router.delete("/:id", AuthorizeUser, AuthorizeRole("admin"), deleteOrder);

export default router;
