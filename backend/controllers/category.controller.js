import categoryModel from "../models/category.model.js";

// Create a new category
export const createCategory = async (req, res) => {
  try {
    const { name, slug, description, image } = req.body;

    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Category name is required" });
    }

    const formattedName = name.trim().toLowerCase();

    // Check if category already exists
    const alreadyExists = await categoryModel.findOne({ name: formattedName });
    if (alreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "Category already exists" });
    }

    // Create category
    const category = await categoryModel.create({
      name: formattedName,
      slug: slug
        ? slug.trim().toLowerCase()
        : formattedName.replace(/\s+/g, "-"),
      description: description || "",
      image: image || {},
    });

    res
      .status(201)
      .json({
        success: true,
        message: "Category created successfully",
        category,
      });
  } catch (error) {
    console.error("Error creating category:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
  }
};

// Get all categories
export const getCategories = async (req, res) => {
  try {
    const allCategories = await categoryModel.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, categories: allCategories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
  }
};

// Delete a category by ID
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await categoryModel.findById(id);
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    await categoryModel.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
  }
};
