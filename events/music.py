import logging
import os

import requests

webhook_url = os.environ["MUSIC_WEBHOOK"]


def post_music():
    """Post this week's top r/listentothis song to Discord."""

    try:
        # Get the top song from r/listentothis
        response = requests.get(
            "https://www.reddit.com/r/listentothis/top.json?t=week&limit=1",
            headers={"User-Agent": "Discord Bot"},
        )
        response.raise_for_status()
        music_url = response.json()["data"]["children"][0]["data"]["url"]

        # Post the song to Discord
        response = requests.post(
            webhook_url,
            json={"content": music_url, "username": "Song-A-Week"},
        )
        response.raise_for_status()

        logging.info("Posted music")

    except Exception as exc:
        logging.error(f"Failed to post music: {exc}")
