"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbRead = void 0;
const agents_1 = require("@openai/agents");
const zod_1 = require("zod");
const db_1 = require("../db");
const safeError_1 = require("../utils/safeError");
const truncateText_1 = require("../utils/truncateText");
exports.dbRead = (0, agents_1.tool)({
    name: "db_read_memory",
    description: "Read a memory by id.",
    parameters: zod_1.z.object({
        id: zod_1.z.number(),
    }),
    async execute({ id }) {
        try {
            const res = await db_1.pool.query(`SELECT * FROM memory WHERE id = $1`, [id]);
            const row = res.rows[0];
            if (!row)
                return null;
            return res.rows[0]
                ? {
                    id: row.id,
                    text: (0, truncateText_1.truncate)(row.text ?? ""),
                    metadata: row.metadata,
                    created_at: row.created_at,
                }
                : null;
        }
        catch (err) {
            return (0, safeError_1.safeError)(err);
        }
    },
});
