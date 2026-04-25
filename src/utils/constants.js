export const ADZUNA_APP_ID = 'aeffba80'
export const ADZUNA_APP_KEY = 'e1e3823f98659c055704866fa71bd9f8'

// Replace with your actual Claude API key - set in environment variable
export const CLAUDE_API_KEY = import.meta.env.VITE_CLAUDE_API_KEY || ''

export const ALL_ROLES = [
  // Clinical Support
  'Healthcare Assistant', 'Clinical Support Worker', 'Phlebotomist',
  'Maternity Support Worker', 'Theatre Support Worker', 'Operating Department Assistant',
  'Outpatient Support Worker', 'ECG Cardiology Assistant', 'Endoscopy Support Worker',
  'Radiology Imaging Assistant', 'Pathology Laboratory Assistant',
  // Therapy & Rehab
  'Physiotherapy Assistant', 'Occupational Therapy Assistant', 'Rehabilitation Assistant',
  'Speech Language Therapy Assistant', 'Assistant Practitioner',
  // Mental Health & Recovery
  'Mental Health Support Worker', 'Recovery Worker', 'Crisis Team Support Worker',
  'Substance Misuse Support Worker',
  // Community & Discharge
  'Community Support Worker', 'Community Healthcare Assistant', 'Discharge Coordinator',
  'Discharge Support Worker', 'Reablement Support Worker', 'Integrated Care Support Worker',
  'Care Coordinator', 'Health Navigator', 'Care Navigator',
  // Admin & Coordination
  'Medical Secretary', 'Patient Pathway Coordinator', 'Clinic Coordinator',
  'Ward Clerk', 'Admissions Officer', 'Referral Management Officer',
  // Specialist Support
  'Dementia Support Worker', 'Learning Disability Support Worker',
  'Autism Support Worker', 'Safeguarding Assistant', 'Infection Control Assistant',
  'Clinical Audit Assistant', 'Patient Safety Assistant', 'Senior Clinical Support Worker'
]

export const ROLE_CATEGORIES = {
  clinical: {
    label: 'Clinical Support',
    roles: ['Healthcare Assistant','Clinical Support Worker','Phlebotomist','Maternity Support Worker','Theatre Support Worker','Operating Department Assistant','Outpatient Support Worker','ECG Cardiology Assistant','Endoscopy Support Worker','Radiology Imaging Assistant','Pathology Laboratory Assistant']
  },
  therapy: {
    label: 'Therapy & Rehab',
    roles: ['Physiotherapy Assistant','Occupational Therapy Assistant','Rehabilitation Assistant','Speech Language Therapy Assistant','Assistant Practitioner','Senior Clinical Support Worker']
  },
  mental_health: {
    label: 'Mental Health & Recovery',
    roles: ['Mental Health Support Worker','Recovery Worker','Crisis Team Support Worker','Substance Misuse Support Worker']
  },
  community: {
    label: 'Community & Discharge',
    roles: ['Community Support Worker','Community Healthcare Assistant','Discharge Coordinator','Discharge Support Worker','Reablement Support Worker','Integrated Care Support Worker','Care Coordinator','Health Navigator','Care Navigator']
  },
  admin: {
    label: 'Admin & Coordination',
    roles: ['Medical Secretary','Patient Pathway Coordinator','Clinic Coordinator','Ward Clerk','Admissions Officer','Referral Management Officer']
  },
  specialist: {
    label: 'Specialist Support',
    roles: ['Dementia Support Worker','Learning Disability Support Worker','Autism Support Worker','Safeguarding Assistant','Infection Control Assistant','Clinical Audit Assistant','Patient Safety Assistant']
  }
}

export const SECTORS = {
  nhs_hospital: {
    label: 'NHS Hospital', short: 'NHS Hospital',
    confidence: 'High', priority: 1,
    color: '#0C447C', bg: '#E6F1FB',
    confColor: '#085041', confBg: '#E1F5EE'
  },
  nhs_community: {
    label: 'NHS Community', short: 'NHS Community',
    confidence: 'High', priority: 2,
    color: '#0C447C', bg: '#E6F1FB',
    confColor: '#085041', confBg: '#E1F5EE'
  },
  specialist: {
    label: 'Specialist Provider', short: 'Specialist',
    confidence: 'High', priority: 3,
    color: '#633806', bg: '#FAEEDA',
    confColor: '#085041', confBg: '#E1F5EE'
  },
  private_health: {
    label: 'Private Healthcare', short: 'Private',
    confidence: 'Med–High', priority: 4,
    color: '#3C3489', bg: '#EEEDFE',
    confColor: '#3C3489', confBg: '#EEEDFE'
  },
  residential: {
    label: 'Residential Care', short: 'Residential',
    confidence: 'Very High', priority: 5,
    color: '#3B6D11', bg: '#EAF3DE',
    confColor: '#085041', confBg: '#C0DD97'
  },
  domiciliary: {
    label: 'Domiciliary Care', short: 'Domiciliary',
    confidence: 'Very High', priority: 6,
    color: '#3B6D11', bg: '#EAF3DE',
    confColor: '#085041', confBg: '#C0DD97'
  },
  local_authority: {
    label: 'Local Authority', short: 'Local Auth',
    confidence: 'Low–Med', priority: 7,
    color: '#5F5E5A', bg: '#F1EFE8',
    confColor: '#633806', confBg: '#FAEEDA'
  }
}

export const SEARCH_TERMS_SCOTLAND = [
  'healthcare assistant sponsorship scotland',
  'clinical support worker visa NHS scotland',
  'band 3 NHS scotland sponsorship',
  'mental health support worker visa scotland',
  'community support worker NHS sponsorship scotland',
  'phlebotomist NHS sponsorship scotland',
  'reablement support worker NHS scotland',
  'learning disability support worker visa scotland',
  'therapy assistant band 3 NHS scotland',
  'discharge coordinator NHS scotland'
]

export const SEARCH_TERMS_UK = [
  'healthcare assistant visa sponsorship UK',
  'clinical support worker sponsorship NHS',
  'band 3 care support worker sponsorship',
  'mental health support worker skilled worker visa',
  'community healthcare assistant sponsorship',
  'phlebotomist band 3 NHS sponsorship',
  'learning disability support worker sponsorship',
  'occupational therapy assistant NHS sponsorship',
  'recovery worker visa sponsorship UK',
  'displaced care worker sponsorship UK'
]

export const DIRECT_LINKS = [
  { label: 'NHS Scotland Jobs', url: 'https://www.jobs.scot.nhs.uk/search/?q=healthcare+assistant&location=Scotland', region: 'Scotland', sector: 'nhs_hospital' },
  { label: 'NHS Greater Glasgow & Clyde', url: 'https://jobs.nhsggc.scot/search/?q=band+3+support', region: 'Scotland', sector: 'nhs_hospital' },
  { label: 'NHS Lothian', url: 'https://www.nhslothian.scot/careers/', region: 'Scotland', sector: 'nhs_hospital' },
  { label: 'NHS Highland', url: 'https://www.nhshighland.scot.nhs.uk/jobs/', region: 'Scotland', sector: 'nhs_hospital' },
  { label: 'NHS Grampian', url: 'https://www.nhsgrampian.org/careers/', region: 'Scotland', sector: 'nhs_hospital' },
  { label: 'NHS Tayside', url: 'https://www.nhstayside.scot.nhs.uk/WorkingForUs/', region: 'Scotland', sector: 'nhs_hospital' },
  { label: 'myjobscotland', url: 'https://www.myjobscotland.gov.uk/search?keywords=care+support+worker&location=Scotland', region: 'Scotland', sector: 'local_authority' },
  { label: 'NHS Jobs England', url: 'https://www.jobs.nhs.uk/candidate/search?keyword=healthcare+assistant+sponsorship', region: 'England', sector: 'nhs_hospital' },
  { label: 'Reed Healthcare Scotland', url: 'https://www.reed.co.uk/jobs/healthcare-jobs?keywords=sponsorship+band+3&location=scotland', region: 'Scotland', sector: 'private_health' },
  { label: 'Priory Group Jobs', url: 'https://jobs.priorygroup.com/search/?q=support+worker&l=Scotland', region: 'Scotland', sector: 'specialist' },
  { label: 'Elysium Healthcare', url: 'https://www.elysiumhealthcare.co.uk/careers/', region: 'UK', sector: 'specialist' },
  { label: 'HC-One Careers', url: 'https://www.hc-one.co.uk/careers', region: 'UK', sector: 'residential' }
]

export const DEMO_JOBS = [
  { id:'d1', title:'Band 3 Healthcare Assistant', company:'NHS Greater Glasgow and Clyde', location:'Glasgow, Scotland', region:'Scotland', salary:'£24,336 – £26,021', band:'Band 3', posted_date:new Date(Date.now()-1.5*3600000).toISOString(), sponsorship:true, sector:'nhs_hospital', description:'We are seeking a compassionate Healthcare Assistant for our busy medical ward. Visa sponsorship available for eligible candidates. You will support registered nurses with patient care, vital signs monitoring, personal care and MDT communication using SBAR.', skills_match:['vital signs','SBAR','infection control','MDT'], redirect_url:'https://www.jobs.scot.nhs.uk' },
  { id:'d2', title:'Mental Health Support Worker', company:'Priory Group, Edinburgh', location:'Edinburgh, Scotland', region:'Scotland', salary:'£25,468 – £27,486', band:'Band 3', posted_date:new Date(Date.now()-4*3600000).toISOString(), sponsorship:true, displaced:true, sector:'specialist', description:'Join our mental health inpatient unit. We welcome displaced care workers and offer visa sponsorship. De-escalation, safeguarding, mental capacity act awareness and person-centred care experience required.', skills_match:['safeguarding','risk assessment','support planning','mental capacity act'], redirect_url:'https://jobs.priorygroup.com' },
  { id:'d3', title:'Phlebotomist – Band 3', company:'NHS Highland', location:'Inverness, Scotland', region:'Scotland', salary:'£24,336 – £26,021', band:'Band 3', posted_date:new Date(Date.now()-7*3600000).toISOString(), sponsorship:true, sector:'nhs_hospital', description:'NHS Highland recruiting Band 3 Phlebotomist. Skilled Worker visa sponsorship available. Perform venepuncture, maintain records, work within clinical team across Highland region.', skills_match:['phlebotomy','infection control','vital signs'], redirect_url:'https://www.jobs.scot.nhs.uk' },
  { id:'d4', title:'Reablement Support Worker', company:'Edinburgh City Council', location:'Edinburgh, Scotland', region:'Scotland', salary:'£23,500 – £25,000', band:'Band 3', posted_date:new Date(Date.now()-10*3600000).toISOString(), sponsorship:true, displaced:true, sector:'local_authority', description:'Join our reablement team helping adults regain independence post-discharge. Visa sponsorship available. Priority consideration given to displaced care workers. Person-centred approach and moving and handling experience essential.', skills_match:['person-centred care','community engagement','care planning','moving and handling'], redirect_url:'https://www.myjobscotland.gov.uk' },
  { id:'d5', title:'Senior Care Assistant', company:'HC-One Glasgow', location:'Glasgow, Scotland', region:'Scotland', salary:'£23,500 – £25,500', band:'Unspecified', posted_date:new Date(Date.now()-13*3600000).toISOString(), sponsorship:true, sector:'residential', description:'HC-One seeks Senior Care Assistant for our Glasgow nursing home. Sponsorship available. Medication administration including controlled drugs, dementia care, MAR charts and shift leadership experience required.', skills_match:['medication administration','dementia care','shift leadership','MAR charts'], redirect_url:'https://www.hc-one.co.uk/careers' },
  { id:'d6', title:'Community Healthcare Assistant', company:'NHS Lothian Community Services', location:'Edinburgh, Scotland', region:'Scotland', salary:'£24,336 – £26,021', band:'Band 3', posted_date:new Date(Date.now()-16*3600000).toISOString(), sponsorship:true, sector:'nhs_community', description:'Support district nursing and community rehab teams across Edinburgh. NHS Skilled Worker sponsorship available. Experience in community care settings, moving and handling, vital signs monitoring and care plan delivery.', skills_match:['community engagement','moving and handling','vital signs','care planning'], redirect_url:'https://www.jobs.scot.nhs.uk' },
  { id:'d7', title:'Learning Disability Support Worker', company:'Elysium Healthcare, Scotland', location:'Dundee, Scotland', region:'Scotland', salary:'£24,000 – £26,500', band:'Band 3', posted_date:new Date(Date.now()-20*3600000).toISOString(), sponsorship:true, sector:'specialist', description:'Elysium Healthcare recruiting learning disability support worker. Visa sponsorship available. Working within specialist residential unit supporting adults with complex learning disabilities and behaviours of concern.', skills_match:['mental capacity act','safeguarding','risk assessment','support planning'], redirect_url:'https://www.elysiumhealthcare.co.uk/careers' },
  { id:'d8', title:'Physiotherapy Assistant – Band 3', company:'NHS Grampian', location:'Aberdeen, Scotland', region:'Scotland', salary:'£24,336 – £26,021', band:'Band 3', posted_date:new Date(Date.now()-24*3600000).toISOString(), sponsorship:true, sector:'nhs_hospital', description:'NHS Grampian recruiting Band 3 Physiotherapy Assistant. Skilled Worker visa sponsorship considered. Support physiotherapists in delivering rehabilitation programmes across Aberdeen Royal Infirmary.', skills_match:['moving and handling','vital signs','MDT','person-centred care'], redirect_url:'https://www.nhsgrampian.org/careers' },
  { id:'d9', title:'Occupational Therapy Assistant', company:'NHS Lothian', location:'Edinburgh, Scotland', region:'Scotland', salary:'£24,336 – £26,021', band:'Band 3', posted_date:new Date(Date.now()-28*3600000).toISOString(), sponsorship:true, sector:'nhs_hospital', description:'Join NHS Lothian OT team as a Band 3 assistant. Visa sponsorship available. Support occupational therapists with patient assessments, home visits and discharge planning across Edinburgh hospitals.', skills_match:['care planning','MDT','person-centred care','community engagement'], redirect_url:'https://www.nhslothian.scot/careers' },
  { id:'d10', title:'Band 3 Mental Health Support Worker', company:'NHS West Yorkshire', location:'Leeds, England', region:'England', salary:'£24,071 – £25,674', band:'Band 3', posted_date:new Date(Date.now()-32*3600000).toISOString(), sponsorship:true, sector:'nhs_hospital', description:'Support workers needed for mental health crisis team. Skilled Worker sponsorship available. De-escalation, safeguarding and mental capacity act awareness essential. SBAR communication and MDT working required.', skills_match:['safeguarding','mental capacity act','support planning','risk assessment'], redirect_url:'https://www.jobs.nhs.uk' },
  { id:'d11', title:'Recovery Worker', company:'Turning Point Scotland', location:'Glasgow, Scotland', region:'Scotland', salary:'£23,000 – £25,000', band:'Unspecified', posted_date:new Date(Date.now()-36*3600000).toISOString(), sponsorship:true, displaced:true, sector:'specialist', description:'Turning Point Scotland recruiting Recovery Worker for substance misuse service. Sponsorship available for displaced workers. Supporting individuals through recovery journeys using strengths-based, person-centred approaches.', skills_match:['person-centred care','support planning','risk assessment','community engagement'], redirect_url:'https://www.turning-point.co.uk/jobs' },
  { id:'d12', title:'Discharge Support Worker', company:'NHS Greater Glasgow Community Health', location:'Glasgow, Scotland', region:'Scotland', salary:'£24,336 – £26,021', band:'Band 3', posted_date:new Date(Date.now()-40*3600000).toISOString(), sponsorship:true, sector:'nhs_community', description:'Support safe hospital discharge and community reablement across Greater Glasgow. NHS sponsorship available. Experience with discharge planning, MDT communication, SBAR and community care coordination essential.', skills_match:['care planning','community engagement','MDT','SBAR'], redirect_url:'https://jobs.nhsggc.scot' },
  { id:'d13', title:'Care Coordinator', company:'NHS Highland', location:'Inverness, Scotland', region:'Scotland', salary:'£25,468 – £27,486', band:'Band 4', posted_date:new Date(Date.now()-44*3600000).toISOString(), sponsorship:true, sector:'nhs_community', description:'Band 4 Care Coordinator for integrated community health team. Visa sponsorship available. Coordinate care packages, liaise with MDT, support discharge planning and manage referral pathways across Highland region.', skills_match:['care planning','MDT','community engagement','risk assessment'], redirect_url:'https://www.jobs.scot.nhs.uk' },
  { id:'d14', title:'Clinical Support Worker – Theatre', company:'Spire Healthcare Glasgow', location:'Glasgow, Scotland', region:'Scotland', salary:'£25,000 – £27,000', band:'Unspecified', posted_date:new Date(Date.now()-48*3600000).toISOString(), sponsorship:true, sector:'private_health', description:'Spire Healthcare recruiting Clinical Support Worker for our Glasgow theatre team. Sponsorship available. Supporting surgical procedures, maintaining sterile field, infection control compliance.', skills_match:['infection control','vital signs','MDT'], redirect_url:'https://www.spirehealthcare.com/careers' },
  { id:'d15', title:'Autism Support Worker', company:'Voyage Care, Scotland', location:'Edinburgh, Scotland', region:'Scotland', salary:'£23,500 – £25,000', band:'Unspecified', posted_date:new Date(Date.now()-52*3600000).toISOString(), sponsorship:true, displaced:true, sector:'specialist', description:'Voyage Care seeking experienced Autism Support Worker. Visa sponsorship available. Priority given to displaced care workers. Supporting adults with autism in residential and community settings using positive behaviour support approaches.', skills_match:['support planning','safeguarding','risk assessment','person-centred care'], redirect_url:'https://www.voyagecare.com/jobs' }
]
