import React, { useState } from 'react'
import { DIRECT_LINKS, SECTORS } from '../utils/constants.js'

export default function DirectLinks() {
  const [open, setOpen] = useState(true)

  return (
    <div style={styles.wrap}>
      <div style={styles.header} onClick={() => setOpen(v => !v)}>
        <span style={styles.title}>Direct portal links — NHS & Scotland</span>
        <span style={styles.toggle}>{open ? '▲ Hide' : '▼ Show'}</span>
      </div>
      {open && (
        <div style={styles.grid}>
          {DIRECT_LINKS.map(l => {
            const sec = SECTORS[l.sector] || SECTORS.nhs_hospital
            return (
              <a key={l.url} href={l.url} target="_blank" rel="noreferrer" style={styles.link}>
                <span style={styles.linkLabel}>{l.label}</span>
                <span style={{ ...styles.regionTag, background: sec.bg, color: sec.color }}>{l.region}</span>
              </a>
            )
          })}
        </div>
      )}
    </div>
  )
}

const styles = {
  wrap: { background: '#fff', border: '0.5px solid #e5e3de', borderRadius: 14, padding: '1rem 1.25rem', marginBottom: 12 },
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' },
  title: { fontSize: 13, fontWeight: 600, color: '#1a1a1a' },
  toggle: { fontSize: 12, color: '#6b7280' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 6, marginTop: 12 },
  link: { padding: '8px 12px', border: '0.5px solid #e5e3de', borderRadius: 10, fontSize: 12, color: '#1a1a1a', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6, background: '#fafaf9' },
  linkLabel: { flex: 1, lineHeight: 1.3 },
  regionTag: { fontSize: 10, padding: '2px 7px', borderRadius: 20, fontWeight: 500, flexShrink: 0, whiteSpace: 'nowrap' }
}
