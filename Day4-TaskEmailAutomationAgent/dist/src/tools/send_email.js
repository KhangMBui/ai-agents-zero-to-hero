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
exports.sendEmail = void 0;
const agents_1 = require("@openai/agents");
const zod_1 = require("zod");
const fs = __importStar(require("fs"));
exports.sendEmail = (0, agents_1.tool)({
    name: "send_email",
    description: "Draft and send an email to recipient.",
    parameters: zod_1.z.object({
        to: zod_1.z.string().email(),
        subject: zod_1.z.string(),
        body: zod_1.z.string(),
    }),
    async execute({ to, subject, body }) {
        // Dev-mode: just log a file instead of actually sending
        const logEntry = {
            to,
            subject,
            body,
            sentAt: new Date().toISOString(),
        };
        const path = `${process.cwd()}/email-log.json`;
        let log = [];
        if (fs.existsSync(path)) {
            log = JSON.parse(fs.readFileSync(path, "utf8"));
        }
        log.push(logEntry);
        fs.writeFileSync(path, JSON.stringify(log, null, 2));
        console.log("📧 (DEV) Email logged:", logEntry);
        return `Email (DEV) logged for ${to} with subject "${subject}".`;
    },
});
