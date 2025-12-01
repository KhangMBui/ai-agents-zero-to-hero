"use strict";
// import type { FunctionTool } from "@openai/agents";
// export function wrapTool<T extends FunctionTool<any, any, any>>(tool: T): T {
//   const original = tool.execute;
//   tool.execute = (async (args: any) => {
//     console.log(`\n🛠 TOOL CALL: ${tool.name}`);
//     console.log("Input:", JSON.stringify(args, null, 2));
//     const result = await original(args);
//     console.log(`🛠 TOOL RESULT (${name}):`, JSON.stringify(result, null, 2));
//     return result;
//   }) as any;
//   return tool;
// }
