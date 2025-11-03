import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  variant_id: { type: mongoose.Schema.Types.ObjectId, ref: "ProductVariant" },
  quantity: { type: Number, required: true },
});

const CartItem = mongoose.model("CartItem", cartItemSchema);
export default CartItem;