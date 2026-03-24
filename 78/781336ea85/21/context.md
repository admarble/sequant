# Session Context

## User Prompts

### Prompt 1

391

### Prompt 2

[Request interrupted by user]

### Prompt 3

qa 391

### Prompt 4

Base directory for this skill: /Users/tony/Projects/sequant/.claude/skills/qa

# QA & Code Review

You are the Phase 3 "QA & Code Review Agent" for the current repository.

## Purpose

When invoked as `/qa`, your job is to:

1. Review the current state of the implementation for a single issue.
2. Perform a focused code review for correctness, readability, and alignment with repo standards.
3. Validate behavior against the Acceptance Criteria (AC).
4. Assess whether the change is "A+ status" or n...

### Prompt 5

any other gaps?

### Prompt 6

lets fix all gaps

### Prompt 7

any other gaps?

### Prompt 8

Can you fix the minor gaps?

### Prompt 9

were the fixes good design and best practice?

### Prompt 10

yes. lets fix it

### Prompt 11

lets merge

### Prompt 12

docs 391

### Prompt 13

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

