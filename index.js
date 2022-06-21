require('dotenv').config()
const { Client, Intents } = require('discord.js')
const { manageDaysOfTheWeek } = require('./dotw')

const client = new Client({ intents: [ Intents.FLAGS.GUILDS ] })
const entrypoint = process.argv[2]

if (!entrypoint) {
  console.log("Must pass an entrypoint argument.")
  process.exit(1)
}

if (!process.env.DISCORD_TOKEN) {
  console.log("DISCORD_TOKEN environment variable is not set.")
  process.exit(1)
}

// Login hook
client.once('ready', async () => {
  console.log(`Logged in as ${client.user.tag}.`)
  switch (entrypoint) {
    
    // Manage Days-of-the-week channels
    case "dotw":
      await manageDaysOfTheWeek(client)
      break
    
    // Unknown entrypoint
    default:
      console.log(`Unknown entrypoint "${entrypoint}"`)
  }
  client.destroy()
})

client.login(process.env.DISCORD_TOKEN)
