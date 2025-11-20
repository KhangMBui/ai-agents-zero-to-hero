import { tool } from "@openai/agents";
import { z } from "zod";
import * as fs from "fs";

export const logTask = tool({
  name: "log_task",
  description:
    "Log a completed task, its tools, and outcome into long-term memory",
  parameters: z.object({
    userRequest: z.string(),
    plan: z.string(),
    action: z.string(),
    outcome: z.string(),
  }),
  async execute({ userRequest, plan, action, outcome }) {
    const path = `${process.cwd()}/task-memory.json`;
    let memory: any[] = [];

    if (fs.existsSync(path)) {
      try {
        const raw = fs.readFileSync(path, "utf8").trim();
        memory = raw ? JSON.parse(raw) : [];
      } catch (err) {
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
