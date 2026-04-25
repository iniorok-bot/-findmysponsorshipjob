import React from 'react'
import { SECTORS } from '../utils/constants.js'
import { timeAgo, getMatchedSkills, getSkillGaps } from '../utils/score.js'
import { buildApplyUrl } from '../utils/applyUrl.js'

export default function DetailPanel({ job, profile, onClose }) {
  const sec = SECTORS[job.sector] || SECTORS.nhs_hospital
  const matched = getMatchedSkills(job, profile)
  const gaps = getSkillGaps(job, profile)
  const applyUrl = buildApplyUrl(job)

  return (
    <div style={styles.panel}>
      <button style={styles.close} onClick={onClose}>← Back to results</button>

      <div style={styles.header}>
        <h2 style={styles.title}>{job.title}</h2>
        <p style={styles.company}>{job.company}</p>
        <p style={styles.location}>{job.location} · Posted {timeAgo(job.posted_date)}</p>
      </div>

      <div style={styles.badges}>
        <span style={{ ...styles.badge, background: '#E1F5EE', color: '#085041' }}>Visa sponsorship</span>
        <span style={{ ...styles.badge, background: sec.bg, color: sec.color }}>{sec.label}</span>
        <span style={{ ...styles.badge, background: sec.confBg, color: sec.confColor }}>Sponsorship: {sec.confidence}</span>
        {job.band !== 'Unspecified' && <span style={{ ...styles.badge, background: '#FAEEDA', color: '#633806' }}>{job.band}</span>}
        {job.displaced && <span style={{ ...styles.badge, background: '#FAEEDA', color: '#633806' }}>Displaced worker priority</span>}
      </div>

      <div style={styles.section}>
        <div style={styles.label}>Salary</div>
        <div style={styles.value}>{job.salary || 'Not specified'}</div>
      </div>

      <div style={styles.section}>
        <div style={styles.label}>Job description</div>
        <p style={styles.desc}>{job.description}</p>
      </div>

      {matched.length > 0 && (
        <div style={styles.section}>
          <div style={styles.label}>✓ Your skills that match</div>
          <div style={styles.tagWrap}>
            {matched.map(s => <span key={s} style={styles.matchTag}>{s}</span>)}
          </div>
        </div>
      )}

      {gaps.length > 0 && (
        <div style={styles.section}>
          <div style={styles.labelWarn}>⚠ Add these to your CV</div>
          <p style={styles.gapNote}>These appear in the job description but are not on your CV yet.</p>
          <div style={styles.tagWrap}>
            {gaps.map(s => <span key={s} style={styles.gapTag}>{s}</span>)}
          </div>
        </div>
      )}

      <button
        style={styles.applyBtn}
        onClick={() => window.open(applyUrl, '_blank')}
      >
        Search this role at {job.company} →
      </button>
      <p style={styles.applyNote}>Opens the employer's careers page filtered to this role</p>
    </div>
  )
}

const styles = {
  panel: { background: '#fff', border: '0.5px solid #e5e3de', borderRadius: 14, padding: '1.25rem', height: 'fit-content', position: 'sticky', top: 20 },
  close: { background: 'none', border: 'none', color: '#6b7280', fontSize: 13, cursor: 'pointer', padding: 0, marginBottom: 14, display: 'block', fontFamily: "'DM Sans', sans-serif" },
  header: { marginBottom: 12 },
  title: { fontSize: 16, fontWeight: 600, color: '#1a1a1a', lineHeight: 1.3, marginBottom: 4 },
  company: { fontSize: 13, color: '#374151', fontWeight: 500, marginBottom: 3 },
  location: { fontSize: 12, color: '#6b7280' },
  badges: { display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 14 },
  badge: { fontSize: 10, padding: '3px 9px', borderRadius: 20, fontWeight: 500, whiteSpace: 'nowrap' },
  section: { marginBottom: 14 },
  label: { fontSize: 11, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 },
  labelWarn: { fontSize: 11, fontWeight: 600, color: '#b45309', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 },
  value: { fontSize: 14, color: '#1a1a1a', fontWeight: 500 },
  desc: { fontSize: 13, color: '#374151', lineHeight: 1.6 },
  tagWrap: { display: 'flex', flexWrap: 'wrap', gap: 5 },
  matchTag: { fontSize: 11, padding: '3px 9px', background: '#E1F5EE', color: '#085041', borderRadius: 20, fontWeight: 500 },
  gapTag: { fontSize: 11, padding: '3px 9px', background: '#FAEEDA', color: '#633806', borderRadius: 20, fontWeight: 500 },
  gapNote: { fontSize: 12, color: '#6b7280', marginBottom: 8, lineHeight: 1.5 },
  applyBtn: { width: '100%', padding: '11px', background: '#1D9E75', color: '#fff', border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", marginTop: 4 },
  applyNote: { fontSize: 11, color: '#9ca3af', textAlign: 'center', marginTop: 6 }
}
