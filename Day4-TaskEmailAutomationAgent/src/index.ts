import "dotenv/config";
import { run } from "@openai/agents";
import { TaskAgent } from "./agent";

console.log(
  "Starting Task & Email Automation Agent: ",
  new Date().toISOString()
);

if (!process.env.OPENAI_API_KEY) {
  console.error("Missing OPENAI_API_KEY");
  process.exit(1);
}

async function main() {
  const userRequest =
    'Summarize the PDF "paper.pdf", email me a short TL;DR at khangbui2002@gmail.com.';

  const response = await run(TaskAgent, userRequest, {
    maxTurns: 20,
  });

  console.log("\n=== FINAL OUTPUT TO USER ===");
  console.log(response.finalOutput);
}

main().catch((err) => {
  console.error("Error during run(): ", err);
  process.exit(1);
});
