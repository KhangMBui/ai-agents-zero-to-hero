"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpGet = void 0;
const agents_1 = require("@openai/agents");
const zod_1 = require("zod");
const node_fetch_1 = __importDefault(require("node-fetch"));
const safeError_1 = require("../utils/safeError");
const truncateText_1 = require("../utils/truncateText");
exports.httpGet = (0, agents_1.tool)({
    name: "http_get",
    description: "Perform an HTTP GET request and return raw text.",
    parameters: zod_1.z.object({
        url: zod_1.z.string().url(),
    }),
    async execute({ url }) {
        try {
            const response = await (0, node_fetch_1.default)(url);
            const text = await response.text();
            return (0, truncateText_1.truncate)(text);
        }
        catch (err) {
            return (0, safeError_1.safeError)(err);
        }
    },
});
