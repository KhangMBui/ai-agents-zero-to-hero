"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const agents_1 = require("@openai/agents");
const zod_1 = require("zod");
const nodemailer_1 = __importDefault(require("nodemailer"));
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
        // const logEntry = {
        //   to,
        //   subject,
        //   body,
        //   sentAt: new Date().toISOString(),
        // };
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            text: body,
        });
        console.log("📧 Email sent:", info.messageId);
        return `Email sent to ${to}`;
        // const path = `${process.cwd()}/email-log.json`;
        // let log: any[] = [];
        // if (fs.existsSync(path)) {
        //   log = JSON.parse(fs.readFileSync(path, "utf8"));
        // }
        // log.push(logEntry);
        // fs.writeFileSync(path, JSON.stringify(log, null, 2));
        // console.log("📧 (DEV) Email logged:", logEntry);
        // return `Email (DEV) logged for ${to} with subject "${subject}".`;
    },
});
