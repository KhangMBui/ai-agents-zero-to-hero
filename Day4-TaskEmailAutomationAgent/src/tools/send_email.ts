import { tool } from "@openai/agents";
import { z } from "zod";
import * as fs from "fs";

export const sendEmail = tool({
  name: "send_email",
  description: "Draft and send an email to recipient.",
  parameters: z.object({
    to: z.string().email(),
    subject: z.string(),
    body: z.string(),
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
    let log: any[] = [];

    if (fs.existsSync(path)) {
      log = JSON.parse(fs.readFileSync(path, "utf8"));
    }

    log.push(logEntry);
    fs.writeFileSync(path, JSON.stringify(log, null, 2));

    console.log("📧 (DEV) Email logged:", logEntry);
    return `Email (DEV) logged for ${to} with subject "${subject}".`;
  },
});
