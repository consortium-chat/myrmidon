import logging
import math
import os

import discord
from dotenv import load_dotenv

load_dotenv()

ballpit_channel_id = int(os.environ["BALLPIT_CHANNEL_ID"])

from archive import ArchiveCommand
from ballpit import ballpit_message

token = os.environ["DISCORD_TOKEN"]

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("myrmidon")


class Myrmidon(discord.Bot):
    async def on_ready(self):
        logger.info(f"Logged in as {self.user}")

    async def on_message(self, message: discord.Message):
        if message.author.bot:
            return

        if message.channel.id == ballpit_channel_id:
            message_length = len(message.content)
            response = ballpit_message(message_length)
            await message.channel.send(response)


intents = discord.Intents.default()
intents.message_content = True
bot = Myrmidon(intents=intents)
bot.add_cog(ArchiveCommand(bot))
bot.run(token)
