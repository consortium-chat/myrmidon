import assert from 'node:assert/strict'

assert(process.env.PERMANENT_THREADS, 'PERMANENT_THREADS environment variable is not set')

const permanentThreads = process.env.PERMANENT_THREADS
  .split(',')
  .map(id => id.trim())
  .filter(id => {
    const valid = /\d+/.test(id)
    if (!valid) {
      console.error(`Invalid permanent thread ID: ${id}`)
    }
    return valid
  })

export function autoUnarchivePermanentThreads (_oldThread, newThread) {
  if (permanentThreads.includes(newThread.id) && newThread.archived) {
    newThread.setArchived(false, 'Automatic unarchival of permanent thread')
    console.log(`Unarchived permanent thread "${newThread.name}"`)
  }
}
