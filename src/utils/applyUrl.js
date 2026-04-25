export function buildApplyUrls(job) {
  const title = (job.title || '').replace(/band\s*\d/gi, '').replace(/–.*$/, '').trim()
  const q = encodeURIComponent(title + ' visa sponsorship')
 
  return [
    {
      label: 'Search on NHS Jobs',
      url: `https://www.jobs.nhs.uk/candidate/search?keyword=${q}`,
      color: '#005EB8'
    },
    {
      label: 'Search on Reed',
      url: `https://www.reed.co.uk/jobs/${encodeURIComponent(title.toLowerCase().replace(/\s+/g, '-'))}-jobs?keywords=${q}`,
      color: '#CC0000'
    },
    {
      label: 'Search on Indeed',
      url: `https://uk.indeed.com/jobs?q=${q}&l=United+Kingdom`,
      color: '#2557A7'
    },
    {
      label: 'Search on NHS Scotland',
      url: `https://www.jobs.scot.nhs.uk/search/?q=${encodeURIComponent(title)}`,
      color: '#005EB8'
    }
  ]
}
