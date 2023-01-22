import logging
import os

import discord

archive_category_id = int(os.environ["ARCHIVE_CATEGORY_ID"])

logger = logging.getLogger("myrmidon.archive")


class ArchiveCommand(discord.Cog):
    def __init__(self, bot: discord.Bot):
        self.bot = bot

    @discord.slash_command(
        name="archive",
        description="Move the current channel to the archive category",
    )
    async def archive_command(self, ctx: discord.ApplicationContext):

        channel = ctx.channel
        assert channel

        if channel.type != discord.ChannelType.text:
            await ctx.respond(
                "This command can only be used in text channels", ephemeral=True
            )
            return

        if channel.category and channel.category.id == archive_category_id:
            await ctx.respond("This channel is already archived", ephemeral=True)
            return

        permissions = channel.permissions_for(ctx.author)

        if not permissions.manage_channels:
            await ctx.respond(
                "You do not have permission to move this channel", ephemeral=True
            )
            return

        archive_category = self.bot.get_channel(archive_category_id)
        await channel.edit(category=archive_category)
        await ctx.respond(f"Archived {channel.mention}.")
        logger.info(f"Archived {channel.name} in {ctx.guild.name}")
