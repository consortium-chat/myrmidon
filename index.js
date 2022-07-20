import 'dotenv/config'
import assert from 'node:assert/strict'
import { Client, Intents } from 'discord.js'

// Cron jobs
import { manageDotWChannels } from './dotw.js'
import { postFriday } from './friday.js'

// Event handlers
import { autoUnarchivePermanentThreads } from './threads.js'

assert(process.env.DISCORD_TOKEN, 'DISCORD_TOKEN environment variable is not set.')

const client = new Client({ intents: [ Intents.FLAGS.GUILDS ] })

// Login hook
client.once('ready', async () => {
  console.log(`Logged in as ${client.user.tag}.`)

  // Start cron jobs
  manageDotWChannels(client).start()
  postFriday().start()
})

// Register event handlers
client.on('threadUpdate', autoUnarchivePermanentThreads)

client.login()
