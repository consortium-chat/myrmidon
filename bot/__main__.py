import logging
import os

import discord
from dotenv import load_dotenv

load_dotenv()

token = os.environ["DISCORD_TOKEN"]

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("myrmidon")

intents = discord.Intents.default()
client = discord.Client(intents=intents)


@client.event
async def on_ready():
    logger.info(f"Logged in as {client.user}")


client.run(token)
