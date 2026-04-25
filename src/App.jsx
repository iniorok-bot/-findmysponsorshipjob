import React from 'react'
import JobSearch from './screens/JobSearch.jsx'

const UTIBE_PROFILE = {
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

export default function App() {
  return (
    <>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.5; transform:scale(0.85); } }
        * { box-sizing: border-box; }
        select, input, button, textarea { font-family: 'DM Sans', sans-serif; }
        input:focus, select:focus { outline: 2px solid #1D9E75; outline-offset: 1px; }
      `}</style>
      <JobSearch profile={UTIBE_PROFILE} onReset={() => {}} />
    </>
  )
}
