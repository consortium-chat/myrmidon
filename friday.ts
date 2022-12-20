import { schedule } from "./schedule.ts";
import { Webhook } from "./webhook.ts";
import config from "./config.ts";

const webhook = new Webhook(config.fridayWebhook);
const avatarUrl = "https://i.ytimg.com/vi/kfVsfOSbJY0/maxresdefault.jpg";

function getVideo() {
  // 1-in-30 chance of posting the remix
  // Per https://mas.consortium.chat/motions/3505
  const postRemix = Math.random() < 1 / 30;

  return postRemix
    // Remix
    ? {
      url: "https://www.youtube.com/watch?v=iCFOcqsnc9Y",
      title:
        '"Friday (Remix)" by Rebecca Black, feat. Dorian Electra, Big Freedia & 3OH!3',
    }
    // Original
    : {
      url: "https://www.youtube.com/watch?v=kfVsfOSbJY0",
      title: '"Friday" by Rebecca Black',
    };
}

// Per https://mas.consortium.chat/motions/1658
schedule({
  description: 'Post "Friday" every Friday at 7AM Pacific Time',
  time: "Friday 07:00:00",
  async callback() {
    const video = getVideo();
    await webhook.post(
      video.url,
      video.title,
      avatarUrl,
    );
  },
});
