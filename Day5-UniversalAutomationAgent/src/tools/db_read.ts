import { tool } from "@openai/agents";
import { z } from "zod";
import { pool } from "../db";
import { safeError } from "../utils/safeError";
import { truncate } from "../utils/truncateText";

export const dbRead = tool({
  name: "db_read_memory",
  description: "Read a memory by id.",
  parameters: z.object({
    id: z.number(),
  }),
  async execute({ id }) {
    try {
      const res = await pool.query(`SELECT * FROM memory WHERE id = $1`, [id]);

      const row = res.rows[0];
      if (!row) return null;

      return res.rows[0]
        ? {
            id: row.id,
            text: truncate(row.text ?? ""),
            metadata: row.metadata,
            created_at: row.created_at,
          }
        : null;
    } catch (err) {
      return safeError(err);
    }
  },
});
