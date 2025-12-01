"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbSearch = void 0;
const agents_1 = require("@openai/agents");
const zod_1 = require("zod");
const db_1 = require("../db");
const safeError_1 = require("../utils/safeError");
const truncateText_1 = require("../utils/truncateText");
exports.dbSearch = (0, agents_1.tool)({
    name: "db_search_memory",
    description: "Search for similar memories using vector similarity.",
    parameters: zod_1.z.object({
        embedding: zod_1.z.array(zod_1.z.number()),
        limit: zod_1.z.number().default(2),
    }),
    async execute({ embedding, limit }) {
        try {
            const q = await db_1.pool.query(`SELECT id, text, metadata, created_at
         FROM memory
         ORDER BY embedding <-> $1
         LIMIT $2`, [embedding, limit]);
            // SAFETY: never return full text or embedding
            const safeRows = q.rows.map((row) => ({
                id: row.id,
                text: (0, truncateText_1.truncate)(row.text ?? "", 200),
                metadata: row.metadata,
                created_at: row.created_at,
            }));
            return safeRows;
        }
        catch (err) {
            return (0, safeError_1.safeError)(err);
        }
    },
});
