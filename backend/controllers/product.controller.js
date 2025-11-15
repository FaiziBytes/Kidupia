import productModel from "../models/product.model.js";
import categoryModel from "../models/category.model.js";

export const createProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      discountPrice,
      category,
      brand,
      tags,
      attributes,
      variants,
      isActive
    } = req.body;

    // ---------------------------
    // 1. VALIDATION
    // ---------------------------
    if (!title || !description || !price || !category) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }

    // Check category exists
    const categoryExists = await categoryModel.findById(category);
    if (!categoryExists) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID"
      });
    }

    // ---------------------------
    // 2. HANDLE IMAGE UPLOAD (multer)
    // ---------------------------
    const imageUrls = req.files?.map(file =>
      `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
    ) || [];

    // ---------------------------
    // 3. HANDLE VARIANTS SAFELY
    // ---------------------------
    let formattedVariants = [];

    try {
      if (!variants || variants.trim() === "") {
        formattedVariants = [];
      } else {
        const parsed = JSON.parse(variants);

        if (!Array.isArray(parsed)) {
          return res.status(400).json({
            success: false,
            message: "Variants must be an array"
          });
        }

        formattedVariants = parsed
          .filter(v => v.attributes && v.price && v.stock)
          .map(v => {
            const attributesObj = Object.fromEntries(
              v.attributes
                .split(",")
                .map(pair => pair.split(":").map(s => s.trim()))
            );

            return {
              attributes: attributesObj,
              price: Number(v.price),
              stock: Number(v.stock)
            };
          });
      }
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "Invalid variant format. Must be valid JSON."
      });
    }

 // ---------------------------
// 4. PARSE TAGS & ATTRIBUTES
// ---------------------------
let parsedAttributes = [];
let parsedTags = [];

// Parse Tags
try {
  if (!tags || tags === "" || tags === "undefined" || tags === "null") {
    parsedTags = [];
  } else if (typeof tags === 'string') {
    // Check if it looks like JSON
    const trimmed = tags.trim();
    if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
      // It's JSON array
      parsedTags = JSON.parse(tags);
    } else {
      // It's a comma-separated string
      parsedTags = tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag !== '');
    }
  } else if (Array.isArray(tags)) {
    // Already an array
    parsedTags = tags;
  } else {
    parsedTags = [];
  }
} catch (err) {
  console.error("Tags parsing error:", err);
  return res.status(400).json({
    success: false,
    message: "Invalid tags format"
  });
}

// Parse Attributes
try {
  if (!attributes || attributes === "" || attributes === "undefined" || attributes === "null") {
    parsedAttributes = [];
  } else if (typeof attributes === 'string') {
    const trimmed = attributes.trim();
    if (trimmed.startsWith('[') || trimmed.startsWith('{')) {
      parsedAttributes = JSON.parse(attributes);
    } else {
      parsedAttributes = [];
    }
  } else if (Array.isArray(attributes)) {
    parsedAttributes = attributes;
  } else {
    parsedAttributes = [];
  }
} catch (err) {
  console.error("Attributes parsing error:", err);
  return res.status(400).json({
    success: false,
    message: "Invalid attributes format (must be JSON)"
  });
}
    // ---------------------------
    // 5. CREATE PRODUCT
    // ---------------------------
    const product = await productModel.create({
      title,
      description,
      price,
      discountPrice: discountPrice || null,
      category,
      brand: brand || "",
      tags: parsedTags,
      images: imageUrls,
      attributes: parsedAttributes,
      variants: formattedVariants,
      isActive: isActive !== undefined ? isActive : true
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      product
    });

  } catch (error) {
    console.error("Create Product Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
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

export const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find();
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
}