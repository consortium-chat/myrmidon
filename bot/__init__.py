import logging
import os

import discord

logger = logging.getLogger("myrmidon")

intents = discord.Intents.default()
client = discord.Client(intents=intents)


@client.event
async def on_ready():
    logger.info(f"Logged in as {client.user}")
