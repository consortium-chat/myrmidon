import fetch from "node-fetch";
import { FRIDAY_WEBHOOK_ID, FRIDAY_WEBHOOK_TOKEN } from "./constants.js";

export async function postFriday() {
  const endpoint = new URL(
    `${FRIDAY_WEBHOOK_ID}/${FRIDAY_WEBHOOK_TOKEN}`,
    "https://discord.com/api/webhooks/",
  );
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      content: "https://www.youtube.com/watch?v=kfVsfOSbJY0",
    }),
  });
  if (!response.ok) {
    const data = await response.json();
    console.error("Post error:", data.message);
  }
}
