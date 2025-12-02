import fs from "node:fs";
import path from "node:path";

export function getLetters(): string[] {
  const lettersPath = path.join(process.cwd(), "public", "letters");
  const files = fs.readdirSync(lettersPath);
  return files.filter((f) => f.endsWith(".pdf")).map((f) => `/letters/${f}`);
}
