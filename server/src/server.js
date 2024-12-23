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
  const { category, search = "", page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  if (!category) {
    return res.status(400).json({
      error: "Request param category is missing.",
      message: "You must specify a category to search for cards.",
    });
  }

  try {
    const result = await client.query(
      `
      SELECT 
        name AS title, 
        price, 
        image_url AS image 
      FROM cards 
      WHERE category ILIKE $1 AND name IS NOT null AND name ILIKE $2
      LIMIT $3 OFFSET $4
      `,
      [`%${category}%`, `%${search}%`, limit, offset]
    );

    const countResult = await client.query(
      `
      SELECT COUNT(*) AS total 
      FROM cards 
      WHERE category = $1 AND name IS NOT null AND name ILIKE $2
      `,
      [category, `%${search}%`]
    );

    const total = parseInt(countResult.rows[0].total, 10);
    const totalPages = Math.ceil(total / limit);

    res.json({
      search: search,
      data: result.rows,
      metadata: {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        totalPages,
        totalItems: total,
      },
    });
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

app.get("/api/analytics/table", async (req, res) => {
  try {
    const result = await client.query(
      "WITH RankedCards AS ( SELECT image_url AS image, name AS title, price, category AS name, ROW_NUMBER() OVER (PARTITION BY category ORDER BY price) AS row_num FROM cards ) SELECT image, title, price, name AS category FROM RankedCards WHERE row_num BETWEEN 3 AND 5 ORDER BY category, price"
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
