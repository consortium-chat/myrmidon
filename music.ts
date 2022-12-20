import { schedule } from "./schedule.ts";
import { Webhook } from "./webhook.ts";
import config from "./config.ts";

const webhook = new Webhook(config.musicWebhook);
const listentothisEndpoint =
  "https://www.reddit.com/r/listentothis/top.json?t=week&limit=1";

Deno.permissions.request({
  name: "net",
  host: "www.reddit.com",
});

async function getMusic() {
  // Get the top song from r/listentothis
  const response = await fetch(listentothisEndpoint, {
    headers: {
      "User-Agent": "Discord Bot",
      Accept: "application/json",
    },
  });
  const data = await response.json();
  const { url } = data.data.children[0].data;
  return url;
}

schedule({
  description:
    "Post the weekly top r/listentothis song to Discord every Saturday at 8AM Pacific Time",
  time: "Saturday 08:00:00",
  async callback() {
    const url = await getMusic();
    webhook.post(url);
  },
});
