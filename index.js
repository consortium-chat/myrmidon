import "dotenv/config";
import { Client, Intents } from "discord.js";
import { manageDaysOfTheWeek } from "./dotw.js";
import { postFriday } from "./friday.js";

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const entrypoint = process.argv[2];

if (!entrypoint) {
  console.log("Must pass an entrypoint argument.");
  process.exit(1);
}

if (!process.env.DISCORD_TOKEN) {
  console.log("DISCORD_TOKEN environment variable is not set.");
  process.exit(1);
}

// Login hook
client.once("ready", async () => {
  console.log(`Logged in as ${client.user.tag}.`);
});

switch (entrypoint) {
  case "dotw": // Manage Days-of-the-week channels
    client.login(process.env.DISCORD_TOKEN);
    client.once(
      "ready",
      async () => {
        await manageDaysOfTheWeek(client);
        client.destroy();
      },
    );
    break;

  case "friday": // Post "Friday" by Rebecca Black
    await postFriday();
    break;

  default: // Unknown entrypoint
    console.log(`Unknown entrypoint "${entrypoint}"`);
}
