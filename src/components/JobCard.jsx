import React from 'react'
import { SECTORS } from '../utils/constants.js'
import { timeAgo, isNew } from '../utils/score.js'

export default function JobCard({ job, selected, seen, onClick }) {
  const sec = SECTORS[job.sector] || SECTORS.nhs_hospital
  const isnew = isNew(job.posted_date) && !seen

  return (
    <div style={{ ...styles.card, ...(selected ? styles.cardSelected : {}) }} onClick={onClick}>
      <div style={styles.top}>
        <div style={styles.titleWrap}>
          <div style={styles.title}>{job.title}</div>
          <div style={styles.company}>{job.company} · {job.location}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flexShrink: 0 }}>
          {isnew
            ? <div style={styles.tickNew} title="New job">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <polyline points="1.5,5 4,7.5 8.5,2.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            : <div style={styles.tickSeen} title="Seen" />
          }
          <span style={styles.timeAgo}>{timeAgo(job.posted_date)}</span>
        </div>
      </div>

      <div style={styles.badges}>
        <span style={{ ...styles.badge, background: '#E1F5EE', color: '#085041' }}>Visa sponsorship</span>
        <span style={{ ...styles.badge, background: sec.bg, color: sec.color }}>{sec.short}</span>
        <span style={{ ...styles.badge, background: sec.confBg, color: sec.confColor }}>{sec.confidence}</span>
        {job.region === 'Scotland' && <span style={{ ...styles.badge, background: '#E6F1FB', color: '#0C447C' }}>Scotland</span>}
        {job.region === 'Wales' && <span style={{ ...styles.badge, background: '#EAF3DE', color: '#3B6D11' }}>Wales</span>}
        {job.band !== 'Unspecified' && <span style={{ ...styles.badge, background: '#FAEEDA', color: '#633806' }}>{job.band}</span>}
        {job.displaced && <span style={{ ...styles.badge, background: '#FAEEDA', color: '#633806' }}>Displaced priority</span>}
      </div>

      <div style={styles.matchRow}>
        <div style={styles.matchBg}>
          <div style={{ ...styles.matchFill, width: `${job.match}%` }} />
        </div>
        <span style={styles.matchPct}>{job.match}% match</span>
      </div>
    </div>
  )
}

const styles = {
  card: { background: '#fff', border: '0.5px solid #e5e3de', borderRadius: 14, padding: '1rem 1.25rem', marginBottom: 8, cursor: 'pointer', transition: 'border-color 0.15s' },
  cardSelected: { borderColor: '#1D9E75', boxShadow: '0 0 0 2px rgba(29,158,117,0.1)' },
  top: { display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10, marginBottom: 8 },
  titleWrap: { flex: 1 },
  title: { fontSize: 14, fontWeight: 600, color: '#1a1a1a', lineHeight: 1.3, marginBottom: 3 },
  company: { fontSize: 12, color: '#6b7280' },
  tickNew: { width: 20, height: 20, borderRadius: '50%', background: '#1D9E75', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  tickSeen: { width: 20, height: 20, borderRadius: '50%', border: '1.5px solid #d1cfc8' },
  timeAgo: { fontSize: 11, color: '#9ca3af', whiteSpace: 'nowrap' },
  badges: { display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 8 },
  badge: { fontSize: 10, padding: '2px 8px', borderRadius: 20, fontWeight: 500, whiteSpace: 'nowrap' },
  matchRow: { display: 'flex', alignItems: 'center', gap: 8 },
  matchBg: { flex: 1, height: 3, background: '#f0ede8', borderRadius: 2, overflow: 'hidden' },
  matchFill: { height: '100%', background: '#1D9E75', borderRadius: 2 },
  matchPct: { fontSize: 11, color: '#9ca3af', whiteSpace: 'nowrap', minWidth: 56 }
}
