import { SECTORS } from './constants.js'

export function scoreJob(job, profile) {
  if (!profile) return 50
  const text = ((job.title || '') + ' ' + (job.description || '')).toLowerCase()
  let score = 0

  ;(profile.skills || []).forEach(s => {
    if (text.includes(s.toLowerCase())) score += 7
  })
  ;(profile.roles || []).forEach(r => {
    if (text.toLowerCase().includes(r.toLowerCase())) score += 10
  })

  if (job.region === 'Scotland') score += 5
  if (job.displaced) score += 8

  const sectorData = SECTORS[job.sector]
  if (sectorData) score += Math.max(0, (7 - sectorData.priority) * 3)

  return Math.min(99, Math.max(10, score))
}

export function getMatchedSkills(job, profile) {
  if (!profile?.skills) return []
  const text = ((job.title || '') + ' ' + (job.description || '')).toLowerCase()
  return profile.skills.filter(s => text.includes(s.toLowerCase()))
}

export function getSkillGaps(job, profile) {
  const desc = (job.description || '').toLowerCase()
  const commonCareSkills = [
    'band 3 experience', 'band 4 experience', 'venepuncture', 'catheter care',
    'stoma care', 'wound care', 'tracheostomy care', 'peg feeding',
    'positive behaviour support', 'makaton', 'intensive interaction',
    'discharge planning', 'care coordination', 'reablement', 'motivational interviewing',
    'cognitive behavioural', 'trauma informed', 'nmc standards', 'care certificate',
    'nvq level 2', 'nvq level 4', 'hca diploma', 'functional skills'
  ]
  const profileSkillsLower = (profile?.skills || []).map(s => s.toLowerCase())
  return commonCareSkills.filter(skill => {
    const inDesc = desc.includes(skill.toLowerCase())
    const inProfile = profileSkillsLower.some(ps => ps.includes(skill.toLowerCase()) || skill.toLowerCase().includes(ps))
    return inDesc && !inProfile
  })
}

export function tieBreakSort(a, b) {
  const dateDiff = new Date(b.posted_date) - new Date(a.posted_date)
  if (dateDiff !== 0) return dateDiff
  const aSector = SECTORS[a.sector]?.priority || 7
  const bSector = SECTORS[b.sector]?.priority || 7
  return aSector - bSector
}

export function isNew(dateStr) {
  return Date.now() - new Date(dateStr).getTime() < 24 * 3600000
}

export function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const h = Math.floor(diff / 3600000)
  if (h < 1) return 'Just posted'
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}
