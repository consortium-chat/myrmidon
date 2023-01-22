import logging
import os
import random

import requests

webhook_url = os.environ["FRIDAY_WEBHOOK"]
avatar_url = "https://i.ytimg.com/vi/kfVsfOSbJY0/maxresdefault.jpg"

logger = logging.getLogger("schedule.friday")


def post_friday():
    """Post 'Friday' by Rebecca Black to the the configured webhook. Sometimes post the
    official remix instead."""

    if random.random() < 1 / 30:
        video_url = "https://www.youtube.com/watch?v=iCFOcqsnc9Y"
        logger.info("Posting remix")
    else:
        video_url = "https://www.youtube.com/watch?v=kfVsfOSbJY0"
        logger.info("Posting original")

    try:
        response = requests.post(
            webhook_url,
            json={
                "content": video_url,
                "username": "Rebecca Black",
                "avatar_url": avatar_url,
            },
        )
        response.raise_for_status()

    except requests.HTTPError as exc:
        logging.error(f"Failed to post Friday: {exc}")
