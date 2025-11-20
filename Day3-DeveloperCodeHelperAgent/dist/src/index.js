"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const agents_1 = require("@openai/agents");
const agent_1 = require("./agent");
console.log("Starting Developer Assistant:", new Date().toISOString());
// Quick env check
if (!process.env.OPENAI_API_KEY) {
    console.error("Missing OPENAI_API_KEY. Add it to .env or set the environment variable.");
    process.exit(1);
}
console.log("OPENAI_API_KEY present:", !!process.env.OPENAI_API_KEY);
async function main() {
    let done = false;
    let iteration = 0;
    while (!done && iteration < 10) {
        iteration++;
        console.log(`\n=== ITERATION ${iteration} ===`);
        const response = await (0, agents_1.run)(agent_1.DevAgent, "Fix the file example.ts", {
            maxTurns: 30,
        });
        console.log(response.finalOutput);
        // Stop if the agent says it's done
        if (response.finalOutput?.toLowerCase().includes("done")) {
            done = true;
        }
        console.log("Final output with done: ", response.finalOutput);
    }
    console.log("\nAgent finished.");
}
main();
// main().catch((err) => {
//   console.error("Error during run(): ", err);
//   process.exit(1);
// });
