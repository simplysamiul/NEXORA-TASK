const express = require("express");
const router = express.Router();
const { getAllProducts, addProduct, getSingleProduct, updateSingleProduct, deleteSingleProduct, placeOrder } = require("../controllers/productController");

// Routes

// get all product
router.get("/products", getAllProducts);

// get specific products by product id 
router.get("/products/:id", getSingleProduct)

// update specific product by product Id
router.patch("/products/:id", updateSingleProduct)

// Add product to the databse
router.post("/products", addProduct);

// add place order info
router.post("/cart", placeOrder)

// Delete specific products by product Id
router.delete("/products/:id", deleteSingleProduct);



module.exports = router;
