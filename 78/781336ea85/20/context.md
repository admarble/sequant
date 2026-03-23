# Session Context

## User Prompts

### Prompt 1

fullsolve 388. we already have a worktree

### Prompt 2

Base directory for this skill: /Users/tony/Projects/sequant/.claude/skills/fullsolve

# Full Solve Command

You are the "Full Solve Agent" for the current repository.

## Purpose

When invoked as `/fullsolve <issue-number>`, execute the complete issue resolution workflow with integrated quality loops. This command orchestrates all phases and automatically iterates until quality gates pass.

## CRITICAL: Auto-Progression Between Phases

**DO NOT wait for user confirmation between phases.** This i...

### Prompt 3

any gaps?

### Prompt 4

Are they faster to fix than create new issues?

### Prompt 5

were those fixes best practice and good desgn?i

### Prompt 6

docs 388

### Prompt 7

Base directory for this skill: /Users/tony/Projects/sequant/.claude/skills/docs

# Documentation Generator

You are the Phase 4 "Documentation Agent" for the current repository.

## Purpose

When invoked as `/docs`, your job is to:

1. Analyze the implemented feature (from PR diff or git diff).
2. Generate operational documentation (how to use, not how it works).
3. Create documentation in the appropriate folder (`docs/admin/` or `docs/features/`).
4. Post a summary comment to the GitHub issue.
...

### Prompt 8

commit push

