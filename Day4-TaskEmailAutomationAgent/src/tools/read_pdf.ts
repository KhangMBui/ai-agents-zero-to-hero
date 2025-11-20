import { tool } from "@openai/agents";
import { z } from "zod";
import * as fs from "fs";
import { PDFParse } from "pdf-parse";

export const readPdfSummary = tool({
  name: "read_pdf_summary",
  description: "Read and summarize a PDF file located in ./docs directory.",
  parameters: z.object({
    filename: z.string().describe("PDF file name in ./docs, e.g. paper.pdf"),
  }),
  async execute({ filename }) {
    const fullPath = `${process.cwd()}/docs/${filename}`;
    if (!fs.existsSync(fullPath)) {
      return `File not found: ${filename}`;
    }

    // const parser = new PDFParse({ url: fullPath });

    // For now, dev-mode: just return a placeholder
    // Later: use a read PDF parser + query
    const fakeSummary = `TL;DR for ${filename}: (placeholder summary).`;
    return fakeSummary;
  },
});
