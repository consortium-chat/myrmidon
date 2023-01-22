import logging
import time

import schedule
from dotenv import load_dotenv

load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("schedule")

logger.info("Loading events")

import friday
import music

while True:
    schedule.run_pending()
    time.sleep(1)
