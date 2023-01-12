from dotenv import load_dotenv

load_dotenv()


from bot import bot
from events import events_stop, events_thread

events_thread.start()
bot.run()
events_stop.set()
