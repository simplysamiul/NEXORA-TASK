const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connectDB } = require("./config/db");
const productRoutes = require("./routes/productRoutes");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", productRoutes);

// Root route
app.get("/", (req, res) => {
    res.send("Server running successfully!");
});

// Start server and connect to DB
app.listen(port, async () => {
    await connectDB();
    console.log(`Example app listening on port ${port}`)
});

connectDB();

module.exports = app;