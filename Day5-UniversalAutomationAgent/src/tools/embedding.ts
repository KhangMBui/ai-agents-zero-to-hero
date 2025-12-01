import { tool } from "@openai/agents";
import { z } from "zod";
import OpenAI from "openai";
import { safeError } from "../utils/safeError";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const embedText = tool({
  name: "embed_text",
  description: "Convert text into an embedding vector.",
  parameters: z.object({
    text: z.string(),
  }),
  async execute({ text }) {
    try {
      const res = await client.embeddings.create({
        model: "text-embedding-3-small",
        input: text,
      });

      // DO NOT let the model print embeddings:
      // Return the raw array only to tools, never logs.
      const embedding = res.data[0].embedding;

      return {
        vector: embedding, // agent will forward this to db_search
        dim: embedding.length, // safe metadata
      };
    } catch (err) {
      return safeError(err);
    }
  },
});
