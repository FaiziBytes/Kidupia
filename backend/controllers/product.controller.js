import productModel from "../models/product.model.js";
import categoryModel from "../models/category.model.js";

// Create a new product
export const createProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      discountPrice,
      category, // category ID
      brand,
      tags,
      images, // array of image URLs
      attributes, // dynamic object
      variants, // array of { attributes, price, stock }
      isActive,
    } = req.body;

    // Validate required fields
    if (
      !title ||
      !description ||
      !price ||
      !category ||
      !images ||
      images.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Title, description, price, category, and at least one image are required",
      });
    }

    // Check if category exists
    const categoryExists = await categoryModel.findById(category);
    if (!categoryExists) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid category ID" });
    }

    // Create product
    const product = await productModel.create({
      title,
      description,
      price,
      discountPrice: discountPrice || null,
      category,
      brand: brand || "",
      tags: tags || [],
      images,
      attributes: attributes || {},
      variants: variants || [],
      isActive: isActive !== undefined ? isActive : true,
    });

    res
      .status(201)
      .json({
        success: true,
        message: "Product created successfully",
        product,
      });
  } catch (error) {
    console.error("Error creating product:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
  }
};

// Get all products (optional: filter by category, search, etc.)
export const getAllProducts = async (req, res) => {
  try {
    const { categoryId, search } = req.query;
    const filter = {};

    if (categoryId) filter.category = categoryId;
    if (search) filter.title = { $regex: search, $options: "i" };

    const products = await productModel
      .find(filter)
      .populate("category", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
  }
};

// Get single product by ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await productModel
      .findById(id)
      .populate("category", "name");
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error("Error fetching product:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
  }
};

// Update a product by ID
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // If updating category, check if it exists
    if (updates.category) {
      const categoryExists = await categoryModel.findById(updates.category);
      if (!categoryExists) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid category ID" });
      }
    }

    const product = await productModel.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Product updated", product });
  } catch (error) {
    console.error("Error updating product:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
  }
};

// Delete a product by ID
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await productModel.findByIdAndDelete(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
  }
};
