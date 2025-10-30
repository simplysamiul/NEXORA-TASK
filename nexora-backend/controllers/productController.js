const { ObjectId } = require("mongodb");
const { getDB } = require("../config/db");


// get all produts
const getAllProducts = async (req, res) => {
  try {
    const db = getDB();
    const products = await db.collection("productList").find().toArray();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to load products" });
  }
};

// get specific product through to the productId
const getSingleProduct = async (req, res) => {
  try {
    const db = getDB();
    const productId = req.params.id;
    const query = { _id: new ObjectId(productId) };
    const product = await db.collection("productList").findOne(query);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to load product" });
  }
};


// Update a product through to the productId
const updateSingleProduct = async (req, res) => {
  try {
    const db = getDB();
    const updatedInfo = req.body.productInfo;
    const productId = req.params.id;
    const filter = { _id: new ObjectId(productId) };
    const options = { upsert: true };
    const result = await db.collection("productList").updateOne(filter, { $set: updatedInfo }, options);
    res.status(200).json({ success: true, message: "Product updated successfully", result });
  } catch (error) {
    res.status(500).json({ message: "Failed to update product" });
  }
}


// post a products
const addProduct = async (req, res) => {
  try {
    const db = getDB();
    const productInfo = req.body;
    const result = await db.collection("productList").insertOne(productInfo);
    res.status(201).json({
      success: true,
      message: "Product added successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// Place order
const placeOrder = async (req, res) => {
  try {
    const db = getDB();
    const orderInfo = req.body.order;
    const result = await db.collection("ordersList").insertOne(orderInfo);
    res.status(201).json({
      success: true,
      message: "Order Placed successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Order placed Faild." });
  }
}

// Delete product by product Id
const deleteSingleProduct = async (req, res) => {
  try {
    const db = getDB();
    const productId = req.params.id;
    const query = { _id: new ObjectId(productId) };
    const result = await db.collection("productList").deleteOne(query);
    res.status(200).json({ success: true, message: "Product deleted successfully", result });
  } catch (error) {
    res.status(500).json({ success: false, message: "Product deletation faild." });
  }
}





module.exports = { getAllProducts, addProduct, getSingleProduct, updateSingleProduct, deleteSingleProduct, placeOrder };
