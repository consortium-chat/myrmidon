import logging
import threading
import time

import schedule

from .friday import post_friday
from .music import post_music

logger = logging.getLogger("schedule")
logger.setLevel(logging.INFO)

handler = logging.StreamHandler()
handler.setLevel(logging.INFO)

formatter = logging.Formatter(
    "%(asctime)s %(levelname)s %(name)s %(message)s", datefmt="%Y-%m-%d %H:%M:%S"
)
handler.setFormatter(formatter)

logger.addHandler(handler)
logger.info("Starting schedule")

schedule.every().friday.at("07:00").do(post_friday)
schedule.every().saturday.at("08:00").do(post_music)
schedule.every(5).seconds.do(post_friday)


class EventsThread(threading.Thread):
    @classmethod
    def run(cls):
        while not events_stop.is_set():
            schedule.run_pending()
            time.sleep(1)


events_stop = threading.Event()
events_thread = EventsThread()
