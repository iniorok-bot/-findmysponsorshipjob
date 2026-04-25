export function buildApplyUrl(job) {
  const title = (job.title || '').replace(/band\s*\d/gi, '').trim()
  const company = (job.company || '').trim()
  const location = (job.location || '').trim()
 
  // Build a targeted Google Jobs search
  const query = `${title} ${company} ${location} jobs visa sponsorship`
  return `https://www.google.com/search?q=${encodeURIComponent(query)}&ibp=htl;jobs`
}
 
