"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeCode = void 0;
const agents_1 = require("@openai/agents");
const zod_1 = __importDefault(require("zod"));
const child_process_1 = require("child_process"); // a synchronous function used to execute shell commands.
exports.executeCode = (0, agents_1.tool)({
    name: "exec_code",
    description: "Execute the given snippet of code.",
    parameters: zod_1.default.object({
        code: zod_1.default.string(),
    }),
    async execute({ code }) {
        try {
            const result = (0, child_process_1.execSync)(`node -e "${code.replace(/"/g, '\\"')}"`, {
                encoding: "utf-8",
                shell: "powershell.exe",
            });
            return {
                success: true,
                output: result,
            };
        }
        catch (err) {
            return {
                success: false,
                error: err.message,
            };
        }
    },
});
