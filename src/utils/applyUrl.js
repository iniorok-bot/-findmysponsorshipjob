export function buildApplyUrl(job) {
  // Strip band references from title for cleaner search
  const title = (job.title || '').replace(/band\s*\d/gi, '').replace(/–.*$/, '').trim()
  const company = (job.company || '').split(',')[0].trim() // take first part before comma
 
  // Simple targeted search — role + employer only, no location
  const query = `${title} ${company} jobs`
  return `https://www.google.com/search?q=${encodeURIComponent(query)}&ibp=htl;jobs`
}
