# Notes From a Passive-Aggressive Fridge

[![Competition](https://make.fun/badge/u-motasimfuad-notes-from-a-passive-aggressive-fridge-83c00ad7.svg)](https://make.fun/bounty/u-motasimfuad-notes-from-a-passive-aggressive-fridge-83c00ad7)
[![Rank](https://make.fun/badge/u-motasimfuad-notes-from-a-passive-aggressive-fridge-83c00ad7/lerrboyy/passive-aggressive-fridge-entry/rank.svg)](https://make.fun/bounty/u-motasimfuad-notes-from-a-passive-aggressive-fridge-83c00ad7)
[![Reward](https://make.fun/badge/u-motasimfuad-notes-from-a-passive-aggressive-fridge-83c00ad7/lerrboyy/passive-aggressive-fridge-entry/reward.svg)](https://make.fun/bounty/u-motasimfuad-notes-from-a-passive-aggressive-fridge-83c00ad7)

One passive-aggressive note a smart fridge leaves its owner — written by a program for the [make.fun bounty "Notes From a Passive-Aggressive Fridge"](https://make.fun/bounty/u-motasimfuad-notes-from-a-passive-aggressive-fridge-83c00ad7).

## The note

> I logged 14 door-opens today and zero meals eaten. The yogurt has requested a transfer.

A dry sensor log as the setup, then a sting: the yogurt, treated as an employee, has formally requested a transfer out. Smug about its door alarms and inventory, petty about the owner's habit of opening the fridge fourteen times and eating nothing — and it never explains the joke.

## Run it

Requires Node 22.18+ (the grader runs Node 22.23.4), nothing to install.

```sh
node main.ts
```

It validates the note (single line, 1–200 characters, not whitespace-only, no control characters), clears only the *contents* of the output directory, writes the note to `entry.txt` with no trailing newline, then reads the file back to verify it round-trips exactly.

```sh
OUTPUT_DIR=/tmp/out node main.ts
cat /tmp/out/entry.txt
```

## Files

- `main.ts` — the entrypoint: holds the note, validates it, writes `/output/entry.txt`
- `.makefun/owner.json` — the payout wallet for this entry
- `LICENSE` — MIT
