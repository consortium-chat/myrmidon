import {
  CONSORTIUM,
  DOTW_CATEGORY,
  DOTW_CHANNELS,
  GENERAL_CATEGORY,
} from "./constants.js";

export async function manageDaysOfTheWeek(client) {
  const guild = client.guilds.resolve(CONSORTIUM);
  const generalCategory = guild.channels.resolve(GENERAL_CATEGORY);
  const dotwCategory = guild.channels.resolve(DOTW_CATEGORY);
  const channels = DOTW_CHANNELS.map((id) => guild.channels.resolve(id));
  const weekday = new Date().getDay();
  const currentDotw = channels[weekday];

  // Move current DoTW channel to the top of the General category
  await currentDotw.setParent(generalCategory);
  await currentDotw.setPosition(0);

  // Sort other DoTW channels in the DoTW category
  for (let i = 0; i < 6; ++i) {
    const channel = channels[(weekday + i + 1) % 7];
    await channel.setParent(dotwCategory);
    await channel.setPosition(i);
  }
}
