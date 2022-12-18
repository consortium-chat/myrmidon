import "std/dotenv/load.ts";
import { assert } from "std/testing/asserts.ts";
import { createBot, Intents, startBot } from "discordeno";

import { fridayPostCheck } from "./friday.ts";

/** Discord API token */
const token = Deno.env.get("DISCORD_TOKEN");
assert(token, "DISCORD_TOKEN is not set");

/** Myrmidon Discord bot */
const bot = createBot({
  token,
  intents: Intents.Guilds | Intents.GuildMessages,
});

// Login event handler
bot.events.ready = (_bot, { user }) => {
  console.log(`Logged in as ${user.username}#${user.discriminator}`);
  setInterval(fridayPostCheck, 1000);
};

await startBot(bot);
