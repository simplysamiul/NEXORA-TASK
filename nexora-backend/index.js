// const express = require('express');
// const app = express();
// const port = 5000;
// const cors = require("cors");
// require('dotenv').config();
// const { MongoClient, ServerApiVersion } = require('mongodb');


// // use middleware
// app.use(cors());
// app.use(express.json());


// // database collection

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@nexora-task.phyd4pq.mongodb.net/?appName=nexora-task`;

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//     serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//     }
// });

// async function run() {
//     try {
//         // Connect the client to the server	(optional starting in v4.7)
//         await client.connect();

//         // databse collection
//         const database = client.db("nexoraDB");
//         const productsCollection = database.collection("productList")

//         // GET: get all products
//         app.get("/api/products", async (req, res) => {
//             try {
//                 const products = await productsCollection.find().toArray();
//                 res.status(200).json(products);
//             } catch (error) {
//                 console.error("Error fetching products:", error);
//                 res.status(500).json({ success: false, message: "Failed to load products" });
//             }
//         });



//         // POST: post product 
//         app.post("/api/cart", async (req, res) => {
//             try {
//                 const productInfo = req.body;

//                 // if product not found
//                 if (!productInfo) {
//                     return res.status(400).json({ message: "Invalid product Info" });
//                 }

//                 // Insert product to the databse
//                 const result = await productsCollection.insertOne(productInfo);
//                 console.log(productInfo)
//                 res.status(201).json({
//                     success: true,
//                     message: "Product added successfully",
//                     result
//                 });
//             } catch (error) {
//                 res.status(500).json({ success: false, message: "Server error" });
//             }
//         })



//         // Send a ping to confirm a successful connection
//         await client.db("admin").command({ ping: 1 });
//         console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     } finally {
//         // Ensures that the client will close when you finish/error
//         // await client.close();
//     }
// }
// run().catch(console.dir);




// // root route
// app.get('/', (req, res) => {
//     res.send('Server runnign successfully!')
// })

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
// })





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
