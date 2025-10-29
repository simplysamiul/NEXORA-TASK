const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@nexora-task.phyd4pq.mongodb.net/?appName=nexora-task`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;

async function connectDB() {
  try {
    await client.connect();
    db = client.db("nexoraDB");
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
}

function getDB() {
  if (!db) throw new Error("Database not connected yet!");
  return db;
}

module.exports = { connectDB, getDB };
