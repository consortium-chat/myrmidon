import "std/dotenv/load.ts";
import { assert } from "std/testing/asserts.ts";

function require(name: string): string {
  const variable = Deno.env.get(name);
  assert(variable, `${variable} is not set`);
  return variable;
}

/** Discord API token */
export const token = require("DISCORD_TOKEN");

/** Discord guild ID */
export const guildId = require("GUILD_ID");

/** Archive channel category */
export const archiveCategory = require("ARCHIVE_CATEGORY");

/** Friday webhook URL */
export const fridayWebhook = require("FRIDAY_WEBHOOK");
