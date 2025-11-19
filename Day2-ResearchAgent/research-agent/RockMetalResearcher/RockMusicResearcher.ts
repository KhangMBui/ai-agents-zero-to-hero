import "dotenv/config";
import { Agent, run } from "@openai/agents";
import { writeFile } from "fs/promises";

const metalMusicAgent = new Agent({
  name: "Metal Music Agent",
  instructions:
    "You provide assistance with metal music queries. Explain important events and context clearly.",
});

const rockMusicAgent = new Agent({
  name: "Rock Music Agent",
  instructions:
    "You provide assistance with rock music queries. Explain important events and context clearly.",
});

const triageAgent = new Agent({
  name: "Music Triage Agent",
  instructions:
    "Detect whether the user's question is about metal or rock and route to the appropriate specialist agent. Also, state clearly which agent you routed the question to. If unclear, ask a clarifying question.",
  handoffs: [metalMusicAgent, rockMusicAgent],
});

async function main() {
  if (!process.env.OPENAI_API_KEY) {
    console.error(
      "Missing OPENAI_API_KEY. Add it to .env or set the environment variable."
    );
    process.exit(1);
  }

  const prompt =
    "Tell me about the most dangerous band in the world (in rock music).";
  const result = await run(triageAgent, prompt);
  console.log(result.finalOutput);

  const output = {
    prompt,
    result: result.finalOutput,
    createdAt: new Date().toISOString(),
  };

  try {
    await writeFile(
      "./RockMetalResearcher/result.json",
      JSON.stringify(output, null, 2),
      "utf8"
    );
    console.log("Wrote ./result.json");
  } catch (err) {
    console.error("Failed to write JSON: ", err);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
