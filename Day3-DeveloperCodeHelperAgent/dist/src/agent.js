"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevAgent = void 0;
const agents_1 = require("@openai/agents");
const exec_1 = require("./tools/exec");
const fs_tool_1 = require("./tools/fs-tool");
const memory_1 = require("./tools/memory");
const compiler_1 = require("./tools/compiler");
exports.DevAgent = new agents_1.Agent({
    name: "Developer Assistant",
    instructions: `
You are a software developer agent.

Your strict workflow:

1. ALWAYS start by calling read_file("example.ts").
2. Analyze the code and detect bugs, errors, or bad patterns.
3. If running code is needed, call execute_code.
4. If you decide to fix something, generate the full updated version of the file and call write_file with the updated content.
5. After applying a fix, ALWAYS call execute_code AGAIN to verify.
6. If verification fails, debug and repeat from step 2.
7. Repeat until the code executes without error and produces desired output.
TERMINATION CONDITION:
- When execute_code returns { success: true } with no errors,
  you MUST proceed to the finalization steps.

FINALIZATION STEPS (MANDATORY):
A. Create a JSON object:
  {
    "pattern": "<describe the fix or improvement you applied>"
  }

B. Call save_fix_pattern EXACTLY ONCE using the JSON object.

C. After the tool call, output the word: "DONE" as your final message.

If you do NOT call save_fix_pattern, the task is NOT complete.
If you do NOT output "DONE", the task is NOT complete.
Do NOT return the final output until after save_fix_pattern is called.

VERY IMPORTANT:
- This project uses TypeScript.
- You must PRESERVE TypeScript type annotations.
- Do NOT remove types or convert code to JavaScript.
- Before calling execute_code, you must compile the TypeScript to JavaScript
  using the compile_ts tool.
- execute_code MUST run the compiled JavaScript, not the original TypeScript.

Your goal: produce clean, correct code, iteratively and reliably.
  `,
    model: "gpt-4.1",
    tools: [
        exec_1.executeCode,
        fs_tool_1.readFileTool,
        fs_tool_1.writeFileTool,
        memory_1.saveFixPattern,
        compiler_1.compileTypeScript,
    ],
});
