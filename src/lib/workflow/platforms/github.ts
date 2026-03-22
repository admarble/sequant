/**
 * GitHubProvider — PlatformProvider implementation wrapping the `gh` CLI.
 *
 * Owns all `gh` CLI calls for the orchestration layer. Skills continue
 * to call `gh` directly for v1 (see Non-Goals in #368).
 */

import { execSync } from "child_process";
import { spawnSync } from "child_process";
import type {
  PlatformProvider,
  Issue,
  CreatePROptions,
  PRInfo,
  PRStatus,
  Comment,
} from "./platform-provider.js";

export class GitHubProvider implements PlatformProvider {
  name = "github";

  async fetchIssue(id: string): Promise<Issue> {
    const output = execSync(
      `gh issue view ${id} --json number,title,body,labels,state`,
      { encoding: "utf-8", stdio: ["pipe", "pipe", "pipe"] },
    );
    const data = JSON.parse(output);
    return {
      id: String(data.number),
      number: data.number,
      title: data.title,
      body: data.body,
      labels: (data.labels ?? []).map((l: { name: string }) => l.name),
      state: data.state.toLowerCase() as "open" | "closed",
    };
  }

  async postComment(issueId: string, body: string): Promise<void> {
    spawnSync("gh", ["issue", "comment", issueId, "--body", body], {
      stdio: "pipe",
      timeout: 15000,
    });
  }

  async addLabel(issueId: string, label: string): Promise<void> {
    spawnSync("gh", ["issue", "edit", issueId, "--add-label", label], {
      stdio: "pipe",
      timeout: 15000,
    });
  }

  async removeLabel(issueId: string, label: string): Promise<void> {
    spawnSync("gh", ["issue", "edit", issueId, "--remove-label", label], {
      stdio: "pipe",
      timeout: 15000,
    });
  }

  async createPR(opts: CreatePROptions): Promise<PRInfo> {
    const result = spawnSync(
      "gh",
      [
        "pr",
        "create",
        "--title",
        opts.title,
        "--body",
        opts.body,
        "--head",
        opts.head,
        "--base",
        opts.base,
      ],
      { stdio: "pipe", timeout: 30000 },
    );

    if (result.status !== 0) {
      const error = result.stderr?.toString().trim() ?? "Unknown error";
      throw new Error(`gh pr create failed: ${error}`);
    }

    const output = result.stdout?.toString().trim() ?? "";
    const urlMatch = output.match(/https:\/\/github\.com\/[^\s]+\/pull\/(\d+)/);

    if (urlMatch) {
      return {
        number: parseInt(urlMatch[1], 10),
        url: urlMatch[0],
      };
    }

    throw new Error(
      `PR created but could not extract URL from output: ${output}`,
    );
  }

  async getPRStatus(prId: string): Promise<PRStatus> {
    const result = spawnSync(
      "gh",
      ["pr", "view", prId, "--json", "state", "-q", ".state"],
      { stdio: "pipe", timeout: 10000 },
    );

    if (result.status === 0 && result.stdout) {
      const state = result.stdout.toString().trim().toLowerCase();
      if (state === "merged" || state === "closed" || state === "open") {
        return { state: state as PRStatus["state"] };
      }
    }

    throw new Error(`Could not determine PR status for ${prId}`);
  }

  async postPRComment(prId: string, body: string): Promise<void> {
    spawnSync("gh", ["pr", "comment", prId, "--body", body], {
      stdio: "pipe",
      timeout: 15000,
    });
  }

  async checkAuth(): Promise<boolean> {
    try {
      execSync("gh auth status", { stdio: "ignore" });
      return true;
    } catch {
      return false;
    }
  }

  async getIssueComments(issueId: string): Promise<Comment[]> {
    try {
      const output = execSync(
        `gh issue view ${issueId} --json comments --jq '[.comments[] | {body: .body, createdAt: .createdAt}]'`,
        { encoding: "utf-8", stdio: ["pipe", "pipe", "pipe"] },
      );
      const data = JSON.parse(output) as Array<{
        body: string;
        createdAt: string;
      }>;
      return data;
    } catch {
      return [];
    }
  }
}
