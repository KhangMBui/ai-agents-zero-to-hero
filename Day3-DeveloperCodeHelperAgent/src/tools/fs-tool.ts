import { tool } from "@openai/agents";
import { z } from "zod";
import * as fs from "fs";

export const readFileTool = tool({
  name: "read_file",
  description: "Read a file from the code/ directory",
  parameters: z.object({
    path: z.string(),
  }),
  async execute({ path }) {
    const fullPath = `./code/${path}`;
    if (!fs.existsSync(fullPath)) {
      return `File not found: ${path}`;
    }
    return fs.readFileSync(fullPath, "utf-8");
  },
});

export const writeFileTool = tool({
  name: "write_file",
  description: "Write code to a file in the code/ directory",
  parameters: z.object({
    path: z.string(),
    content: z.string(),
  }),
  async execute({ path, content }) {
    const fullPath = `./code/${path}`;
    if (!fs.existsSync(fullPath)) {
      return `File not found: ${path}`;
    }
    if (!content || content.length === 0) {
      return `No content received.`;
    }
    fs.writeFileSync(fullPath, content, "utf8");
    return `File ${path} updated successfully.`;
  },
});
