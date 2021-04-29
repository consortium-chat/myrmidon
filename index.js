const Discord = require('discord.js')
const { manageDaysOfTheWeek } = require('./dotw')

const client = new Discord.Client()
const token = process.argv[2]

// Login hook
client.on('ready', async () => {
  await manageDaysOfTheWeek(client)
  client.destroy()
})

client.login(token)
