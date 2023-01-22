import logging
import os

import requests
from schedule import every, repeat

webhook_url = os.environ["MUSIC_WEBHOOK"]

logger = logging.getLogger("schedule.music")


@repeat(every().saturday.at("08:00"))
def post_music():
    """Post this week's top r/listentothis song to Discord."""

    logger.info("Posting top song")

    # Get the top song from r/listentothis
    try:
        response = requests.get(
            "https://www.reddit.com/r/listentothis/top.json?t=week&limit=1",
            headers={"User-Agent": "Discord Bot"},
        )
        response.raise_for_status()
        data = response.json()
    except requests.HTTPError as exc:
        logger.error(f"Failed to get top song: {exc}")
        return None
    except requests.JSONDecodeError as exc:
        logger.error(f"Failed to decode top song response: {exc}")
        return None

    music_url = data.get("data", {}).get("children", [{}])[0].get("data", {}).get("url")

    if music_url is None:
        logger.error("Failed to get top song")
        return

    try:
        response = requests.post(
            webhook_url,
            json={"content": music_url, "username": "Song-A-Week"},
        )
        response.raise_for_status()

    except requests.HTTPError as exc:
        logging.error(f"Failed to post top song: {exc}")


logger.info("Loaded Song-A-Week event")
