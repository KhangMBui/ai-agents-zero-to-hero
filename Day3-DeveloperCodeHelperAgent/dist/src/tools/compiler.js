"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileTypeScript = void 0;
const typescript_1 = __importDefault(require("typescript"));
const agents_1 = require("@openai/agents");
const zod_1 = __importDefault(require("zod"));
exports.compileTypeScript = (0, agents_1.tool)({
    name: "compile_ts",
    description: "Compile TypeScript code to JavaScript before execution.",
    parameters: zod_1.default.object({
        code: zod_1.default.string(),
    }),
    async execute({ code }) {
        const output = typescript_1.default.transpileModule(code, {
            compilerOptions: {
                module: typescript_1.default.ModuleKind.CommonJS,
            },
        });
        return output.outputText;
    },
});
