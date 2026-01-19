/**
 * Tests for the dashboard command
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { dashboardCommand } from "./dashboard.js";

// Mock the dashboard server module
vi.mock("../../dashboard/server.js", () => ({
  startDashboard: vi.fn().mockResolvedValue(undefined),
}));

describe("dashboardCommand", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should start dashboard with default options", async () => {
    const { startDashboard } = await import("../../dashboard/server.js");

    // Don't actually start server - the mock will intercept
    await dashboardCommand({});

    expect(startDashboard).toHaveBeenCalledWith({
      port: 3456,
      openBrowser: true,
      verbose: false,
    });
  });

  it("should respect custom port option", async () => {
    const { startDashboard } = await import("../../dashboard/server.js");

    await dashboardCommand({ port: 8080 });

    expect(startDashboard).toHaveBeenCalledWith({
      port: 8080,
      openBrowser: true,
      verbose: false,
    });
  });

  it("should respect --no-open option", async () => {
    const { startDashboard } = await import("../../dashboard/server.js");

    await dashboardCommand({ noOpen: true });

    expect(startDashboard).toHaveBeenCalledWith({
      port: 3456,
      openBrowser: false,
      verbose: false,
    });
  });

  it("should respect verbose option", async () => {
    const { startDashboard } = await import("../../dashboard/server.js");

    await dashboardCommand({ verbose: true });

    expect(startDashboard).toHaveBeenCalledWith({
      port: 3456,
      openBrowser: true,
      verbose: true,
    });
  });

  it("should combine multiple options", async () => {
    const { startDashboard } = await import("../../dashboard/server.js");

    await dashboardCommand({ port: 9000, noOpen: true, verbose: true });

    expect(startDashboard).toHaveBeenCalledWith({
      port: 9000,
      openBrowser: false,
      verbose: true,
    });
  });
});
