// Notes From a Passive-Aggressive Fridge
// Writes one passive-aggressive note from a smart fridge to its owner
// to <OUTPUT_DIR>/entry.txt (default /output).
// The note is authored in the design spec and typed here fresh.

import { mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry note: a dry sensor log as setup, then a sting the reader
// does not see coming — the yogurt, treated as an employee, has formally
// requested a transfer out.
const NOTE =
  "I logged 14 door-opens today and zero meals eaten. The yogurt has requested a transfer.";

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

function validate(note: string): void {
  if (note.length < 1 || note.length > 200) {
    fail(`note must be 1-200 characters, got ${note.length}`);
  }
  if (note.trim().length === 0) {
    fail("note must not be only whitespace");
  }
  if (note.includes("\n") || note.includes("\r")) {
    fail("note must be a single line");
  }
  // No control characters (other than none present) and no invisible
  // format characters that could confuse the gate scorer.
  for (const ch of note) {
    const code = ch.codePointAt(0) ?? 0;
    if (code < 0x20 || code === 0x7f || (code >= 0x200b && code <= 0x200f)) {
      fail(`note contains a disallowed character U+${code.toString(16)}`);
    }
  }
}

function clearOutputDirContents(dir: string): void {
  // Clear only the CONTENTS of the output directory. The directory
  // itself is the grader's mount point and must never be removed.
  mkdirSync(dir, { recursive: true });
  for (const entry of readdirSync(dir)) {
    rmSync(join(dir, entry), { recursive: true, force: true });
  }
}

function main(): void {
  validate(NOTE);
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  clearOutputDirContents(outDir);
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, NOTE, "utf8");
  // Read the file back and verify it round-trips exactly: same text,
  // no trailing newline added, still inside the 1-200 char gate.
  const written = readFileSync(outPath, "utf8");
  if (written !== NOTE) {
    fail("verification failed: entry.txt does not match the note exactly");
  }
  if (written.length < 1 || written.length > 200) {
    fail(`verification failed: entry.txt is ${written.length} characters`);
  }
  const bytes = Buffer.byteLength(NOTE, "utf8");
  console.log(`wrote ${outPath}`);
  console.log(`note: ${NOTE}`);
  console.log(`characters: ${NOTE.length}`);
  console.log(`bytes: ${bytes}`);
}

main();
