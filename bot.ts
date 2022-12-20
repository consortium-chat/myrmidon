import {
  createBot,
  EventHandlers,
  Intents,
  InteractionResponseTypes,
  ModifyGuildChannelPositions,
  startBot,
} from "discordeno";

import config from "./config.ts";

Deno.permissions.request({
  name: "net",
  host: "discord.com",
});
Deno.permissions.request({
  name: "net",
  host: "gateway.discord.gg",
});

/** Myrmidon Discord bot */
const bot = createBot({
  token: config.token,
  intents: Intents.Guilds | Intents.GuildMessages,
});

// Login event handler
bot.events.ready = (_bot, { user }) => {
  console.log(`Logged in as ${user.username}#${user.discriminator}`);
};

// Register archive command
bot.helpers.createGuildApplicationCommand(
  {
    name: "archive",
    description: "Move the current channel to the archive category",
  },
  config.guildId,
);

const commandHandlers = new Map<string, EventHandlers["interactionCreate"]>();

commandHandlers.set("archive", async (bot, interaction) => {
  // Bail if the interaction occurs outside of a channel
  const channelId = interaction.channelId;
  if (channelId == undefined) return;

  // Move channel to archive category
  const channelPosition: ModifyGuildChannelPositions = {
    id: channelId.toString(),
    position: null,
    parentId: config.archiveCategory,
  };
  const channelTag = `<#${channelId}>`;
  const response = await bot.helpers.editChannelPositions(config.guildId, [
    channelPosition,
  ])
    .then(() => `Archived ${channelTag}`)
    .catch((error) => `Could not archive ${channelTag}: ${error.message}`);

  // Respond with result
  console.log(response);
  await bot.helpers.sendInteractionResponse(
    interaction.id,
    interaction.token,
    {
      type: InteractionResponseTypes.ChannelMessageWithSource,
      data: { content: response },
    },
  );
});

// Interaction event handler
bot.events.interactionCreate = (bot, interaction) => {
  // Bail if the interaction is not a slash command invocation
  const commandName = interaction.data?.name;
  if (commandName == undefined) return;

  // Delegate to a command handler
  return commandHandlers.get(commandName)?.(bot, interaction);
};

await startBot(bot);
