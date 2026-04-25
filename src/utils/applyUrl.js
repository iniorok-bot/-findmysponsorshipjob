// Smart URL builder — maps employer names to their careers search URL patterns
// Falls back to a Google search for the job if no pattern matched
 
const EMPLOYER_PATTERNS = [
  // NHS
  { match: ['nhs greater glasgow', 'nhsggc'], url: (title) => `https://jobs.nhsggc.scot/search/?q=${enc(title)}` },
  { match: ['nhs lothian'], url: (title) => `https://www.nhslothian.scot/careers/?q=${enc(title)}` },
  { match: ['nhs highland'], url: (title) => `https://www.jobs.scot.nhs.uk/search/?q=${enc(title)}&location=Highland` },
  { match: ['nhs grampian'], url: (title) => `https://www.jobs.scot.nhs.uk/search/?q=${enc(title)}&location=Grampian` },
  { match: ['nhs tayside'], url: (title) => `https://www.jobs.scot.nhs.uk/search/?q=${enc(title)}&location=Tayside` },
  { match: ['nhs lanarkshire'], url: (title) => `https://www.jobs.scot.nhs.uk/search/?q=${enc(title)}&location=Lanarkshire` },
  { match: ['nhs ayrshire'], url: (title) => `https://www.jobs.scot.nhs.uk/search/?q=${enc(title)}&location=Ayrshire` },
  { match: ['nhs fife'], url: (title) => `https://www.jobs.scot.nhs.uk/search/?q=${enc(title)}&location=Fife` },
  { match: ['nhs borders'], url: (title) => `https://www.jobs.scot.nhs.uk/search/?q=${enc(title)}&location=Borders` },
  { match: ['nhs scotland', 'scot.nhs'], url: (title) => `https://www.jobs.scot.nhs.uk/search/?q=${enc(title)}` },
  { match: ['nhs'], url: (title) => `https://www.jobs.nhs.uk/candidate/search?keyword=${enc(title)}` },
  // Private Healthcare
  { match: ['spire'], url: (title) => `https://www.spirehealthcare.com/careers/search/?q=${enc(title)}` },
  { match: ['circle health'], url: (title) => `https://www.circlehealthgroup.co.uk/careers?search=${enc(title)}` },
  { match: ['ramsay'], url: (title) => `https://www.ramsayhealth.co.uk/careers?q=${enc(title)}` },
  { match: ['nuffield'], url: (title) => `https://www.nuffieldhealth.com/careers?q=${enc(title)}` },
  { match: ['bupa hospital', 'bupa hosp'], url: (title) => `https://careers.bupa.co.uk/search?q=${enc(title)}` },
  { match: ['hca healthcare', 'hca uk'], url: (title) => `https://careers.hcahealthcare.co.uk/search?q=${enc(title)}` },
  { match: ['practice plus'], url: (title) => `https://practiceplusgroup.com/careers/?s=${enc(title)}` },
  { match: ['bmi healthcare', 'bmi hosp'], url: (title) => `https://www.bmihealthcare.co.uk/careers?q=${enc(title)}` },
  // Specialist Providers
  { match: ['priory'], url: (title) => `https://jobs.priorygroup.com/search/?q=${enc(title)}` },
  { match: ['elysium'], url: (title) => `https://www.elysiumhealthcare.co.uk/careers/?s=${enc(title)}` },
  { match: ['voyage care'], url: (title) => `https://www.voyagecare.com/jobs/?s=${enc(title)}` },
  { match: ['cygnet'], url: (title) => `https://www.cygnetgroup.com/careers/?s=${enc(title)}` },
  { match: ['caretech'], url: (title) => `https://www.caretech.co.uk/careers/?s=${enc(title)}` },
  { match: ['outcomes first'], url: (title) => `https://www.outcomesfirstgroup.co.uk/careers/?s=${enc(title)}` },
  { match: ['turning point'], url: (title) => `https://www.turning-point.co.uk/jobs/?s=${enc(title)}` },
  { match: ['rethink'], url: (title) => `https://www.rethink.org/get-involved/work-for-us/?s=${enc(title)}` },
  { match: ['mencap'], url: (title) => `https://www.mencap.org.uk/about-mencap/careers?q=${enc(title)}` },
  { match: ['scope'], url: (title) => `https://www.scope.org.uk/get-involved/jobs/?s=${enc(title)}` },
  { match: ['leonard cheshire'], url: (title) => `https://www.leonardcheshire.org/get-involved/careers?s=${enc(title)}` },
  { match: ['penumbra'], url: (title) => `https://www.penumbra.org.uk/about/vacancies/?s=${enc(title)}` },
  { match: ['crossreach'], url: (title) => `https://www.crossreach.org.uk/work-us/current-vacancies?s=${enc(title)}` },
  { match: ['cornerstone'], url: (title) => `https://www.cornerstone.org.uk/careers/?s=${enc(title)}` },
  { match: ['support in mind'], url: (title) => `https://www.supportinmindscotland.org.uk/about-us/work-with-us/?s=${enc(title)}` },
  // Residential Care
  { match: ['hc-one', 'hc one'], url: (title) => `https://www.hc-one.co.uk/careers/?s=${enc(title)}` },
  { match: ['barchester'], url: (title) => `https://www.barchester.com/careers?q=${enc(title)}` },
  { match: ['care uk'], url: (title) => `https://www.careuk.com/careers?q=${enc(title)}` },
  { match: ['four seasons'], url: (title) => `https://www.fshc.co.uk/careers/?s=${enc(title)}` },
  { match: ['bupa care'], url: (title) => `https://careers.bupa.co.uk/search?q=${enc(title)}&category=care-homes` },
  { match: ['renaissance care'], url: (title) => `https://www.renaissance-care.co.uk/careers/?s=${enc(title)}` },
  { match: ['meallmore'], url: (title) => `https://www.meallmore.co.uk/careers/?s=${enc(title)}` },
  { match: ['erskine'], url: (title) => `https://www.erskine.org.uk/about/careers/?s=${enc(title)}` },
  // Domiciliary Care
  { match: ['bluebird'], url: (title) => `https://www.bluebirdcare.co.uk/careers?q=${enc(title)}` },
  { match: ['home instead'], url: (title) => `https://www.homeinstead.co.uk/careers/?s=${enc(title)}` },
  { match: ['right at home'], url: (title) => `https://www.rightathome.co.uk/careers/?s=${enc(title)}` },
  { match: ['helping hands'], url: (title) => `https://www.helpinghands.co.uk/careers/?s=${enc(title)}` },
  { match: ['mears'], url: (title) => `https://www.mearsgroup.co.uk/careers/?s=${enc(title)}` },
  { match: ['cera care'], url: (title) => `https://ceracare.co.uk/careers/?s=${enc(title)}` },
  { match: ['allied healthcare'], url: (title) => `https://www.alliedhealthcare.co.uk/careers/?s=${enc(title)}` },
  // Agencies
  { match: ['hays'], url: (title) => `https://www.hays.co.uk/jobs/search?q=${enc(title)}&industry=healthcare` },
  { match: ['medacs'], url: (title) => `https://www.medacs.com/jobs/?s=${enc(title)}` },
  { match: ['pulse jobs', 'pulse healthcare'], url: (title) => `https://www.pulsejobs.com/jobs/?s=${enc(title)}` },
  { match: ['your world'], url: (title) => `https://www.yourworldhealthcare.com/jobs/?s=${enc(title)}` },
  { match: ['randstad'], url: (title) => `https://www.randstad.co.uk/jobs/?q=${enc(title)}&industry=care` },
  { match: ['nhs professionals'], url: (title) => `https://www.nhsprofessionals.nhs.uk/join-nhsp` },
  // Job Boards
  { match: ['reed'], url: (title) => `https://www.reed.co.uk/jobs/${enc(title)}-jobs` },
  { match: ['indeed'], url: (title) => `https://uk.indeed.com/jobs?q=${enc(title)}+visa+sponsorship&l=United+Kingdom` },
  { match: ['totaljobs'], url: (title) => `https://www.totaljobs.com/jobs/${enc(title)}?keywords=${enc(title)}` },
  { match: ['cv-library', 'cv library'], url: (title) => `https://www.cv-library.co.uk/search-jobs?q=${enc(title)}` },
  // Local Authority
  { match: ['city council', 'county council', 'council'], url: (title) => `https://www.myjobscotland.gov.uk/search?keywords=${enc(title)}` },
  { match: ['myjobscotland'], url: (title) => `https://www.myjobscotland.gov.uk/search?keywords=${enc(title)}` },
]
 
function enc(str) {
  return encodeURIComponent((str || '').toLowerCase().trim())
}
 
export function buildApplyUrl(job) {
  const company = (job.company || '').toLowerCase()
  const title = (job.title || '').replace(/band\s*\d/gi, '').trim()
 
  // Try to match employer pattern
  for (const pattern of EMPLOYER_PATTERNS) {
    if (pattern.match.some(m => company.includes(m))) {
      return pattern.url(title)
    }
  }
 
  // Fallback — Google job search for this specific role and company
  const query = `${title} ${job.company} jobs visa sponsorship`
  return `https://www.google.com/search?q=${encodeURIComponent(query)}`
}
 
