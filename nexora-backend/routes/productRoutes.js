const express = require("express");
const router = express.Router();
const { getAllProducts, addProduct, getSingleProduct, updateSingleProduct } = require("../controllers/productController");

// Routes
router.get("/products", getAllProducts);
router.get("/products/:id", getSingleProduct)
router.patch("/cart/:id", updateSingleProduct)
router.post("/cart", addProduct);

module.exports = router;
