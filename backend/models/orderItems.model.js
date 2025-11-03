import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  order_id: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  variant_id: { type: mongoose.Schema.Types.ObjectId, ref: "ProductVariant" },
  quantity: { type: Number, required: true },
  price: Number,
  subtotal: Number,
});

export const OrderItem = mongoose.model("OrderItem", orderItemSchema);