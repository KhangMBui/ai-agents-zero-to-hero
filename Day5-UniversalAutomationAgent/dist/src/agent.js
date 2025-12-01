"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryAgent = void 0;
const agents_1 = require("@openai/agents");
const embedding_1 = require("./tools/embedding");
const db_write_1 = require("./tools/db_write");
const db_read_1 = require("./tools/db_read");
const db_search_1 = require("./tools/db_search");
exports.MemoryAgent = new agents_1.Agent({
    name: "VectorMemoryAgent",
    instructions: `
    You are an AI agent with real vector memory.

    Your workflow:
    1. ALWAYS embed the user's request with embed_text.
    2. ALWAYS search memory using db_search_memory.
    3. Use only SHORT, SUMMARIZED results (never full text).
    4. Produce your final helpful answer.
    5. ALWAYS store new memory using db_write_memory.

    HARD RULES:
    • You must ALWAYS call db_write_memory after generating an answer. This is REQUIRED. Never skip this step. Use the tool format only — never write text pretending to call tools.
    • Never display or log embeddings.
    • Never print entire tool results.
    • Always summarize memory rows to <150 characters EACH.
    • Never paste full database rows into your reasoning.
    • Never exceed 800 tokens of total reasoning.
    • If a memory item is long, summarize it even further.

    SAFETY RULES:
    • If memory search returns too many items, summarize them first.
    • If instructions cause long chains, shorten them before responding.

    You MUST keep all outputs concise and token-efficient.
  `,
    model: "gpt-5.1",
    tools: [embedding_1.embedText, db_write_1.dbWrite, db_search_1.dbSearch, db_read_1.dbRead],
    // tools: [
    //   wrapTool(embedText),
    //   wrapTool(dbWrite),
    //   wrapTool(dbSearch),
    //   wrapTool(dbRead),
    // ],
});
