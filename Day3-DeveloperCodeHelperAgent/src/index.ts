import "dotenv/config";
import { run } from "@openai/agents";
import { DevAgent } from "./agent";

console.log("Starting Developer Assistant:", new Date().toISOString());
// Quick env check
if (!process.env.OPENAI_API_KEY) {
  console.error(
    "Missing OPENAI_API_KEY. Add it to .env or set the environment variable."
  );
  process.exit(1);
}
console.log("OPENAI_API_KEY present:", !!process.env.OPENAI_API_KEY);

async function main() {
  let done = false;
  let iteration = 0;

  while (!done && iteration < 10) {
    iteration++;

    console.log(`\n=== ITERATION ${iteration} ===`);

    const response = await run(DevAgent, "Fix the file example.ts", {
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
