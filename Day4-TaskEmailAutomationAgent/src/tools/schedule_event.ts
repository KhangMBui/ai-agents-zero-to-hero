import { tool } from "@openai/agents";
import { z } from "zod";
import { google } from "googleapis";
import * as fs from "fs";

export const scheduleEvent = tool({
  name: "schedule_event",
  description: "Create a real Google Calendar event",
  parameters: z.object({
    title: z.string(),
    // datetime: z
    //   .string()
    //   .describe("ISO 8601 datetime, e.g. 2025-11-20T09:00:00"),
    datetime: z.string(),
    durationMinutes: z.number(),
  }),
  async execute({ title, datetime, durationMinutes }) {
    // const path = `${process.cwd()}/calendar-log.json`;
    // let events: any[] = [];

    // if (fs.existsSync(path)) {
    //   events = JSON.parse(fs.readFileSync(path, "utf-8"));
    // }

    const auth = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    auth.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    });

    const calendar = google.calendar({ version: "v3", auth });

    const endTime = new Date(
      new Date(datetime).getTime() + durationMinutes * 60000
    ).toISOString();

    const event = {
      summary: title,
      start: { dateTime: datetime },
      end: { dateTime: endTime },
    };

    const res = await calendar.events.insert({
      calendarId: "primary",
      requestBody: event,
    });

    return `Calendar event created: ${res.data.htmlLink}`;

    // const event = {
    //   title,
    //   datetime,
    //   durationMinutes: durationMinutes ?? 30,
    //   createdAt: new Date().toISOString(),
    // };

    // events.push(event);
    // fs.writeFileSync(path, JSON.stringify(events, null, 2));

    // console.log("📅 (DEV) Event logged:", event);
    // return `Event scheduled (DEV): "${title}" at ${datetime}.`;
  },
});
