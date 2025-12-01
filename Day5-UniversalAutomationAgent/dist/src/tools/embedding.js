"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.embedText = void 0;
const agents_1 = require("@openai/agents");
const zod_1 = require("zod");
const openai_1 = __importDefault(require("openai"));
const safeError_1 = require("../utils/safeError");
const client = new openai_1.default({
    apiKey: process.env.OPENAI_API_KEY,
});
exports.embedText = (0, agents_1.tool)({
    name: "embed_text",
    description: "Convert text into an embedding vector.",
    parameters: zod_1.z.object({
        text: zod_1.z.string(),
    }),
    async execute({ text }) {
        try {
            const res = await client.embeddings.create({
                model: "text-embedding-3-small",
                input: text,
            });
            // DO NOT let the model print embeddings:
            // Return the raw array only to tools, never logs.
            const embedding = res.data[0].embedding;
            return {
                vector: embedding, // agent will forward this to db_search
                dim: embedding.length, // safe metadata
            };
        }
        catch (err) {
            return (0, safeError_1.safeError)(err);
        }
    },
});
