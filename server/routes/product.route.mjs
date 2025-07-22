import express from "express";
import {
  fetchAllProducts,
  fetchProduct,
  addProduct,
  updateProduct,
  deleteProduct
} from "../controllers/product.controller.mjs";
const router = express.Router();

router.get("/", fetchAllProducts);
router.get("/:id", fetchProduct);
router.post("/", addProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
