export const ADZUNA_APP_ID = 'aeffba80'
export const ADZUNA_APP_KEY = 'e1e3823f98659c055704866fa71bd9f8'
export const CLAUDE_API_KEY = import.meta.env.VITE_CLAUDE_API_KEY || ''

export const REFRESH_INTERVAL = 15 * 60 * 1000 // 15 minutes
export const MAX_JOBS = 100 // cap job list
export const SEEN_EXPIRY_DAYS = 30 // auto-clean seen IDs older than 30 days

export const SECTORS = {
  nhs_hospital: { label: 'NHS Hospital', short: 'NHS Hospital', confidence: 'High', priority: 1, color: '#0C447C', bg: '#E6F1FB', confColor: '#085041', confBg: '#E1F5EE' },
  nhs_community: { label: 'NHS Community', short: 'NHS Community', confidence: 'High', priority: 2, color: '#0C447C', bg: '#E6F1FB', confColor: '#085041', confBg: '#E1F5EE' },
  specialist: { label: 'Specialist Provider', short: 'Specialist', confidence: 'High', priority: 3, color: '#633806', bg: '#FAEEDA', confColor: '#085041', confBg: '#E1F5EE' },
  private_health: { label: 'Private Healthcare', short: 'Private', confidence: 'Med–High', priority: 4, color: '#3C3489', bg: '#EEEDFE', confColor: '#3C3489', confBg: '#EEEDFE' },
  residential: { label: 'Residential Care', short: 'Residential', confidence: 'Very High', priority: 5, color: '#3B6D11', bg: '#EAF3DE', confColor: '#085041', confBg: '#C0DD97' },
  domiciliary: { label: 'Domiciliary Care', short: 'Domiciliary', confidence: 'Very High', priority: 6, color: '#3B6D11', bg: '#EAF3DE', confColor: '#085041', confBg: '#C0DD97' },
  local_authority: { label: 'Local Authority', short: 'Local Auth', confidence: 'Low–Med', priority: 7, color: '#5F5E5A', bg: '#F1EFE8', confColor: '#633806', confBg: '#FAEEDA' }
}

// All 40+ roles covered across 8 search term batches
export const SEARCH_TERMS = [
  // Batch 1 — Core clinical
  'healthcare assistant visa sponsorship UK',
  // Batch 2 — Clinical support
  'clinical support worker phlebotomist theatre maternity sponsorship',
  // Batch 3 — Therapy & rehab
  'physiotherapy occupational therapy speech language assistant sponsorship NHS',
  // Batch 4 — Mental health & recovery
  'mental health support worker recovery crisis substance misuse visa sponsorship',
  // Batch 5 — Community & discharge
  'community support worker reablement discharge coordinator care navigator sponsorship',
  // Batch 6 — Admin & coordination
  'medical secretary ward clerk patient pathway clinic coordinator admissions sponsorship NHS',
  // Batch 7 — Specialist support
  'dementia learning disability autism support worker visa sponsorship UK',
  // Batch 8 — Senior and band 3 roles
  'senior care assistant visa sponsorship UK',
  // Batch 9 — Support worker band 3
  'support worker band 3 sponsorship NHS',
]

export const DIRECT_LINKS = [
  { label: 'NHS Scotland Jobs', url: 'https://www.jobs.scot.nhs.uk/search/?q=healthcare+assistant', region: 'Scotland', sector: 'nhs_hospital' },
  { label: 'NHS Jobs England', url: 'https://www.jobs.nhs.uk/candidate/search?keyword=healthcare+assistant+sponsorship', region: 'England', sector: 'nhs_hospital' },
  { label: 'NHS Greater Glasgow & Clyde', url: 'https://jobs.nhsggc.scot/search/?q=band+3+support', region: 'Scotland', sector: 'nhs_hospital' },
  { label: 'NHS Lothian', url: 'https://www.nhslothian.scot/careers/', region: 'Scotland', sector: 'nhs_hospital' },
  { label: 'NHS Highland', url: 'https://www.nhshighland.scot.nhs.uk/jobs/', region: 'Scotland', sector: 'nhs_hospital' },
  { label: 'NHS Grampian', url: 'https://www.nhsgrampian.org/careers/', region: 'Scotland', sector: 'nhs_hospital' },
  { label: 'NHS Tayside', url: 'https://www.nhstayside.scot.nhs.uk/WorkingForUs/', region: 'Scotland', sector: 'nhs_hospital' },
  { label: 'NHS Lanarkshire', url: 'https://www.nhslanarkshire.scot.nhs.uk/work-with-us/', region: 'Scotland', sector: 'nhs_hospital' },
  { label: 'NHS Ayrshire & Arran', url: 'https://www.nhsaaa.net/work-with-us/', region: 'Scotland', sector: 'nhs_hospital' },
  { label: 'myjobscotland', url: 'https://www.myjobscotland.gov.uk/search?keywords=care+support+worker&location=Scotland', region: 'Scotland', sector: 'local_authority' },
  { label: 'Local Government Jobs', url: 'https://www.lgjobs.com/jobs?keywords=care+support+worker', region: 'England', sector: 'local_authority' },
  { label: 'Spire Healthcare', url: 'https://www.spirehealthcare.com/careers/', region: 'UK', sector: 'private_health' },
  { label: 'Circle Health Group', url: 'https://www.circlehealthgroup.co.uk/careers', region: 'UK', sector: 'private_health' },
  { label: 'Ramsay Health Care', url: 'https://www.ramsayhealth.co.uk/careers', region: 'UK', sector: 'private_health' },
  { label: 'Nuffield Health', url: 'https://www.nuffieldhealth.com/careers', region: 'UK', sector: 'private_health' },
  { label: 'Bupa Hospitals', url: 'https://careers.bupa.co.uk/', region: 'UK', sector: 'private_health' },
  { label: 'HCA Healthcare UK', url: 'https://careers.hcahealthcare.co.uk/', region: 'UK', sector: 'private_health' },
  { label: 'Practice Plus Group', url: 'https://practiceplusgroup.com/careers/', region: 'UK', sector: 'private_health' },
  { label: 'BMI Healthcare', url: 'https://www.bmihealthcare.co.uk/careers', region: 'UK', sector: 'private_health' },
  { label: 'Priory Group', url: 'https://jobs.priorygroup.com/search/?q=support+worker', region: 'UK', sector: 'specialist' },
  { label: 'Elysium Healthcare', url: 'https://www.elysiumhealthcare.co.uk/careers/', region: 'UK', sector: 'specialist' },
  { label: 'Voyage Care', url: 'https://www.voyagecare.com/jobs/', region: 'UK', sector: 'specialist' },
  { label: 'Cygnet Health Care', url: 'https://www.cygnetgroup.com/careers/', region: 'UK', sector: 'specialist' },
  { label: 'CareTech', url: 'https://www.caretech.co.uk/careers/', region: 'UK', sector: 'specialist' },
  { label: 'Outcomes First Group', url: 'https://www.outcomesfirstgroup.co.uk/careers/', region: 'UK', sector: 'specialist' },
  { label: 'Turning Point', url: 'https://www.turning-point.co.uk/jobs/', region: 'UK', sector: 'specialist' },
  { label: 'Rethink Mental Illness', url: 'https://www.rethink.org/get-involved/work-for-us/', region: 'UK', sector: 'specialist' },
  { label: 'Mencap', url: 'https://www.mencap.org.uk/about-mencap/careers', region: 'UK', sector: 'specialist' },
  { label: 'Scope', url: 'https://www.scope.org.uk/get-involved/jobs/', region: 'UK', sector: 'specialist' },
  { label: 'Leonard Cheshire', url: 'https://www.leonardcheshire.org/get-involved/careers', region: 'UK', sector: 'specialist' },
  { label: 'Penumbra (Scotland)', url: 'https://www.penumbra.org.uk/about/vacancies/', region: 'Scotland', sector: 'specialist' },
  { label: 'CrossReach (Scotland)', url: 'https://www.crossreach.org.uk/work-us/current-vacancies', region: 'Scotland', sector: 'specialist' },
  { label: 'Cornerstone (Scotland)', url: 'https://www.cornerstone.org.uk/careers/', region: 'Scotland', sector: 'specialist' },
  { label: 'Support in Mind Scotland', url: 'https://www.supportinmindscotland.org.uk/about-us/work-with-us/', region: 'Scotland', sector: 'specialist' },
  { label: 'HC-One', url: 'https://www.hc-one.co.uk/careers/', region: 'UK', sector: 'residential' },
  { label: 'Barchester Healthcare', url: 'https://www.barchester.com/careers', region: 'UK', sector: 'residential' },
  { label: 'Care UK', url: 'https://www.careuk.com/careers', region: 'UK', sector: 'residential' },
  { label: 'Four Seasons Health Care', url: 'https://www.fshc.co.uk/careers/', region: 'UK', sector: 'residential' },
  { label: 'Bupa Care Homes', url: 'https://careers.bupa.co.uk/care-homes', region: 'UK', sector: 'residential' },
  { label: 'Renaissance Care (Scotland)', url: 'https://www.renaissance-care.co.uk/careers/', region: 'Scotland', sector: 'residential' },
  { label: 'Meallmore (Scotland)', url: 'https://www.meallmore.co.uk/careers/', region: 'Scotland', sector: 'residential' },
  { label: 'Erskine (Scotland)', url: 'https://www.erskine.org.uk/about/careers/', region: 'Scotland', sector: 'residential' },
  { label: 'Bluebird Care', url: 'https://www.bluebirdcare.co.uk/careers', region: 'UK', sector: 'domiciliary' },
  { label: 'Home Instead', url: 'https://www.homeinstead.co.uk/careers/', region: 'UK', sector: 'domiciliary' },
  { label: 'Right at Home', url: 'https://www.rightathome.co.uk/careers/', region: 'UK', sector: 'domiciliary' },
  { label: 'Helping Hands', url: 'https://www.helpinghands.co.uk/careers/', region: 'UK', sector: 'domiciliary' },
  { label: 'Mears Care', url: 'https://www.mearsgroup.co.uk/careers/', region: 'UK', sector: 'domiciliary' },
  { label: 'Cera Care', url: 'https://ceracare.co.uk/careers/', region: 'UK', sector: 'domiciliary' },
  { label: 'Allied Healthcare', url: 'https://www.alliedhealthcare.co.uk/careers/', region: 'UK', sector: 'domiciliary' },
  { label: 'Hays Healthcare', url: 'https://www.hays.co.uk/healthcare-jobs', region: 'UK', sector: 'private_health' },
  { label: 'Medacs Healthcare', url: 'https://www.medacs.com/jobs/', region: 'UK', sector: 'private_health' },
  { label: 'Pulse Jobs', url: 'https://www.pulsejobs.com/jobs/', region: 'UK', sector: 'private_health' },
  { label: 'Your World Healthcare', url: 'https://www.yourworldhealthcare.com/jobs/', region: 'UK', sector: 'private_health' },
  { label: 'Randstad Care', url: 'https://www.randstad.co.uk/jobs/care/', region: 'UK', sector: 'private_health' },
  { label: 'NHS Professionals', url: 'https://www.nhsprofessionals.nhs.uk/join-nhsp', region: 'UK', sector: 'nhs_hospital' },
  { label: 'Reed Healthcare', url: 'https://www.reed.co.uk/jobs/healthcare-jobs?keywords=sponsorship+band+3', region: 'UK', sector: 'private_health' },
  { label: 'Indeed UK Care Jobs', url: 'https://uk.indeed.com/jobs?q=care+support+worker+visa+sponsorship', region: 'UK', sector: 'private_health' },
  { label: 'Totaljobs Healthcare', url: 'https://www.totaljobs.com/jobs/healthcare?keywords=sponsorship', region: 'UK', sector: 'private_health' },
  { label: 'CV-Library Healthcare', url: 'https://www.cv-library.co.uk/search-jobs?q=healthcare+assistant+sponsorship', region: 'UK', sector: 'private_health' },
]

export const DEMO_JOBS = [
  { id:'d1', title:'Band 3 Healthcare Assistant', company:'NHS Greater Glasgow and Clyde', location:'Glasgow, Scotland', region:'Scotland', salary:'£24,336 – £26,021', band:'Band 3', posted_date:new Date(Date.now()-1.5*3600000).toISOString(), sponsorship:true, sector:'nhs_hospital', description:'We are seeking a compassionate Healthcare Assistant for our busy medical ward. Visa sponsorship available for eligible candidates. You will support registered nurses with patient care, vital signs monitoring, personal care and MDT communication using SBAR.', skills_match:['vital signs','SBAR','infection control','MDT'], redirect_url:'https://www.jobs.scot.nhs.uk' },
  { id:'d2', title:'Mental Health Support Worker', company:'Priory Group Edinburgh', location:'Edinburgh, Scotland', region:'Scotland', salary:'£25,468 – £27,486', band:'Band 3', posted_date:new Date(Date.now()-4*3600000).toISOString(), sponsorship:true, displaced:true, sector:'specialist', description:'Join our mental health inpatient unit. We welcome displaced care workers and offer visa sponsorship. De-escalation, safeguarding, mental capacity act awareness and person-centred care experience required.', skills_match:['safeguarding','risk assessment','support planning','mental capacity act'], redirect_url:'https://jobs.priorygroup.com' },
  { id:'d3', title:'Phlebotomist Band 3', company:'NHS Highland', location:'Inverness, Scotland', region:'Scotland', salary:'£24,336 – £26,021', band:'Band 3', posted_date:new Date(Date.now()-7*3600000).toISOString(), sponsorship:true, sector:'nhs_hospital', description:'NHS Highland recruiting Band 3 Phlebotomist. Skilled Worker visa sponsorship available. Perform venepuncture, maintain records, work within clinical team.', skills_match:['phlebotomy','infection control','vital signs'], redirect_url:'https://www.jobs.scot.nhs.uk' },
  { id:'d4', title:'Reablement Support Worker', company:'Edinburgh City Council', location:'Edinburgh, Scotland', region:'Scotland', salary:'£23,500 – £25,000', band:'Band 3', posted_date:new Date(Date.now()-10*3600000).toISOString(), sponsorship:true, displaced:true, sector:'local_authority', description:'Join our reablement team. Visa sponsorship available. Priority consideration given to displaced care workers.', skills_match:['person-centred care','community engagement','care planning','moving and handling'], redirect_url:'https://www.myjobscotland.gov.uk' },
  { id:'d5', title:'Senior Care Assistant', company:'HC-One Glasgow', location:'Glasgow, Scotland', region:'Scotland', salary:'£23,500 – £25,500', band:'Unspecified', posted_date:new Date(Date.now()-13*3600000).toISOString(), sponsorship:true, sector:'residential', description:'HC-One seeks Senior Care Assistant. Sponsorship available. Medication administration, dementia care, MAR charts and shift leadership experience required.', skills_match:['medication administration','dementia care','shift leadership','MAR charts'], redirect_url:'https://www.hc-one.co.uk/careers' },
  { id:'d6', title:'Community Healthcare Assistant', company:'NHS Lothian Community Services', location:'Edinburgh, Scotland', region:'Scotland', salary:'£24,336 – £26,021', band:'Band 3', posted_date:new Date(Date.now()-16*3600000).toISOString(), sponsorship:true, sector:'nhs_community', description:'Support district nursing and community rehab teams. NHS Skilled Worker sponsorship available.', skills_match:['community engagement','moving and handling','vital signs','care planning'], redirect_url:'https://www.jobs.scot.nhs.uk' },
  { id:'d7', title:'Learning Disability Support Worker', company:'Elysium Healthcare Dundee', location:'Dundee, Scotland', region:'Scotland', salary:'£24,000 – £26,500', band:'Band 3', posted_date:new Date(Date.now()-20*3600000).toISOString(), sponsorship:true, sector:'specialist', description:'Elysium Healthcare recruiting learning disability support worker. Visa sponsorship available.', skills_match:['mental capacity act','safeguarding','risk assessment','support planning'], redirect_url:'https://www.elysiumhealthcare.co.uk/careers' },
  { id:'d8', title:'Physiotherapy Assistant Band 3', company:'NHS Grampian', location:'Aberdeen, Scotland', region:'Scotland', salary:'£24,336 – £26,021', band:'Band 3', posted_date:new Date(Date.now()-24*3600000).toISOString(), sponsorship:true, sector:'nhs_hospital', description:'NHS Grampian recruiting Band 3 Physiotherapy Assistant. Skilled Worker visa sponsorship considered.', skills_match:['moving and handling','vital signs','MDT','person-centred care'], redirect_url:'https://www.nhsgrampian.org/careers' },
  { id:'d9', title:'Theatre Support Worker', company:'Spire Healthcare Manchester', location:'Manchester, England', region:'England', salary:'£25,000 – £27,000', band:'Unspecified', posted_date:new Date(Date.now()-26*3600000).toISOString(), sponsorship:true, sector:'private_health', description:'Spire Healthcare recruiting Theatre Support Worker. Sponsorship available. Supporting surgical procedures, maintaining sterile field, infection control compliance.', skills_match:['infection control','vital signs','MDT'], redirect_url:'https://www.spirehealthcare.com/careers' },
  { id:'d10', title:'Band 3 Mental Health Support Worker', company:'NHS West Yorkshire', location:'Leeds, England', region:'England', salary:'£24,071 – £25,674', band:'Band 3', posted_date:new Date(Date.now()-30*3600000).toISOString(), sponsorship:true, sector:'nhs_hospital', description:'Support workers needed for mental health crisis team. Skilled Worker sponsorship available.', skills_match:['safeguarding','mental capacity act','support planning','risk assessment'], redirect_url:'https://www.jobs.nhs.uk' },
  { id:'d11', title:'Home Care Worker', company:'Bluebird Care Aberdeen', location:'Aberdeen, Scotland', region:'Scotland', salary:'£22,500 – £24,000', band:'Unspecified', posted_date:new Date(Date.now()-34*3600000).toISOString(), sponsorship:true, displaced:true, sector:'domiciliary', description:'Domiciliary care provider seeking home care workers. Sponsorship available. Displaced workers strongly encouraged to apply.', skills_match:['person-centred care','care planning','moving and handling'], redirect_url:'https://www.bluebirdcare.co.uk/careers' },
  { id:'d12', title:'Discharge Support Worker', company:'NHS Greater Glasgow Community Health', location:'Glasgow, Scotland', region:'Scotland', salary:'£24,336 – £26,021', band:'Band 3', posted_date:new Date(Date.now()-38*3600000).toISOString(), sponsorship:true, sector:'nhs_community', description:'Support hospital discharge pathways and community reablement. NHS sponsorship available.', skills_match:['care planning','community engagement','MDT','SBAR'], redirect_url:'https://jobs.nhsggc.scot' },
  { id:'d13', title:'Recovery Worker', company:'Turning Point Wales', location:'Cardiff, Wales', region:'Wales', salary:'£23,000 – £25,000', band:'Unspecified', posted_date:new Date(Date.now()-42*3600000).toISOString(), sponsorship:true, displaced:true, sector:'specialist', description:'Turning Point Wales recruiting Recovery Worker. Sponsorship available for displaced workers.', skills_match:['person-centred care','support planning','risk assessment','community engagement'], redirect_url:'https://www.turning-point.co.uk/jobs' },
  { id:'d14', title:'Autism Support Worker', company:'Voyage Care Birmingham', location:'Birmingham, England', region:'England', salary:'£23,500 – £25,000', band:'Unspecified', posted_date:new Date(Date.now()-46*3600000).toISOString(), sponsorship:true, displaced:true, sector:'specialist', description:'Voyage Care seeking Autism Support Worker. Visa sponsorship available. Priority given to displaced care workers.', skills_match:['support planning','safeguarding','risk assessment','person-centred care'], redirect_url:'https://www.voyagecare.com/jobs' },
  { id:'d15', title:'Care Coordinator Band 4', company:'NHS Highland', location:'Inverness, Scotland', region:'Scotland', salary:'£25,468 – £27,486', band:'Band 4', posted_date:new Date(Date.now()-50*3600000).toISOString(), sponsorship:true, sector:'nhs_community', description:'Band 4 Care Coordinator for integrated community health team. Visa sponsorship available.', skills_match:['care planning','MDT','community engagement','risk assessment'], redirect_url:'https://www.jobs.scot.nhs.uk' },
  { id:'d16', title:'Medical Secretary', company:'NHS Lothian', location:'Edinburgh, Scotland', region:'Scotland', salary:'£24,336 – £26,021', band:'Band 3', posted_date:new Date(Date.now()-54*3600000).toISOString(), sponsorship:true, sector:'nhs_hospital', description:'NHS Lothian recruiting Medical Secretary Band 3. Skilled Worker visa sponsorship available. Audio typing, appointment management and patient pathway coordination.', skills_match:['care planning','MDT'], redirect_url:'https://www.jobs.scot.nhs.uk' },
  { id:'d17', title:'Occupational Therapy Assistant', company:'NHS Grampian', location:'Aberdeen, Scotland', region:'Scotland', salary:'£24,336 – £26,021', band:'Band 3', posted_date:new Date(Date.now()-58*3600000).toISOString(), sponsorship:true, sector:'nhs_hospital', description:'NHS Grampian OT department recruiting Band 3 assistant. Visa sponsorship available. Support OTs with assessments and home visits.', skills_match:['person-centred care','community engagement','MDT'], redirect_url:'https://www.nhsgrampian.org/careers' },
  { id:'d18', title:'Dementia Support Worker', company:'Barchester Healthcare', location:'Birmingham, England', region:'England', salary:'£23,000 – £25,000', band:'Unspecified', posted_date:new Date(Date.now()-62*3600000).toISOString(), sponsorship:true, sector:'residential', description:'Barchester Healthcare seeking Dementia Support Worker. Visa sponsorship available. Person-centred dementia care in residential setting.', skills_match:['dementia care','person-centred care','medication administration','safeguarding'], redirect_url:'https://www.barchester.com/careers' },
]
