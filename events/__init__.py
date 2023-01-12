import time

import schedule

from . import friday


def events_loop():
    while True:
        schedule.run_pending()
        time.sleep(1)
