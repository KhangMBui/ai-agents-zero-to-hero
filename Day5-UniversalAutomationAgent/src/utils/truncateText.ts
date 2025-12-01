export function truncate(text: string, max = 300) {
  return text.length > max ? text.slice(0, max) + "..." : text;
}
