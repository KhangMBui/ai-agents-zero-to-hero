import { tool } from "@openai/agents";
import { z } from "zod";
import { pool } from "../db";
import { safeError } from "../utils/safeError";

export const dbWrite = tool({
  name: "db_write_memory",
  description: "Store a memory entry into PostgreSQL vector database.",
  parameters: z.object({
    text: z.string(),
    embedding: z.array(z.number()),
    // metadata: z.record(z.any()),
    // metadata: z.object({}),
    // metadata: z
    //   .object({
    //     source: z.string().optional(),
    //     tags: z.array(z.string()).optional(),
    //   })
    //   .optional(),
    metadata: z.object({
      source: z.string(),
      tags: z.array(z.string()),
    }),
  }),
  async execute({ text, embedding, metadata }) {
    console.log("\n🔥 db_write_memory CALLED!");
    console.log("TEXT:", text.substring(0, 80));
    console.log("EMBED LENGTH:", embedding.length);
    console.log("METADATA:", metadata);

    // Convert JS array → pgvector literal
    const pgVector = `[${embedding.join(",")}]`;

    try {
      const insert = await pool.query(
        `INSERT INTO memory (text, embedding, metadata)
         VALUES ($1, $2::vector, $3)
         RETURNING id`,
        [text, pgVector, metadata || {}]
      );
      console.log("🟢 DB WRITE SUCCESS - inserted ID:", insert.rows[0].id);
      return {
        status: "ok",
        id: insert.rows[0].id,
      };
    } catch (err) {
      console.error("❌ DB WRITE ERROR:", err);
      return safeError(err);
    }
  },
});
