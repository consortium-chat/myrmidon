import assert from 'node:assert/strict'
import { CronJob } from 'cron'
import fetch from 'node-fetch'

assert(process.env.FRIDAY_WEBHOOK_URL, 'FRIDAY_WEBHOOK_URL environment variable is not set')

export function postFriday () {
  return new CronJob(
    '0 0 7 * * 5',
    async function () {
      try {
        const response = await fetch(process.env.FRIDAY_WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            content: Math.random() > 1/30
              ? 'https://www.youtube.com/watch?v=kfVsfOSbJY0' // original
              : 'https://www.youtube.com/watch?v=iCFOcqsnc9Y' // remix
          })
        })
        if (response.ok) {
          console.log('Posted "Friday" by Rebecca Black')
        } else {
          const data = await response.json()
          console.error('Post error:', data.message)
        }
      } catch (error) {
        console.error('Unable to post "Friday" by Rebecca Black:', error)
      }
    },
    null,
    false,
    'America/Los_Angeles'
  )
}
