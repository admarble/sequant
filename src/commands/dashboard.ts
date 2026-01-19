/**
 * Dashboard command - Visual workflow status in browser
 *
 * Starts a local web server with live-updating dashboard showing
 * all tracked issues and their workflow phase status.
 */

import chalk from "chalk";

export interface DashboardCommandOptions {
  /** Custom port (default: 3456) */
  port?: number;
  /** Skip browser auto-open (default: false) */
  noOpen?: boolean;
  /** Verbose output (default: false) */
  verbose?: boolean;
}

export async function dashboardCommand(
  options: DashboardCommandOptions,
): Promise<void> {
  const { startDashboard } = await import("../../dashboard/server.js");

  console.log(chalk.cyan("\n⚗️  Starting Sequant Dashboard...\n"));

  try {
    await startDashboard({
      port: options.port ?? 3456,
      openBrowser: !options.noOpen,
      verbose: options.verbose ?? false,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error(chalk.red(`Failed to start dashboard: ${error.message}`));
    } else {
      console.error(chalk.red("Failed to start dashboard"));
    }
    process.exit(1);
  }
}
