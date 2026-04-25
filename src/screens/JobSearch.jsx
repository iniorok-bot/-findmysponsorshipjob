jsximport React, { useState, useEffect, useRef, useCallback } from 'react'
import JobCard from '../components/JobCard.jsx'
import DetailPanel from '../components/DetailPanel.jsx'
import DirectLinks from '../components/DirectLinks.jsx'
import { DEMO_JOBS, SEARCH_TERMS_SCOTLAND, SEARCH_TERMS_UK } from '../utils/constants.js'
import { classifySector, detectRegion, detectDisplaced, detectBand } from '../utils/classify.js'
import { scoreJob, tieBreakSort, isNew } from '../utils/score.js'
import { getStorage, setStorage } from '../utils/storage.js'

export default function JobSearch({ profile, onReset }) {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(false)
  const [lastFetched, setLastFetched] = useState(null)
  const [countdown, setCountdown] = useState(1800)
  const [alert, setAlert] = useState(null)
  const [seenIds, setSeenIds] = useState(() => getStorage('fmsj_seen_v1', {}))
  const [selected, setSelected] = useState(null)
  const [filterRegion, setFilterRegion] = useState(profile.preferredRegion === 'Scotland' ? 'Scotland' : 'all')
  const [filterSector, setFilterSector] = useState('all')
  const [filterBand, setFilterBand] = useState('all')
  const [filterDisplaced, setFilterDisplaced] = useState(false)
  const timerRef = useRef(null)
  const cdRef = useRef(null)
  const prevJobIdsRef = useRef(new Set())

  const processJobs = useCallback((raw) => {
    const deduped = []
    const seen = new Set()
    raw.forEach(j => {
      const key = String(j.id)
      if (!seen.has(key)) { seen.add(key); deduped.push(j) }
    })
    const withMeta = deduped.map(j => {
      const sector = j.sector || classifySector(j.title, j.company, j.description)
      return { ...j, sector, match: scoreJob({ ...j, sector }, profile) }
    })
    withMeta.sort(tieBreakSort)
    return withMeta
  }, [profile])

  const fetchJobs = useCallback(async (silent = false) => {
    if (!silent) setLoading(true)
    try {
      const results = []
      const terms = profile.preferredRegion === 'Scotland'
        ? [...SEARCH_TERMS_SCOTLAND, ...SEARCH_TERMS_UK.slice(0, 3)]
        : SEARCH_TERMS_UK

      for (const term of terms.slice(0, 5)) {
        try {
          const url = `/api/jobs?term=${encodeURIComponent(term)}`
          const res = await fetch(url)
          if (res.ok) {
            const data = await res.json()
            if (data.results) {
              data.results.forEach(j => {
                const desc = (j.description || '').toLowerCase()
                const hasSponsor = desc.includes('sponsor') || desc.includes('visa') || desc.includes('skilled worker')
                if (hasSponsor) {
                  results.push({
                    id: j.id,
                    title: j.title,
                    company: j.company?.display_name || 'Unknown',
                    location: j.location?.display_name || 'UK',
                    region: detectRegion(j.location?.display_name || ''),
                    salary: j.salary_min ? `£${Math.round(j.salary_min).toLocaleString()} – £${Math.round(j.salary_max || j.salary_min).toLocaleString()}` : 'Not specified',
                    band: detectBand(j.title),
                    posted_date: j.created,
                    sponsorship: true,
                    description: j.description,
                    redirect_url: j.redirect_url,
                    displaced: detectDisplaced(j.description),
                    skills_match: (profile.skills || []).filter(s => desc.includes(s.toLowerCase())).slice(0, 5)
                  })
                }
              })
            }
          }
        } catch (e) { /* continue */ }
      }

      const src = results.length > 0 ? results : DEMO_JOBS
      const processed = processJobs(src)

      const currentIds = new Set(processed.map(j => String(j.id)))
      const newJobs = processed.filter(j => !prevJobIdsRef.current.has(String(j.id)) && isNew(j.posted_date))
      if (newJobs.length > 0 && prevJobIdsRef.current.size > 0) {
        setAlert(`${newJobs.length} new job${newJobs.length > 1 ? 's' : ''} found`)
        setTimeout(() => setAlert(null), 30000)
      }
      prevJobIdsRef.current = currentIds
      setJobs(processed)
      setLastFetched(new Date())
      setCountdown(1800)
    } catch (e) {
      const processed = processJobs(DEMO_JOBS)
      setJobs(processed)
    }
    setLoading(false)
  }, [profile, processJobs])

  useEffect(() => {
    fetchJobs()
    timerRef.current = setInterval(() => fetchJobs(true), 1800000)
    cdRef.current = setInterval(() => setCountdown(c => c <= 1 ? 1800 : c - 1), 1000)
    return () => { clearInterval(timerRef.current); clearInterval(cdRef.current) }
  }, [])

  const markSeen = id => {
    const u = { ...seenIds, [String(id)]: true }
    setSeenIds(u)
    setStorage('fmsj_seen_v1', u)
  }

  const handleJobClick = job => { setSelected(job); markSeen(job.id) }

  const fmtCd = s => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`

  const timeAgoStr = date => {
    if (!date) return ''
    const diff = Date.now() - date.getTime()
    const m = Math.floor(diff / 60000)
    if (m < 1) return 'just now'
    if (m < 60) return `${m}m ago`
    return `${Math.floor(m / 60)}h ago`
  }

  const filtered = jobs.filter(j => {
    if (filterRegion !== 'all' && j.region !== filterRegion) return false
    if (filterSector !== 'all' && j.sector !== filterSector) return false
    if (filterBand !== 'all' && j.band !== filterBand) return false
    if (filterDisplaced && !j.displaced) return false
    return true
  })

  const newCount = filtered.filter(j => isNew(j.posted_date) && !seenIds[String(j.id)]).length

  return (
    <div style={styles.page}>
      <div style={styles.inner}>
        <div style={styles.header}>
          <div style={styles.headerTop}>
            <div style={styles.candidateRow}>
              <div style={styles.avatar}>{(profile.name || 'U').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}</div>
              <div>
                <div style={styles.candidateName}>{profile.name}</div>
                <div style={styles.candidateSub}>Sponsorship job search — {profile.preferredRegion === 'all' ? 'All UK' : profile.preferredRegion}</div>
              </div>
            </div>
            <div style={styles.headerActions}>
              <button style={styles.refreshBtn} onClick={() => fetchJobs()}>Refresh</button>
              <button style={styles.resetBtn} onClick={onReset}>Change profile</button>
            </div>
          </div>
          <div style={styles.statusRow}>
            <span style={styles.chip}><span style={styles.dot} />Live</span>
            <span style={styles.chip}>{lastFetched ? `Updated ${timeAgoStr(lastFetched)}` : 'Loading...'}</span>
            <span style={styles.chip}>Next refresh {fmtCd(countdown)}</span>
            {newCount > 0 && <span style={{ ...styles.chip, background: '#E1F5EE', color: '#085041', border: '0.5px solid #5DCAA5' }}>{newCount} new</span>}
          </div>
          {alert && (
            <div style={styles.alertBanner}>
              <span>{alert} since last refresh</span>
              <button style={styles.alertClose} onClick={() => setAlert(null)}>×</button>
            </div>
          )}
        </div>

        <DirectLinks />

        <div style={styles.filters}>
          <select style={styles.fsel} value={filterRegion} onChange={e => setFilterRegion(e.target.value)}>
            <option value="all">All regions</option>
            <option value="Scotland">Scotland</option>
            <option value="England">England</option>
            <option value="Wales">Wales</option>
          </select>
          <select style={styles.fsel} value={filterSector} onChange={e => setFilterSector(e.target.value)}>
            <option value="all">All sectors</option>
            <option value="nhs_hospital">NHS Hospital</option>
            <option value="nhs_community">NHS Community</option>
            <option value="specialist">Specialist Provider</option>
            <option value="private_health">Private Healthcare</option>
            <option value="residential">Residential Care</option>
            <option value="domiciliary">Domiciliary Care</option>
            <option value="local_authority">Local Authority</option>
          </select>
          <select style={styles.fsel} value={filterBand} onChange={e => setFilterBand(e.target.value)}>
            <option value="all">All bands</option>
            <option value="Band 3">Band 3</option>
            <option value="Band 4">Band 4</option>
            <option value="Unspecified">Unspecified</option>
          </select>
          <label style={styles.checkLabel}>
            <input type="checkbox" checked={filterDisplaced} onChange={e => setFilterDisplaced(e.target.checked)} style={{ marginRight: 5 }} />
            Displaced worker only
          </label>
        </div>

        <div style={styles.resultsHeader}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={styles.resultsCount}>{filtered.length} job{filtered.length !== 1 ? 's' : ''} found</span>
            {newCount > 0 && <span style={styles.newBadge}>{newCount} new</span>}
          </div>
          <span style={styles.resultsCount}>Newest first</span>
        </div>

        <div style={styles.layout}>
          <div style={styles.jobList}>
            {loading && <div style={styles.loading}><div style={styles.spinner} /><p>Searching UK job boards...</p></div>}
            {!loading && filtered.length === 0 && <div style={styles.empty}>No jobs found. Try adjusting your filters.</div>}
            {!loading && filtered.map(job => (
              <JobCard
                key={job.id}
                job={job}
                selected={selected?.id === job.id}
                seen={!!seenIds[String(job.id)]}
                onClick={() => handleJobClick(job)}
              />
            ))}
          </div>
          {selected && (
            <div style={styles.detailWrap}>
              <DetailPanel job={selected} profile={profile} onClose={() => setSelected(null)} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const styles = {
  page: { minHeight: '100vh', background: '#f5f4f0', padding: '1.5rem 1rem' },
  inner: { maxWidth: 1100, margin: '0 auto' },
  header: { background: '#fff', border: '0.5px solid #e5e3de', borderRadius: 14, padding: '1rem 1.25rem', marginBottom: 12 },
  headerTop: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, marginBottom: 10 },
  candidateRow: { display: 'flex', alignItems: 'center', gap: 10 },
  avatar: { width: 38, height: 38, borderRadius: '50%', background: '#E1F5EE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 600, color: '#0F6E56', flexShrink: 0 },
  candidateName: { fontSize: 15, fontWeight: 600, color: '#1a1a1a' },
  candidateSub: { fontSize: 12, color: '#6b7280' },
  headerActions: { display: 'flex', gap: 8 },
  refreshBtn: { fontSize: 13, padding: '6px 14px', border: '0.5px solid #d1cfc8', background: '#fff', color: '#1a1a1a', borderRadius: 8, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" },
  resetBtn: { fontSize: 13, padding: '6px 14px', border: '0.5px solid #d1cfc8', background: '#f5f4f0', color: '#6b7280', borderRadius: 8, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" },
  statusRow: { display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' },
  chip: { fontSize: 11, color: '#6b7280', background: '#f5f4f0', border: '0.5px solid #e5e3de', borderRadius: 20, padding: '3px 10px' },
  dot: { display: 'inline-block', width: 7, height: 7, borderRadius: '50%', background: '#1D9E75', marginRight: 5, animation: 'pulse 2s infinite' },
  alertBanner: { background: '#E1F5EE', border: '0.5px solid #5DCAA5', borderRadius: 8, padding: '8px 14px', marginTop: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 13, color: '#085041' },
  alertClose: { background: 'none', border: 'none', color: '#0F6E56', cursor: 'pointer', fontSize: 18, lineHeight: 1, fontFamily: 'inherit' },
  filters: { display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10, alignItems: 'center' },
  fsel: { fontSize: 13, padding: '6px 12px', border: '0.5px solid #d1cfc8', borderRadius: 8, background: '#fff', color: '#1a1a1a', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" },
  checkLabel: { fontSize: 13, color: '#374151', display: 'flex', alignItems: 'center', cursor: 'pointer', background: '#fff', border: '0.5px solid #d1cfc8', borderRadius: 8, padding: '6px 12px' },
  resultsHeader: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  resultsCount: { fontSize: 13, color: '#6b7280' },
  newBadge: { fontSize: 12, fontWeight: 500, color: '#1D9E75', background: '#E1F5EE', borderRadius: 20, padding: '2px 10px' },
  layout: { display: 'flex', gap: 12, alignItems: 'flex-start' },
  jobList: { flex: 1, minWidth: 0 },
  detailWrap: { width: 340, flexShrink: 0 },
  loading: { textAlign: 'center', padding: '3rem', color: '#6b7280', fontSize: 14 },
  spinner: { width: 28, height: 28, border: '2.5px solid #e5e3de', borderTopColor: '#1D9E75', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 12px' },
  empty: { textAlign: 'center', padding: '3rem', color: '#6b7280', fontSize: 14 }
}
