javascriptconst ADZUNA_APP_ID = 'aeffba80'
const ADZUNA_APP_KEY = 'e1e3823f98659c055704866fa71bd9f8'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  const { term = 'healthcare assistant sponsorship', page = 1 } = req.query

  try {
    const url = `https://api.adzuna.com/v1/api/jobs/gb/search/${page}?app_id=${ADZUNA_APP_ID}&app_key=${ADZUNA_APP_KEY}&results_per_page=20&what=${encodeURIComponent(term)}&content-type=application/json`
    const response = await fetch(url)
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Adzuna API error' })
    }
    const data = await response.json()
    return res.status(200).json(data)
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch jobs' })
  }
}
