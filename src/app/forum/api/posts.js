import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI; // MongoDB connection string
let client;

export async function GET() {
  console.log("Fetching posts...");
  try {
    console.log("Connecting to MongoDB...");
    client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("forum"); // Use the correct database name
    console.log("Fetching posts...");
    const posts = await db.collection("posts").find().toArray();
    console.log("Posts fetched:", posts);

    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to fetch posts",
        details: error.message,
      }),
      { status: 500 }
    );
  } finally {
    if (client) {
      await client.close();
      console.log("MongoDB connection closed");
    }
  }
}

export async function POST(request) {
  console.log("Creating post...");
  try {
    console.log("Connecting to MongoDB...");
    client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("forum");
    const body = await request.json();
    console.log("Creating post with data:", body);
    const result = await db.collection("posts").insertOne(body);
    console.log("Post created:", result.ops[0]);

    return new Response(JSON.stringify(result.ops[0]), { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to create post",
        details: error.message,
      }),
      { status: 500 }
    );
  } finally {
    if (client) {
      await client.close();
      console.log("MongoDB connection closed");
    }
  }
}
