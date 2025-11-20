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
exports.writeFileTool = exports.readFileTool = void 0;
const agents_1 = require("@openai/agents");
const zod_1 = require("zod");
const fs = __importStar(require("fs"));
exports.readFileTool = (0, agents_1.tool)({
    name: "read_file",
    description: "Read a file from the code/ directory",
    parameters: zod_1.z.object({
        path: zod_1.z.string(),
    }),
    async execute({ path }) {
        const fullPath = `./code/${path}`;
        if (!fs.existsSync(fullPath)) {
            return `File not found: ${path}`;
        }
        return fs.readFileSync(fullPath, "utf-8");
    },
});
exports.writeFileTool = (0, agents_1.tool)({
    name: "write_file",
    description: "Write code to a file in the code/ directory",
    parameters: zod_1.z.object({
        path: zod_1.z.string(),
        content: zod_1.z.string(),
    }),
    async execute({ path, content }) {
        const fullPath = `./code/${path}`;
        if (!fs.existsSync(fullPath)) {
            return `File not found: ${path}`;
        }
        if (!content || content.length === 0) {
            return `No content received.`;
        }
        fs.writeFileSync(fullPath, content, "utf8");
        return `File ${path} updated successfully.`;
    },
});
