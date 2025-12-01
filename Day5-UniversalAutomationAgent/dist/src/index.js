"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const agents_1 = require("@openai/agents");
const agent_1 = require("./agent");
console.log("Starting Universal Automation Agent: ", new Date().toISOString());
if (!process.env.OPENAI_API_KEY) {
    console.error("Missing OPENAI_API_KEY");
    process.exit(1);
}
async function main() {
    const prompt = `
I am debugging a TypeScript error: "Cannot read properties of undefined".
What should I check?
  `;
    console.log("🧠 Agent starting...\n");
    const res = await (0, agents_1.run)(agent_1.MemoryAgent, prompt, {
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
