import { tool } from "@openai/agents";
import { z } from "zod";
import * as fs from "fs";

export const saveFixPattern = tool({
  name: "save_fix_pattern",
  description: "Save a reusable fix pattern into long-term memory.",
  parameters: z.object({
    pattern: z.string(),
  }),
  async execute({ pattern }) {
    console.log("🛠 save_fix_pattern called with:", pattern);

    try {
      let memory: Record<string, string> = {};
      const path = `${process.cwd()}/memory.json`;

      if (fs.existsSync(path)) {
        try {
          const raw = fs.readFileSync(path, "utf8").trim();
          memory = raw ? JSON.parse(raw) : {};
        } catch (err) {
          console.error("⚠ memory.json was corrupted, resetting:", err);
          memory = {};
        }
      }

      const timestamp = new Date().toISOString();
      memory[timestamp] = pattern;

      fs.writeFileSync(path, JSON.stringify(memory, null, 2));
      console.log("✅ Write successful!");

      return "Fix pattern saved to LTM";
    } catch (err) {
      console.error("❌ Error in save_fix_pattern:", err);
      throw err;
    }
  },
});
