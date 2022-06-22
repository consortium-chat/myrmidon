import 'dotenv/config'
import assert from 'node:assert/strict'
import fetch from 'node-fetch'

assert(process.env.FRIDAY_WEBHOOK_URL, 'FRIDAY_WEBHOOK_URL environment variable is not set')

fetch(process.env.FRIDAY_WEBHOOK_URL, {
  method: 'POST',
  headers: {
    'content-type': 'application/json'
  },
  body: JSON.stringify({
    content: 'https://www.youtube.com/watch?v=kfVsfOSbJY0'
  })
}).then(async (response) => {
  if (response.ok) {
    console.log('Posted "Friday" by Rebecca Black')
  } else {
    const data = await response.json()
    console.error('Post error:', data.message)
  }
}).catch(console.error)
