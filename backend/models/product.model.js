// models/Product.js
import mongoose from "mongoose";

// Each variant has its own attributes, price, and stock
const variantSchema = new mongoose.Schema(
  {
    attributes: {
      type: Map, // dynamic key-value pairs like { Size: "M", Color: "Red" }
      of: String,
      required: true,
    },
    price: { type: Number, required: true },
    stock: { type: Number, required: true, default: 0 },
  },
  { _id: false } // no extra _id for each variant
);

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    brand: { type: String },
    tags: { type: [String], default: [] },
    images: { type: [String], required: true },
    discountPrice: { type: Number }, // added discount price
    attributes: [{ name: String, value: String }], // added attributes array
    variants: [variantSchema], // dynamic variants with stock
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
