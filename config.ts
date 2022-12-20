import "std/dotenv/load.ts";
import { assert } from "std/testing/asserts.ts";

function require(name: string): string {
  const variable = Deno.env.get(name);
  assert(variable, `${variable} is not set`);
  return variable;
}

export default {
  /** Discord API token */
  token: require("DISCORD_TOKEN"),

  /** Discord guild ID */
  guildId: require("GUILD_ID"),

  /** Archive channel category */
  archiveCategory: require("ARCHIVE_CATEGORY"),

  /** Friday webhook URL */
  fridayWebhook: require("FRIDAY_WEBHOOK"),

  /** Music webhook URL */
  musicWebhook: require("MUSIC_WEBHOOK"),
};
