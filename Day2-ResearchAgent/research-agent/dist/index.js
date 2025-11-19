"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const agents_1 = require("@openai/agents");
const promises_1 = require("fs/promises");
const tools_1 = require("./tools");
const ResearchAgent = new agents_1.Agent({
    name: "Research Agent",
    instructions: `
    You are a research assistant agent.
    Your job:
    1. Search the topic using searchWeb.
    2. Analyze the results.
    3. Summarize them.
    4. AFTER summarizing, you MUST call the save_to_memory tool EXACTLY ONCE. Do not attempt to respond to the user without saving to memory first. If you do not call save_to_memory, the task is considered incomplete.
    5. You MUST ONLY base your summary on the content returned by search_web. Do NOT use prior knowledge or outside information. If a fact is not in the search tool output, do not include it.
  `,
    model: "gpt-4.1",
    tools: [tools_1.searchWeb, tools_1.saveToMemory],
});
console.log("Starting research agent:", new Date().toISOString());
// Quick env check
if (!process.env.OPENAI_API_KEY) {
    console.error("Missing OPENAI_API_KEY. Add it to .env or set the environment variable.");
    process.exit(1);
}
console.log("OPENAI_API_KEY present:", !!process.env.OPENAI_API_KEY);
async function main() {
    const prompt = "Research Agentic AI and summarize it.";
    const response = await (0, agents_1.run)(ResearchAgent, prompt);
    console.log("\n=== FINAL AGENT RESPONSE ===");
    console.log(response.finalOutput);
    const output = {
        prompt,
        result: response.finalOutput,
        createdAt: new Date().toISOString(),
    };
    // Optionally writes to a json file for tracking
    try {
        await (0, promises_1.writeFile)("./result.json", JSON.stringify(output, null, 2), "utf8");
        console.log("Wrote ./result.json");
    }
    catch (err) {
        console.error("Failed to write JSON: ", err);
    }
}
main().catch((err) => {
    console.error("Error during run():", err);
    console.error("If this is a network/API issue, check OPENAI_API_KEY, network, or rate limits.");
    process.exit(1);
});
