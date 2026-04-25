export function classifySector(title = '', company = '', description = '') {
  const all = (title + ' ' + company + ' ' + description).toLowerCase()

  const match = (keywords) => keywords.some(k => all.includes(k))

  if (match(['nhs greater glasgow','nhs lothian','nhs highland','nhs grampian','nhs tayside','nhs fife','nhs borders','nhs dumfries','nhs ayrshire','nhs lanarkshire','royal infirmary','university hospital','general hospital','nhs foundation trust','nhs trust','acute trust','nhs acute'])) return 'nhs_hospital'
  if (match(['nhs community','district nursing','community health team','community nhs','community rehab','discharge pathway','reablement','community services','integrated care board','community physiotherapy','community occupational'])) return 'nhs_community'
  if (match(['priory','elysium','voyage care','turning point','mind ','rethink','together for mental','cygnet','cambian','mencap','scope','leonard cheshire','action for children','crossreach','cornerstone','alba care','penumbra','support in mind'])) return 'specialist'
  if (match(['spire healthcare','circle health','ramsay health','nuffield health','bupa hospital','bmi hospital','hca healthcare','kingsbridge','ross hall','beardmore'])) return 'private_health'
  if (match(['hc-one','barchester','care uk','four seasons','renaissance care','bupa care','caledonian','orders of st john','erskine','advinia','silver healthcare','meallmore'])) return 'residential'
  if (match(['home care','domiciliary','home instead','right at home','care at home','bluebird care','helping hands','mears care','comfort keepers','visiting care'])) return 'domiciliary'
  if (match(['city council','county council','local authority','myjobscotland','council care','social work department','adult social care','public sector','local government'])) return 'local_authority'

  // Fallback by description signals
  if (all.includes('nhs') && match(['hospital','ward','acute','surgical','theatre','inpatient','outpatient','clinic'])) return 'nhs_hospital'
  if (all.includes('nhs') && match(['community','district','reablement','discharge','rehab team'])) return 'nhs_community'
  if (all.includes('nhs')) return 'nhs_hospital'
  if (match(['mental health','learning disab','autism']) && match(['inpatient','residential','rehab','specialist'])) return 'specialist'
  if (match(['care home','nursing home','residential care'])) return 'residential'
  if (match(['domiciliary','home visits','personal care in the community'])) return 'domiciliary'
  if (match(['council','local authority'])) return 'local_authority'

  return 'nhs_hospital'
}

export function detectRegion(locationStr = '') {
  const loc = locationStr.toLowerCase()
  const scotlandTerms = ['scotland','glasgow','edinburgh','aberdeen','inverness','dundee','lothian','fife','highland','grampian','lanarkshire','ayrshire','tayside','stirling','perth','falkirk','paisley','kilmarnock']
  const walesTerms = ['wales','cardiff','swansea','newport','wrexham','bangor','caerphilly','bridgend']
  if (scotlandTerms.some(t => loc.includes(t))) return 'Scotland'
  if (walesTerms.some(t => loc.includes(t))) return 'Wales'
  return 'England'
}

export function detectDisplaced(description = '') {
  const d = description.toLowerCase()
  return d.includes('displaced') || d.includes('licence revok') || d.includes('license revok') || d.includes('sponsorship revok') || d.includes('priority consideration for') || d.includes('displaced worker') || d.includes('visa revoked')
}

export function detectBand(title = '') {
  const t = title.toLowerCase()
  if (t.includes('band 4') || t.includes('band4')) return 'Band 4'
  if (t.includes('band 3') || t.includes('band3')) return 'Band 3'
  return 'Unspecified'
}
