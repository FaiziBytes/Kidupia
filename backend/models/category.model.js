import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
    },
    description: {
      type: String,
      default: "",
    },
    image: {
      url: String,
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);
export default Category;
