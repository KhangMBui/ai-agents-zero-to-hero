import { tool } from "@openai/agents";
import { z } from "zod";
import * as fs from "fs";

export const scheduleEvent = tool({
  name: "schedule_event",
  description: " Schedule a calendar event or reminder.",
  parameters: z.object({
    title: z.string(),
    datetime: z
      .string()
      .describe("ISO 8601 datetime, e.g. 2025-11-20T09:00:00"),
    durationMinutes: z.number(),
  }),
  async execute({ title, datetime, durationMinutes }) {
    const path = `${process.cwd()}/calendar-log.json`;
    let events: any[] = [];

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
