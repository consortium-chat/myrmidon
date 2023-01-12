import logging
import threading
import time

import schedule

from .friday import post_friday
from .music import post_music

schedule.every().friday.at("07:00").do(post_friday)
schedule.every().saturday.at("08:00").do(post_music)


class EventsThread(threading.Thread):
    @classmethod
    def run(cls):
        while not events_stop.is_set():
            schedule.run_pending()
            time.sleep(1)


events_stop = threading.Event()
events_thread = EventsThread()
