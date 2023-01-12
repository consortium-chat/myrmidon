import logging
import os
import random

import requests
from schedule import every, repeat

webhook_url = os.environ["FRIDAY_WEBHOOK"]
avatar_url = "https://i.ytimg.com/vi/kfVsfOSbJY0/maxresdefault.jpg"


@repeat(every().friday.at("07:00"))
def post_friday():
    """Post 'Friday' by Rebecca Black to the the configured webhook. Sometimes post the
    official remix instead."""

    # 1-in-30 chance of posting the official remix
    video_url = (
        "https://www.youtube.com/watch?v=iCFOcqsnc9Y"
        if random.random() < 1 / 30
        else "https://www.youtube.com/watch?v=kfVsfOSbJY0"
    )

    response = requests.post(
        webhook_url,
        json={
            "content": video_url,
            "username": "Rebecca Black",
            "avatar_url": avatar_url,
        },
    )
    if response.ok:
        logging.info("Posted Friday")
    else:
        logging.error(f"Failed to post Friday: {response.text}")
