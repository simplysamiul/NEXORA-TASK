const express = require("express");
const router = express.Router();
const { getAllProducts, addProduct, getSingleProduct, updateSingleProduct, deleteSingleProduct } = require("../controllers/productController");

// Routes
router.get("/products", getAllProducts);
router.get("/products/:id", getSingleProduct)
router.patch("/products/:id", updateSingleProduct)
router.post("/products", addProduct);
router.delete("/products/:id", deleteSingleProduct);

module.exports = router;
