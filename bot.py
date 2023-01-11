import os

import hikari
from dotenv import load_dotenv

load_dotenv()

bot = hikari.GatewayBot(
    token=os.environ["DISCORD_TOKEN"], intents=hikari.Intents.MESSAGE_CONTENT
)


@bot.listen()
async def shard_ready(event: hikari.ShardReadyEvent):
    print(f"Logged in as {event.my_user}")


bot.run()
