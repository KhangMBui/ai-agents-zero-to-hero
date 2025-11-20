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
exports.scheduleEvent = void 0;
const agents_1 = require("@openai/agents");
const zod_1 = require("zod");
const fs = __importStar(require("fs"));
exports.scheduleEvent = (0, agents_1.tool)({
    name: "schedule_event",
    description: " Schedule a calendar event or reminder.",
    parameters: zod_1.z.object({
        title: zod_1.z.string(),
        datetime: zod_1.z
            .string()
            .describe("ISO 8601 datetime, e.g. 2025-11-20T09:00:00"),
        durationMinutes: zod_1.z.number(),
    }),
    async execute({ title, datetime, durationMinutes }) {
        const path = `${process.cwd()}/calendar-log.json`;
        let events = [];
        if (fs.existsSync(path)) {
            events = JSON.parse(fs.readFileSync(path, "utf-8"));
        }
        const event = {
            title,
            datetime,
            durationMinutes: durationMinutes ?? 30,
            createdAt: new Date().toISOString(),
        };
        events.push(event);
        fs.writeFileSync(path, JSON.stringify(events, null, 2));
        console.log("📅 (DEV) Event logged:", event);
        return `Event scheduled (DEV): "${title}" at ${datetime}.`;
    },
});
