import { tool } from "@openai/agents";
import { TavilyClient } from "tavily";
import z from "zod";
import * as fs from "fs";

const tavily = new TavilyClient({ apiKey: process.env.TAVILY_KEY });
export const searchWeb = tool({
  name: "search_web",
  description: "Search the web for a given topic.",
  parameters: z.object({
    query: z.string(),
  }),
  async execute({ query }) {
    // Use Tavily for web search
    const response = await tavily.search(query);
    console.log("\n=== Tavily's response ===");
    console.log(response);
    return response;
  },
});

// Long-term memory writer
export const saveToMemory = tool({
  name: "save_to_memory",
  description: "Store a summary into long-term memory (memory.json)",
  parameters: z.object({
    topic: z.string(),
    summary: z.string(),
  }),
  async execute({ topic, summary }) {
    let memory: Record<string, string> = {};

    if (fs.existsSync("./memory.json")) {
      memory = JSON.parse(fs.readFileSync("./memory.json", "utf8"));
    }

    memory[topic] = summary;

    fs.writeFileSync("./memory.json", JSON.stringify(memory, null, 2));

    return `Saved summary for topic: '${topic}' into memory.json.`;
  },
});
