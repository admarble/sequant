# Session Context

## User Prompts

### Prompt 1

Project context (from AGENTS.md):

# AGENTS.md

## Project Overview

**sequant** is built with **Generic**.

## Development Commands

| Command | Purpose |
|---------|---------|
| `npm run build` | Build the project |
| `npm test` | Run tests |
| `npm run lint` | Lint the codebase |

## Code Conventions

- **testFilePattern**: *.test.ts
- **exportStyle**: named
- **asyncPattern**: async/await
- **typescriptStrict**: enabled
- **sourceStructure**: src/
- **packageManager**: npm
- **indentation**:...

### Prompt 2

# /loop — schedule a recurring prompt

Parse the input below into `[interval] <prompt…>` and schedule it with CronCreate.

## Parsing (in priority order)

1. **Leading token**: if the first whitespace-delimited token matches `^\d+[smhd]$` (e.g. `5m`, `2h`), that's the interval; the rest is the prompt.
2. **Trailing "every" clause**: otherwise, if the input ends with `every <N><unit>` or `every <N> <unit-word>` (e.g. `every 20m`, `every 5 minutes`, `every 2 hours`), extract that as the interv...

