import { tool } from "@openai/agents";
import { z } from "zod";
import { pool } from "../db";
import { safeError } from "../utils/safeError";
import { truncate } from "../utils/truncateText";

export const dbSearch = tool({
  name: "db_search_memory",
  description: "Search for similar memories using vector similarity.",
  parameters: z.object({
    embedding: z.array(z.number()),
    limit: z.number().default(2),
  }),
  async execute({ embedding, limit }) {
    try {
      const q = await pool.query(
        `SELECT id, text, metadata, created_at
         FROM memory
         ORDER BY embedding <-> $1
         LIMIT $2`,
        [embedding, limit]
      );

      // SAFETY: never return full text or embedding
      const safeRows = q.rows.map((row) => ({
        id: row.id,
        text: truncate(row.text ?? "", 200),
        metadata: row.metadata,
        created_at: row.created_at,
      }));
      return safeRows;
    } catch (err) {
      return safeError(err);
    }
  },
});
