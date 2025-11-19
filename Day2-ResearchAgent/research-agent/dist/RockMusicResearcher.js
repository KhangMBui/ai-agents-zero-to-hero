"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const agents_1 = require("@openai/agents");
async function main() {
    if (!process.env.OPENAI_API_KEY) {
        console.error("Missing OPENAI_API_KEY. Add it to .env or set the environment variable.");
        process.exit(1);
    }
    const agent = new agents_1.Agent({
        name: "Metal Music Agent",
        instructions: "You provide assistance with metal music queries. Explain important events and context clearly.",
    });
    const result = await (0, agents_1.run)(agent, "Tell me about the Big Four of Thrash Metal.");
    console.log(result.finalOutput);
}
main().catch((err) => {
    console.error(err);
    process.exit(1);
});
