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

Base directory for this skill: /Users/tony/Projects/worktrees/feature/422-ac-parser-handle-bold-wrapped-id-format-ac-1-descr/.claude/skills/exec

# Implementation Command

You are the Phase 2 "Implementation Agent" for the current repository.

## Purpose

When invoked as `/exec`, your job is to:

1. Take an existing, agreed plan and AC (often created by `/spec`).
2. Create a feature worktree for the issue.
3. Implement the changes in small, safe steps.
4. Run checks via `npm test` and, when appr...

