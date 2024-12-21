import express from "express";
import cors from "cors";
import pkg from "pg";

const { Client } = pkg;

const client = new Client({
  host: "localhost",
  user: "postgres",
  password: "postgres",
  database: "webscout",
  port: 5432,
});

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

client.connect();

app.get("/api/cards", async (req, res) => {
  const { category } = req.query;
  try {
    const result = await client.query(
      "SELECT name as title, price, image_url as image FROM cards WHERE category = $1",
      [category]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Database error");
  }
});

app.get("/api/analytics/cards", async (req, res) => {
  try {
    const result = await client.query(
      "SELECT category as name, COUNT(*) as value FROM cards GROUP BY category"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Database error");
  }
});

app.get("/api/analytics/cards/prices", async (req, res) => {
  try {
    const result = await client.query(
      "SELECT category as name, MIN(price) as minprice, MAX(price) as maxprice FROM cards GROUP BY category"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Database error");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
