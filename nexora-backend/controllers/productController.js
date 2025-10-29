const { getDB } = require("../config/db");


// get all produts
const getAllProducts = async (req, res) => {
  try {
    const db = getDB();
    const products = await db.collection("productList").find().toArray();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ success: false, message: "Failed to load products" });
  }
};


// post products
const addProduct = async (req, res) => {
  try {
    const db = getDB();
    const productInfo = req.body;

    if (!productInfo) {
      return res.status(400).json({ success: false, message: "Invalid product info" });
    }

    const result = await db.collection("productList").insertOne(productInfo);
    res.status(201).json({
      success: true,
      message: "Product added successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { getAllProducts, addProduct };
