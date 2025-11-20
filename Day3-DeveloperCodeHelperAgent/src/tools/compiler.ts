import ts from "typescript";
import { tool } from "@openai/agents";
import z from "zod";

export const compileTypeScript = tool({
  name: "compile_ts",
  description: "Compile TypeScript code to JavaScript before execution.",
  parameters: z.object({
    code: z.string(),
  }),
  async execute({ code }) {
    const output = ts.transpileModule(code, {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
      },
    });
    return output.outputText;
  },
});
