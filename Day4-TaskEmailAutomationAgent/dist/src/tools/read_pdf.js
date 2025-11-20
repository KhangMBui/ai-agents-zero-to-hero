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
Object.defineProperty(exports, "__esModule", { value: true });
exports.readPdfSummary = void 0;
const agents_1 = require("@openai/agents");
const zod_1 = require("zod");
const fs = __importStar(require("fs"));
exports.readPdfSummary = (0, agents_1.tool)({
    name: "read_pdf_summary",
    description: "Read and summarize a PDF file located in ./docs directory.",
    parameters: zod_1.z.object({
        filename: zod_1.z.string().describe("PDF file name in ./docs, e.g. paper.pdf"),
    }),
    async execute({ filename }) {
        const fullPath = `${process.cwd()}/docs/${filename}`;
        if (!fs.existsSync(fullPath)) {
            return `File not found: ${filename}`;
        }
        // For now, dev-mode: just return a placeholder
        // Later: use a read PDF parser + query
        const fakeSummary = `TL;DR for ${filename}: (placeholder summary).`;
        return fakeSummary;
    },
});
