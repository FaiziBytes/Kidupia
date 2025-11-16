import express from "express";
import {
  addToCart,
  updateCartItem,
  removeCartItem,
  getUserCart,
  clearCart,
} from "../controllers/cart.controller.js";
import {
  isAuthenticated,
  AuthorizeRole
} from "../middlewares/isAuthenticated.js";


const router = express.Router();

// All routes require authentication
router.use(isAuthenticated);
router.get("/:userId", getUserCart);
router.post("/add", addToCart);
router.put("/update", updateCartItem);
router.delete("/remove", removeCartItem);
router.delete("/clear/:userId", clearCart);

export default router;