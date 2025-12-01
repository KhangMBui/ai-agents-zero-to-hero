"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.truncate = truncate;
function truncate(text, max = 300) {
    return text.length > max ? text.slice(0, max) + "..." : text;
}
