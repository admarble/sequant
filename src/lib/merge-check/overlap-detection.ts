/**
 * Cross-issue file overlap detection (AC-4)
 *
 * Compares git diff --name-only across all feature branches to detect
 * when multiple PRs modify the same files.
 */

import type {
  BranchInfo,
  CheckResult,
  BranchCheckResult,
  CheckFinding,
  FileOverlap,
} from "./types.js";

/**
 * Run overlap detection across all branches.
 *
 * Builds a map of file -> issues, then flags files with multiple modifiers.
 * All overlaps are classified as "additive" — true merge conflicts are
 * caught by the combined-branch-test check instead.
 */
export function runOverlapDetection(branches: BranchInfo[]): CheckResult {
  const startTime = Date.now();
  const branchResults: BranchCheckResult[] = [];
  const batchFindings: CheckFinding[] = [];

  // Build file -> issues map
  const fileToIssues = new Map<string, number[]>();
  for (const branch of branches) {
    for (const file of branch.filesModified) {
      const existing = fileToIssues.get(file) ?? [];
      existing.push(branch.issueNumber);
      fileToIssues.set(file, existing);
    }
  }

  // Find overlapping files (modified by 2+ issues)
  const overlaps: FileOverlap[] = [];
  for (const [file, issues] of fileToIssues) {
    if (issues.length >= 2) {
      overlaps.push({
        file,
        issues,
        type: "additive",
      });
    }
  }

  // Report overlaps as batch findings
  if (overlaps.length === 0) {
    batchFindings.push({
      check: "overlap-detection",
      severity: "info",
      message: "No file overlaps detected across branches",
    });
  } else {
    for (const overlap of overlaps) {
      batchFindings.push({
        check: "overlap-detection",
        severity: "warning",
        message: `${overlap.file} modified by issues ${overlap.issues.map((i) => `#${i}`).join(", ")} (${overlap.type})`,
        file: overlap.file,
      });
    }
  }

  // Per-branch: flag which branches participate in overlaps
  for (const branch of branches) {
    const branchOverlaps = overlaps.filter((o) =>
      o.issues.includes(branch.issueNumber),
    );
    const findings: CheckFinding[] = branchOverlaps.map((o) => ({
      check: "overlap-detection",
      severity: "warning" as const,
      message: `Overlaps with ${o.issues
        .filter((i) => i !== branch.issueNumber)
        .map((i) => `#${i}`)
        .join(", ")} on ${o.file}`,
      file: o.file,
      issueNumber: branch.issueNumber,
    }));

    branchResults.push({
      issueNumber: branch.issueNumber,
      verdict: branchOverlaps.length > 0 ? "WARN" : "PASS",
      findings,
    });
  }

  return {
    name: "overlap-detection",
    passed: overlaps.length === 0,
    branchResults,
    batchFindings,
    durationMs: Date.now() - startTime,
  };
}
