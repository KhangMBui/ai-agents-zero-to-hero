import { tool } from "@openai/agents";
import z from "zod";
import * as fs from "fs";
import { execSync } from "child_process"; // a synchronous function used to execute shell commands.

export const executeCode = tool({
  name: "exec_code",
  description: "Execute the given snippet of code.",
  parameters: z.object({
    code: z.string(),
  }),
  async execute({ code }) {
    try {
      const result = execSync(`node -e "${code.replace(/"/g, '\\"')}"`, {
        encoding: "utf-8",
        shell: "powershell.exe",
      });
      return {
        success: true,
        output: result,
      };
    } catch (err: any) {
      return {
        success: false,
        error: err.message,
      };
    }
  },
});
