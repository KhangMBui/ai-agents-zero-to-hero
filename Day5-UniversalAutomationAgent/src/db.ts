import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Check DB connection
pool
  .query("SELECT NOW()")
  .then((res) => console.log("🟢 DB Connected:", res.rows[0].now))
  .catch((err) => console.error("🔴 DB ERROR:", err));
