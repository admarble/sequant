import { describe, it, expect, vi, beforeEach } from "vitest";
import { execSync, spawnSync } from "child_process";

vi.mock("child_process", () => ({
  execSync: vi.fn(),
  spawnSync: vi.fn(),
}));

const mockExecSync = vi.mocked(execSync);
const mockSpawnSync = vi.mocked(spawnSync);

import { GitHubProvider } from "./github.js";

describe("GitHubProvider", () => {
  let provider: GitHubProvider;

  beforeEach(() => {
    vi.clearAllMocks();
    provider = new GitHubProvider();
  });

  it("has name 'github'", () => {
    expect(provider.name).toBe("github");
  });

  it("implements PlatformProvider interface", () => {
    expect(typeof provider.fetchIssue).toBe("function");
    expect(typeof provider.postComment).toBe("function");
    expect(typeof provider.addLabel).toBe("function");
    expect(typeof provider.removeLabel).toBe("function");
    expect(typeof provider.createPR).toBe("function");
    expect(typeof provider.getPRStatus).toBe("function");
    expect(typeof provider.postPRComment).toBe("function");
    expect(typeof provider.checkAuth).toBe("function");
    expect(typeof provider.getIssueComments).toBe("function");
  });

  describe("checkAuth", () => {
    it("returns true when gh auth status succeeds", async () => {
      mockExecSync.mockReturnValue("" as never);
      const result = await provider.checkAuth();
      expect(result).toBe(true);
      expect(mockExecSync).toHaveBeenCalledWith("gh auth status", {
        stdio: "ignore",
      });
    });

    it("returns false when gh auth status fails", async () => {
      mockExecSync.mockImplementation(() => {
        throw new Error("not authenticated");
      });
      const result = await provider.checkAuth();
      expect(result).toBe(false);
    });
  });

  describe("getIssueComments", () => {
    it("returns comments on success", async () => {
      const mockComments = [
        { body: "comment 1", createdAt: "2026-01-01T00:00:00Z" },
        { body: "comment 2", createdAt: "2026-01-02T00:00:00Z" },
      ];
      mockSpawnSync.mockReturnValue({
        status: 0,
        stdout: JSON.stringify(mockComments),
        stderr: "",
        pid: 0,
        output: [],
        signal: null,
      } as never);
      const result = await provider.getIssueComments("123");
      expect(result).toEqual(mockComments);
    });

    it("returns empty array on failure", async () => {
      mockSpawnSync.mockReturnValue({
        status: 1,
        stdout: "",
        stderr: "error",
        pid: 0,
        output: [],
        signal: null,
      } as never);
      const result = await provider.getIssueComments("123");
      expect(result).toEqual([]);
    });
  });
});
