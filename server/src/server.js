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
  const { category, search = null, page = 1, limit = 12 } = req.query;
  const offset = (page - 1) * limit;

  if (!category) {
    return res.status(400).json({
      error: "Request param category is missing.",
      message: "You must specify a category to search for cards.",
    });
  }

  try {
    const searchCondition = search ? "AND name ILIKE $2" : "";
    const queryParams = search
      ? [`%${category}%`, `%${search}%`, limit, offset]
      : [`%${category}%`, limit, offset];

    const result = await client.query(
      `
      SELECT 
        name AS title, 
        price, 
        image_url AS image,
        website
      FROM cards 
      WHERE category ILIKE $1 AND name IS NOT null ${searchCondition}
      LIMIT $${search ? 3 : 2} OFFSET $${search ? 4 : 3}
      `,
      queryParams
    );

    const countQueryParams = search
      ? [`%${category}%`, `%${search}%`]
      : [`%${category}%`];
    const countResult = await client.query(
      `
      SELECT COUNT(*) AS total 
      FROM cards 
      WHERE category ILIKE $1 AND name IS NOT null ${searchCondition}
      `,
      countQueryParams
    );

    const total = parseInt(countResult.rows[0].total, 10);
    const totalPages = Math.ceil(total / limit);

    res.json({
      search: search,
      data: result.rows,
      metadata: {
        page: parseInt(page, 10),
        limit: parseInt(limit, 12),
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
      "SELECT website as name, COUNT(*) as value FROM cards GROUP BY website"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Database error");
  }
});

app.get("/api/analytics/cards/distributions", async (req, res) => {
  try {
    const result = await client.query(
      `SELECT 
        category,
        SUM(CASE WHEN website = 'Bleecker Trading' THEN 1 ELSE 0 END) AS "BT",
        SUM(CASE WHEN website = 'Gaints Sports Cards' THEN 1 ELSE 0 END) AS "GSC",
        SUM(CASE WHEN website = 'Game Stop' THEN 1 ELSE 0 END) AS "GS",
        SUM(CASE WHEN website = 'Da Card World' THEN 1 ELSE 0 END) AS "DCW"
      FROM cards
      GROUP BY category
      ORDER BY category`
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
      `
      WITH RankedCards AS (
        SELECT 
          name AS title, 
          price, 
          category AS name, 
          website,
          ROW_NUMBER() OVER (PARTITION BY category ORDER BY price) AS row_num,
          sys_created_date
        FROM cards
      )
      SELECT 
        title, 
        price, 
        name AS category, 
        website
      FROM RankedCards
      WHERE row_num BETWEEN 3 AND 5
      ORDER BY sys_created_date desc, price`
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
