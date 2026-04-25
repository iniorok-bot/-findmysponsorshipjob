import React, { useState } from 'react'

export default function ProfileConfirm({ profile, onConfirm, onBack }) {
  const [name, setName] = useState(profile.name || '')
  const [location, setLocation] = useState(profile.location || '')
  const [region, setRegion] = useState(profile.preferredRegion || 'Scotland')
  const [skills, setSkills] = useState(profile.skills || [])
  const [newSkill, setNewSkill] = useState('')

  function removeSkill(s) { setSkills(skills.filter(sk => sk !== s)) }
  function addSkill() {
    const s = newSkill.trim()
    if (s && !skills.includes(s)) { setSkills([...skills, s]); setNewSkill('') }
  }

  function handleConfirm() {
    onConfirm({ ...profile, name, location, preferredRegion: region, skills, needsSponsorship: true })
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <button style={styles.back} onClick={onBack}>← Back</button>
        <h1 style={styles.title}>Confirm your profile</h1>
        <p style={styles.sub}>Check what we extracted from your CV. You can edit anything before searching.</p>

        <div style={styles.section}>
          <label style={styles.label}>Your name</label>
          <input style={styles.input} value={name} onChange={e => setName(e.target.value)} placeholder="Full name" />
        </div>

        <div style={styles.section}>
          <label style={styles.label}>Your location</label>
          <input style={styles.input} value={location} onChange={e => setLocation(e.target.value)} placeholder="City, Region" />
        </div>

        <div style={styles.section}>
          <label style={styles.label}>Preferred search region</label>
          <select style={styles.select} value={region} onChange={e => setRegion(e.target.value)}>
            <option value="Scotland">Scotland (priority)</option>
            <option value="all">All UK</option>
            <option value="England">England</option>
            <option value="Wales">Wales</option>
          </select>
        </div>

        <div style={styles.section}>
          <label style={styles.label}>Sponsorship required</label>
          <div style={styles.sponsorBadge}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="7" fill="#1D9E75" /><path d="M4 7l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <span style={{ fontSize: 14, color: '#085041', fontWeight: 500 }}>Yes — only sponsored roles will appear</span>
          </div>
        </div>

        <div style={styles.section}>
          <label style={styles.label}>Your skills ({skills.length} extracted)</label>
          <div style={styles.skillsWrap}>
            {skills.map(s => (
              <span key={s} style={styles.skillTag}>
                {s}
                <button style={styles.removeSkill} onClick={() => removeSkill(s)}>×</button>
              </span>
            ))}
          </div>
          <div style={styles.addRow}>
            <input style={{ ...styles.input, flex: 1, marginBottom: 0 }} value={newSkill} onChange={e => setNewSkill(e.target.value)} onKeyDown={e => e.key === 'Enter' && addSkill()} placeholder="Add a skill..." />
            <button style={styles.addBtn} onClick={addSkill}>Add</button>
          </div>
        </div>

        <div style={styles.section}>
          <label style={styles.label}>Target roles ({profile.roles?.length || 0} identified)</label>
          <div style={styles.rolesWrap}>
            {(profile.roles || []).map(r => (
              <span key={r} style={styles.roleTag}>{r}</span>
            ))}
          </div>
        </div>

        <button style={styles.confirmBtn} onClick={handleConfirm}>
          Find my sponsorship jobs →
        </button>
      </div>
    </div>
  )
}

const styles = {
  page: { minHeight: '100vh', padding: '2rem 1rem', background: '#f5f4f0' },
  container: { maxWidth: 560, margin: '0 auto' },
  back: { background: 'none', border: 'none', color: '#6b7280', fontSize: 14, cursor: 'pointer', marginBottom: '1.5rem', padding: 0, fontFamily: "'DM Sans', sans-serif" },
  title: { fontFamily: "'DM Serif Display', serif", fontSize: 26, fontWeight: 400, color: '#1a1a1a', marginBottom: 8 },
  sub: { fontSize: 15, color: '#6b7280', marginBottom: '2rem', lineHeight: 1.5 },
  section: { marginBottom: '1.5rem' },
  label: { display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' },
  input: { width: '100%', padding: '10px 14px', border: '0.5px solid #d1cfc8', borderRadius: 10, fontSize: 14, color: '#1a1a1a', background: '#fff', fontFamily: "'DM Sans', sans-serif", outline: 'none', marginBottom: 0 },
  select: { width: '100%', padding: '10px 14px', border: '0.5px solid #d1cfc8', borderRadius: 10, fontSize: 14, color: '#1a1a1a', background: '#fff', fontFamily: "'DM Sans', sans-serif", cursor: 'pointer' },
  sponsorBadge: { display: 'flex', alignItems: 'center', gap: 8, background: '#E1F5EE', border: '0.5px solid #5DCAA5', borderRadius: 10, padding: '10px 14px' },
  skillsWrap: { display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 },
  skillTag: { display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, padding: '4px 10px', background: '#E1F5EE', color: '#085041', borderRadius: 20, fontWeight: 500 },
  removeSkill: { background: 'none', border: 'none', color: '#0F6E56', cursor: 'pointer', fontSize: 14, lineHeight: 1, padding: 0, fontFamily: 'inherit' },
  addRow: { display: 'flex', gap: 8, alignItems: 'center' },
  addBtn: { padding: '10px 16px', background: '#1D9E75', color: '#fff', border: 'none', borderRadius: 10, fontSize: 14, cursor: 'pointer', fontWeight: 500, fontFamily: "'DM Sans', sans-serif", whiteSpace: 'nowrap' },
  rolesWrap: { display: 'flex', flexWrap: 'wrap', gap: 6 },
  roleTag: { fontSize: 12, padding: '4px 10px', background: '#EEEDFE', color: '#3C3489', borderRadius: 20, fontWeight: 500 },
  confirmBtn: { width: '100%', padding: '14px', background: '#1D9E75', color: '#fff', border: 'none', borderRadius: 12, fontSize: 16, fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", marginTop: '1rem' }
}
