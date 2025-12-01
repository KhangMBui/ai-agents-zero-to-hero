"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbWrite = void 0;
const agents_1 = require("@openai/agents");
const zod_1 = require("zod");
const db_1 = require("../db");
const safeError_1 = require("../utils/safeError");
exports.dbWrite = (0, agents_1.tool)({
    name: "db_write_memory",
    description: "Store a memory entry into PostgreSQL vector database.",
    parameters: zod_1.z.object({
        text: zod_1.z.string(),
        embedding: zod_1.z.array(zod_1.z.number()),
        // metadata: z.record(z.any()),
        // metadata: z.object({}),
        // metadata: z
        //   .object({
        //     source: z.string().optional(),
        //     tags: z.array(z.string()).optional(),
        //   })
        //   .optional(),
        metadata: zod_1.z.object({
            source: zod_1.z.string(),
            tags: zod_1.z.array(zod_1.z.string()),
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
            const res = await db_1.pool.query(`INSERT INTO memory (text, embedding, metadata)
         VALUES ($1, $2::vector, $3)`, [text, pgVector, metadata || {}]);
            console.log("🔥 INSERT SUCCESS — new row id:", res.rows[0].id);
            return "Memory stored.";
        }
        catch (err) {
            console.error("❌ DB WRITE ERROR:", err);
            return (0, safeError_1.safeError)(err);
        }
    },
});
