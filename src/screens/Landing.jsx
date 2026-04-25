import React, { useState, useRef } from 'react'
import { CLAUDE_API_KEY } from '../utils/constants.js'

const DEMO_PROFILE = {
  name: 'Utibe Orok',
  location: 'Leeds, West Yorkshire',
  needsSponsorship: true,
  preferredRegion: 'Scotland',
  skills: [
    'medication administration', 'MAR charts', 'phlebotomy', 'vital signs',
    'SBAR', 'dementia care', 'safeguarding', 'MDT', 'care planning',
    'infection control', 'moving and handling', 'hoist operation',
    'NVQ Level 3', 'mental capacity act', 'DoLS awareness', 'risk assessment',
    'support planning', 'person-centred care', 'complex needs',
    'shift leadership', 'staff supervision', 'community engagement',
    'de-escalation', 'trauma informed care', 'substance misuse awareness'
  ],
  roles: [
    'Healthcare Assistant', 'Senior Care Assistant', 'Clinical Support Worker',
    'Phlebotomist', 'Mental Health Support Worker', 'Support Worker',
    'Community Support Worker', 'Reablement Support Worker', 'Care Assistant',
    'Therapy Assistant', 'Care Coordinator', 'Recovery Worker',
    'Discharge Support Worker', 'Learning Disability Support Worker'
  ],
  experience: '4+ years',
  qualifications: ['NVQ Level 3 Health & Social Care', 'Phlebotomy trained', 'DBS on Update Service']
}

export default function Landing({ onProfileReady }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [dragOver, setDragOver] = useState(false)
  const fileRef = useRef()

  async function extractProfileFromCV(file) {
    setLoading(true)
    setError('')
    try {
      const base64 = await fileToBase64(file)
      const isPdf = file.type === 'application/pdf'

      const messages = [{
        role: 'user',
        content: [
          {
            type: isPdf ? 'document' : 'text',
            ...(isPdf
              ? { source: { type: 'base64', media_type: 'application/pdf', data: base64 } }
              : { text: 'Please extract profile from this document.' }
            )
          },
          {
            type: 'text',
            text: `Extract this candidate's profile from their CV and return ONLY valid JSON (no markdown, no backticks) in this exact format:
{
  "name": "full name",
  "location": "city, region",
  "needsSponsorship": true,
  "preferredRegion": "Scotland",
  "skills": ["skill1", "skill2"],
  "roles": ["role1", "role2"],
  "experience": "X years",
  "qualifications": ["qual1", "qual2"]
}
Extract all clinical, care and support skills mentioned. Include all job roles they have held or are targeting. Skills should be specific: medication administration, phlebotomy, vital signs, SBAR, safeguarding, etc.`
          }
        ]
      }]

      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': CLAUDE_API_KEY,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages
        })
      })

      const data = await res.json()
      const text = data.content?.[0]?.text || ''
      const clean = text.replace(/```json|```/g, '').trim()
      const profile = JSON.parse(clean)
      profile.preferredRegion = profile.preferredRegion || 'Scotland'
      profile.needsSponsorship = true
      onProfileReady(profile)
    } catch (e) {
      setError('Could not read your CV. Please try again or use the demo profile.')
    }
    setLoading(false)
  }

  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result.split(',')[1])
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  function handleFile(file) {
    if (!file) return
    if (CLAUDE_API_KEY) {
      extractProfileFromCV(file)
    } else {
      // No API key — use demo with file name
      onProfileReady({ ...DEMO_PROFILE, name: 'Your Profile' })
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.brand}>
          <div style={styles.logo}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="14" fill="#1D9E75" />
              <path d="M8 14.5l4 4 8-9" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 style={styles.title}>Find My Sponsorship Job</h1>
          <p style={styles.subtitle}>UK care and support roles with visa sponsorship — NHS, private, specialist and community</p>
        </div>

        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Upload your CV to get started</h2>
          <p style={styles.cardSub}>We'll read your skills and experience to find the best matching roles</p>

          <div
            style={{ ...styles.dropzone, ...(dragOver ? styles.dropzoneActive : {}) }}
            onDragOver={e => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={e => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]) }}
            onClick={() => fileRef.current?.click()}
          >
            <input ref={fileRef} type="file" accept=".pdf,.doc,.docx,.txt" style={{ display: 'none' }} onChange={e => handleFile(e.target.files[0])} />
            {loading ? (
              <div style={styles.loadingState}>
                <div style={styles.spinner} />
                <p style={styles.loadingText}>Reading your CV...</p>
              </div>
            ) : (
              <>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" style={{ marginBottom: 12 }}>
                  <rect x="6" y="4" width="20" height="24" rx="3" stroke="#9ca3af" strokeWidth="1.5" />
                  <path d="M11 12h10M11 16h10M11 20h6" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <p style={styles.dropText}>Drop your CV here or <span style={styles.dropLink}>browse</span></p>
                <p style={styles.dropHint}>PDF, Word or text file</p>
              </>
            )}
          </div>

          {error && <p style={styles.error}>{error}</p>}

          <div style={styles.divider}><span style={styles.dividerText}>or</span></div>

          <button style={styles.demoBtn} onClick={() => onProfileReady(DEMO_PROFILE)}>
            Use demo profile (Utibe Orok)
          </button>
        </div>

        <div style={styles.features}>
          {[
            { icon: '⟳', label: 'Auto-refreshes every 30 mins' },
            { icon: '✓', label: 'New job alerts with tick tracking' },
            { icon: '⊕', label: 'NHS, private, specialist & community' },
            { icon: '◎', label: 'Scotland & UK-wide coverage' }
          ].map(f => (
            <div key={f.label} style={styles.feature}>
              <span style={styles.featureIcon}>{f.icon}</span>
              <span style={styles.featureLabel}>{f.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const styles = {
  page: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem', background: '#f5f4f0' },
  container: { width: '100%', maxWidth: 480 },
  brand: { textAlign: 'center', marginBottom: '2rem' },
  logo: { display: 'flex', justifyContent: 'center', marginBottom: '1rem' },
  title: { fontFamily: "'DM Serif Display', serif", fontSize: 28, fontWeight: 400, color: '#1a1a1a', marginBottom: 8 },
  subtitle: { fontSize: 15, color: '#6b7280', lineHeight: 1.5, maxWidth: 360, margin: '0 auto' },
  card: { background: '#fff', borderRadius: 16, padding: '2rem', border: '0.5px solid #e5e3de', marginBottom: '1.5rem' },
  cardTitle: { fontSize: 17, fontWeight: 600, color: '#1a1a1a', marginBottom: 6 },
  cardSub: { fontSize: 14, color: '#6b7280', marginBottom: '1.5rem', lineHeight: 1.5 },
  dropzone: { border: '1.5px dashed #d1cfc8', borderRadius: 12, padding: '2rem', textAlign: 'center', cursor: 'pointer', transition: 'all 0.15s', background: '#fafaf9' },
  dropzoneActive: { borderColor: '#1D9E75', background: '#f0fdf8' },
  dropText: { fontSize: 15, color: '#374151', marginBottom: 4 },
  dropLink: { color: '#1D9E75', fontWeight: 500 },
  dropHint: { fontSize: 13, color: '#9ca3af' },
  loadingState: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 },
  spinner: { width: 28, height: 28, border: '2.5px solid #e5e3de', borderTopColor: '#1D9E75', borderRadius: '50%', animation: 'spin 0.8s linear infinite' },
  loadingText: { fontSize: 14, color: '#6b7280' },
  error: { marginTop: 12, fontSize: 13, color: '#dc2626', textAlign: 'center' },
  divider: { display: 'flex', alignItems: 'center', margin: '1.5rem 0', gap: 12 },
  dividerText: { fontSize: 13, color: '#9ca3af', background: '#fff', padding: '0 8px', flexShrink: 0 },
  demoBtn: { width: '100%', padding: '10px 16px', background: '#f5f4f0', border: '0.5px solid #d1cfc8', borderRadius: 10, fontSize: 14, color: '#374151', cursor: 'pointer', fontWeight: 500, fontFamily: "'DM Sans', sans-serif" },
  features: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 },
  feature: { display: 'flex', alignItems: 'center', gap: 8, background: '#fff', border: '0.5px solid #e5e3de', borderRadius: 10, padding: '10px 12px' },
  featureIcon: { fontSize: 14, color: '#1D9E75', flexShrink: 0 },
  featureLabel: { fontSize: 12, color: '#6b7280', lineHeight: 1.4 }
}
