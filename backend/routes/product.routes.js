// routes/product.routes.js
import express from "express";
import upload from "../utlis/multer.js";
import { createProduct,getProductById, updateProduct, deleteProduct } from "../controllers/product.controller.js";

const router = express.Router();

router.get("/:id", getProductById);

router.post("/create/product", upload.array("images"), createProduct);
router.put("/update/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);

export default router; // must be default export
