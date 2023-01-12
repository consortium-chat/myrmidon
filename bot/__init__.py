import os

import hikari

token = os.environ["DISCORD_TOKEN"]
intents = hikari.Intents.ALL_UNPRIVILEGED | hikari.Intents.MESSAGE_CONTENT
bot = hikari.GatewayBot(token, intents=intents)


@bot.listen()
async def shard_ready(event: hikari.ShardReadyEvent):
    print(f"Logged in as {event.my_user}")
