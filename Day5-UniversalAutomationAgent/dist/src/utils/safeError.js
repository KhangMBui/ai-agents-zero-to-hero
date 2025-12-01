"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeError = safeError;
function safeError(err) {
    return {
        error: String(err.message || err.toString() || "Unknown error"),
    };
}
