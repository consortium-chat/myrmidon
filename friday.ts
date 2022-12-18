import { assert } from "std/testing/asserts.ts";

/** Friday webhook URL */
const fridayWebhookURL = Deno.env.get("FRIDAY_WEBHOOK_URL");
assert(fridayWebhookURL, "FRIDAY_WEBHOOK_URL is not set");

interface Video {
  url: string;
  title: string;
}

const remix: Video = {
  url: "https://www.youtube.com/watch?v=iCFOcqsnc9Y",
  title:
    '"Friday (Remix)" by Rebecca Black, feat. Dorian Electra, Big Freedia & 3OH!3',
};

const original: Video = {
  url: "https://www.youtube.com/watch?v=kfVsfOSbJY0",
  title: '"Friday" by Rebecca Black',
};

async function fridayPost() {
  // 1-in-30 chance of posting the remix
  // Per https://mas.consortium.chat/motions/3505
  const postRemix = Math.random() < 1 / 30;
  const video = postRemix ? remix : original;

  // Make request to webhook
  const response = await fetch(fridayWebhookURL as string, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ content: video.url }),
  });

  // Error on non-2xx response status
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message);
  }

  console.log(`Posted ${video.title}`);
}

/**
 * Friday-post if the current time is within
 * a second of Friday, 7:00:00 AM, Pacific Time.
 *
 * Should be executed on a 1000-millisecond interval
 *
 * Per https://mas.consortium.chat/motions/1658
 */
export function fridayPostCheck() {
  // Get the current date-time in the Pacific Time
  const nowPT = new Date().toLocaleString("en-US", {
    timeZone: "US/Pacific",
    weekday: "long",
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  if (nowPT == "Friday 07:00:00") {
    return fridayPost().catch((error) =>
      console.error("Friday-post error:", error)
    );
  }
}
