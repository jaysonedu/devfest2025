import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI; // MongoDB connection string
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default async function handler(req, res) {
  if (req.method === "GET") {
    // Fetch all posts
    try {
      await client.connect();
      const db = client.db("forum"); // Replace with your database name
      const posts = await db.collection("posts").find().toArray();
      res.status(200).json(posts);
    } catch (error) {
      console.error("Error fetching posts:", error); // Log the error
      res
        .status(500)
        .json({ error: "Failed to fetch posts", details: error.message });
    } finally {
      await client.close();
    }
  } else if (req.method === "POST") {
    // Create a new post
    try {
      await client.connect();
      const db = client.db("forum");
      const result = await db.collection("posts").insertOne(req.body);
      res.status(201).json(result.ops[0]);
    } catch (error) {
      console.error("Error creating post:", error); // Log the error
      res
        .status(500)
        .json({ error: "Failed to create post", details: error.message });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
