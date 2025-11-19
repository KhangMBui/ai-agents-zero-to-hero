"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveToMemory = exports.searchWeb = void 0;
const agents_1 = require("@openai/agents");
const tavily_1 = require("tavily");
const zod_1 = __importDefault(require("zod"));
const fs = __importStar(require("fs"));
const tavily = new tavily_1.TavilyClient({ apiKey: process.env.TAVILY_KEY });
exports.searchWeb = (0, agents_1.tool)({
    name: "search_web",
    description: "Search the web for a given topic.",
    parameters: zod_1.default.object({
        query: zod_1.default.string(),
    }),
    async execute({ query }) {
        // Use Tavily for web search
        const response = await tavily.search(query);
        console.log("\n=== Tavily's response ===");
        console.log(response);
        return response;
    },
});
// Long-term memory writer
exports.saveToMemory = (0, agents_1.tool)({
    name: "save_to_memory",
    description: "Store a summary into long-term memory (memory.json)",
    parameters: zod_1.default.object({
        topic: zod_1.default.string(),
        summary: zod_1.default.string(),
    }),
    async execute({ topic, summary }) {
        let memory = {};
        if (fs.existsSync("./memory.json")) {
            memory = JSON.parse(fs.readFileSync("./memory.json", "utf8"));
        }
        memory[topic] = summary;
        fs.writeFileSync("./memory.json", JSON.stringify(memory, null, 2));
        return `Saved summary for topic: '${topic}' into memory.json.`;
    },
});
