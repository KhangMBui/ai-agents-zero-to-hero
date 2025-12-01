import { tool } from "@openai/agents";
import { z } from "zod";
import fetch from "node-fetch";
import { safeError } from "../utils/safeError";
import { truncate } from "../utils/truncateText";

export const httpGet = tool({
  name: "http_get",
  description: "Perform an HTTP GET request and return raw text.",
  parameters: z.object({
    url: z.string().url(),
  }),
  async execute({ url }) {
    try {
      const response = await fetch(url);
      const text = await response.text();
      return truncate(text);
    } catch (err) {
      return safeError(err);
    }
  },
});
