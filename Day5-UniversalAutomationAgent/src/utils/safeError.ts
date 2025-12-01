export function safeError(err: any) {
  return {
    error: String(err.message || err.toString() || "Unknown error"),
  };
}
