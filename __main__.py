import os

from dotenv import load_dotenv

load_dotenv()


from bot import client
from events import events_stop, events_thread

events_thread.start()
client.run(os.environ["DISCORD_TOKEN"])
events_stop.set()
