const express = require("express");
const router = express.Router();
const { getAllProducts, addProduct } = require("../controllers/productController");

// Routes
router.get("/products", getAllProducts);
router.post("/cart", addProduct);

module.exports = router;
