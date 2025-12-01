"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_1 = __importDefault(require("pg"));
const { Pool } = pg_1.default;
exports.pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});
// Check DB connection
exports.pool
    .query("SELECT NOW()")
    .then((res) => console.log("🟢 DB Connected:", res.rows[0].now))
    .catch((err) => console.error("🔴 DB ERROR:", err));
