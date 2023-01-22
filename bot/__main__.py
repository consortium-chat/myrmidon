import logging
import os

import discord
from dotenv import load_dotenv

load_dotenv()

from archive import ArchiveCommand

token = os.environ["DISCORD_TOKEN"]
archive_category_id = int(os.environ["ARCHIVE_CATEGORY_ID"])

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("myrmidon")


class Myrmidon(discord.Bot):
    async def on_ready(self):
        logger.info(f"Logged in as {self.user}")


intents = discord.Intents.default()
intents.messages = True
bot = Myrmidon(intents=intents)
bot.add_cog(ArchiveCommand(bot))
bot.run(token)
