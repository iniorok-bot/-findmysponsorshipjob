const REED_API_KEY = '1c1f4870-de5b-4618-9f3a-880b4775d336'

const NEGATIVE = [
  'unable to be sponsored under the skilled worker',
  'unable to be sponsored under the health and care',
  'unable to be sponsored',
  'post is unable to be sponsored',
  'role is unable to be sponsored',
  'this post is unable to be sponsored',
  'this role is unable to be sponsored',
  'unable to provide a certificate of sponsorship',
  'unable to provide sponsorship',
  'cannot provide sponsorship',
  'not able to provide sponsorship',
  'does not meet the eligibility criteria for a skilled worker',
  'does not meet the eligibility criteria for a health and care',
  'does not meet the eligibility criteria for sponsorship',
  'not eligible for a skilled worker visa',
  'not eligible for a health and care worker visa',
  'not eligible for sponsorship',
  'no sponsorship available',
  'sponsorship is not available',
  'sponsorship is not offered',
  'we are unable to sponsor',
  'cannot offer sponsorship',
  'not able to offer sponsorship',
  'unable to offer sponsorship',
  'we are not able to offer sponsorship',
  'not able to offer sponsorship',
  'unfortunately we are not able to offer',
  'unfortunately, we are not able to offer sponsorship',
  'we cannot offer visa sponsorship',
  'we are not in a position to offer sponsorship',
  'this role does not meet',
  'this post does not meet',
  'cannot support a visa',
  'unable to support a visa',
  'no visa sponsorship',
  'sponsorship cannot be provided',
  'we do not sponsor',
  'do not offer visa sponsorship',
  'not in a position to offer sponsorship',
  'unable to consider candidates who require sponsorship',
  'candidates must have the right to work',
  'applicants must have the right to work',
  'unfortunately we are unable to sponsor',
  'regret we are unable to provide sponsorship',
  'cannot support applications requiring sponsorship'
]

const POSITIVE = [
  'visa sponsorship available',
  'sponsorship available',
  'skilled worker visa',
  'health and care worker visa',
  'certificate of sponsorship',
  'cos available',
  'we can sponsor',
  'able to sponsor',
  'sponsorship will be',
  'sponsorship is available',
  'offer sponsorship',
  'provide sponsorship',
  'sponsorship provided',
  'eligible for sponsorship',
  'sponsorship considered',
  'sponsorship supported',
  'visa support',
  'welcome applications from overseas',
  'international applicants welcome',
  'displaced worker',
  'displaced care worker'
]

function isValidJob(description = '') {
  const d = description.toLowerCase()
  if (NEGATIVE.some(n => d.includes(n))) return false
  return POSITIVE.some(p => d.includes(p))
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()

  const { term = 'healthcare assistant sponsorship' } = req.query

  try {
    // Search Reed API
    const searchUrl = `https://www.reed.co.uk/api/1.0/search?keywords=${encodeURIComponent(term)}&locationName=United+Kingdom&distanceFromLocation=100&resultsToTake=20`

    const response = await fetch(searchUrl, {
      headers: {
        'Authorization': `Basic ${Buffer.from(REED_API_KEY + ':').toString('base64')}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Reed API error', status: response.status })
    }

    const data = await response.json()
    const results = data.results || []

    // Filter for genuine sponsorship jobs and format to match our job structure
    const filtered = results
      .filter(j => isValidJob(j.jobDescription || j.description || ''))
      .map(j => ({
        id: `reed_${j.jobId}`,
        title: j.jobTitle,
        company: j.employerName,
        location: j.locationName,
        salary: j.minimumSalary ? `£${Math.round(j.minimumSalary).toLocaleString()} – £${Math.round(j.maximumSalary || j.minimumSalary).toLocaleString()}` : 'Not specified',
        description: j.jobDescription || j.description || '',
        redirect_url: j.jobUrl,  // Direct link to exact Reed job posting
        posted_date: j.date || new Date().toISOString(),
        source: 'Reed',
        sponsorship: true
      }))

    return res.status(200).json({ results: filtered })
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch Reed jobs', message: error.message })
  }
}
