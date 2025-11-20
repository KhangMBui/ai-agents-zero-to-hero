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
exports.logTask = void 0;
const agents_1 = require("@openai/agents");
const zod_1 = require("zod");
const fs = __importStar(require("fs"));
exports.logTask = (0, agents_1.tool)({
    name: "log_task",
    description: "Log a completed task, its tools, and outcome into long-term memory",
    parameters: zod_1.z.object({
        userRequest: zod_1.z.string(),
        plan: zod_1.z.string(),
        action: zod_1.z.string(),
        outcome: zod_1.z.string(),
    }),
    async execute({ userRequest, plan, action, outcome }) {
        const path = `${process.cwd()}/task-memory.json`;
        let memory = [];
        if (fs.existsSync(path)) {
            try {
                const raw = fs.readFileSync(path, "utf8").trim();
                memory = raw ? JSON.parse(raw) : [];
            }
            catch (err) {
                console.error("⚠ task-memory.json corrupted, resetting:", err);
                memory = [];
            }
        }
        const entry = {
            userRequest,
            plan,
            action,
            outcome,
            createdAt: new Date().toISOString(),
        };
        memory.push(entry);
        fs.writeFileSync(path, JSON.stringify(memory, null, 2));
        console.log("🧠 Task logged: ", entry);
        return "Task logged to long-term memory.";
    },
});
