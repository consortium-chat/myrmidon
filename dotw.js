const Discord = require('discord.js')

const CONSORTIUM = '537167820539166720'
const GENERAL_CATEGORY = '609619276306972714'
const DOTW_CATEGORY = '821808118807003136'
const DOTW_CHANNELS = [
  '821808450873851934', // Sunday
  '821808212956676129', // Monday
  '821808251061796874', // Tuesday
  '821808287737577512', // Wednesday
  '821808325209489408', // Thursday
  '821808372684423179', // Friday
  '821808406263496798' // Saturday
]

/**
 * @param {Discord.Client} client
 */
async function manageDaysOfTheWeek (client) {
  const guild = client.guilds.resolve(CONSORTIUM)
  const generalCategory = guild.channels.resolve(GENERAL_CATEGORY)
  const dotwCategory = guild.channels.resolve(DOTW_CATEGORY)
  const channels = DOTW_CHANNELS.map(id => guild.channels.resolve(id))
  const weekday = new Date().getDay()
  const currentDotw = channels[weekday]

  // Move current DoTW channel to the top of the General category
  await currentDotw.setParent(generalCategory)
  await currentDotw.setPosition(0)

  // Sort other DoTW channels in the DoTW category
  for (let i = 0; i < 6; ++i) {
    const channel = channels[(weekday + i + 1) % 7]
    await channel.setParent(dotwCategory)
    await channel.setPosition(i)
  }
}

module.exports = {
  manageDaysOfTheWeek
}
