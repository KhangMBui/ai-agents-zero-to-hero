import "dotenv/config";
import { run } from "@openai/agents";
import { MemoryAgent } from "./agent";

console.log("Starting Universal Automation Agent: ", new Date().toISOString());

if (!process.env.OPENAI_API_KEY) {
  console.error("Missing OPENAI_API_KEY");
  process.exit(1);
}

async function main() {
  const prompt = `
What things have I asked you before?
  `;

  console.log("🧠 Agent starting...\n");

  const res = await run(MemoryAgent, prompt, {
    maxTurns: 15,
  });

  console.log("\n=== FINAL AGENT OUTPUT ===");
  console.log(res.finalOutput);

  // console.log("\n=== TOOL CALL LOGS ===");
  // console.log(JSON.stringify(res, null, 2));
}

main().catch((err) => {
  console.error("Error during run(): ", err);
  process.exit(1);
});
