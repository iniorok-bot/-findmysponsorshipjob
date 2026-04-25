import { SEEN_EXPIRY_DAYS } from './constants.js'

export function getStorage(key, fallback) {
  try {
    const v = localStorage.getItem(key)
    return v ? JSON.parse(v) : fallback
  } catch {
    return fallback
  }
}

export function setStorage(key, val) {
  try {
    localStorage.setItem(key, JSON.stringify(val))
  } catch {}
}

export function clearStorage(key) {
  try {
    localStorage.removeItem(key)
  } catch {}
}

// Auto-clean seen IDs older than SEEN_EXPIRY_DAYS
// seenIds format: { jobId: timestamp }
export function cleanOldSeenIds(seenIds) {
  const cutoff = Date.now() - SEEN_EXPIRY_DAYS * 24 * 3600000
  const cleaned = {}
  Object.entries(seenIds).forEach(([id, ts]) => {
    // Support both old format (true) and new format (timestamp)
    const timestamp = typeof ts === 'number' ? ts : Date.now()
    if (timestamp > cutoff) {
      cleaned[id] = timestamp
    }
  })
  return cleaned
}

// Mark a job as seen with current timestamp
export function markJobSeen(seenIds, jobId) {
  return { ...seenIds, [String(jobId)]: Date.now() }
}

// Check if a job has been seen
export function isJobSeen(seenIds, jobId) {
  return !!seenIds[String(jobId)]
}
