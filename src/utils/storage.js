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
