import type {
  Classification,
  DetectedUrl,
  Indicator,
  IndicatorCategory,
  RiskLevel,
} from './types'

interface Rule {
  category: Exclude<IndicatorCategory, 'link'>
  title: string
  description: string
  weight: number
  patterns: RegExp[]
}

const RULES: Rule[] = [
  {
    category: 'credentials',
    title: 'Requests sensitive information',
    description:
      'Asks for an OTP, password, PIN, card number or account details. Legitimate organisations never ask you to share these by message.',
    weight: 3,
    patterns: [
      /\botps?\b/gi,
      /\bone[- ]time (?:pass(?:word|code)|pin)\b/gi,
      /\bpass(?:word|code)s?\b/gi,
      /\bpin\b/gi,
      /\bcvv\b/gi,
      /\bcard (?:number|details)\b/gi,
      /\bbank (?:details|account details)\b/gi,
      /\blogin (?:details|credentials)\b/gi,
      /\bverify (?:your )?(?:account|details|identity|information)\b/gi,
      /\bconfirm (?:your )?(?:account|details|identity)\b/gi,
      /\bupdate (?:your )?(?:kyc|account|details)\b/gi,
      /\bkyc\b/gi,
    ],
  },
  {
    category: 'urgency',
    title: 'Creates urgency or pressure',
    description:
      'Uses pressure tactics like deadlines or "act now" language to stop you from thinking carefully.',
    weight: 2,
    patterns: [
      /\burgent(?:ly)?\b/gi,
      /\bimmediately\b/gi,
      /\bact now\b/gi,
      /\bright away\b/gi,
      /\basap\b/gi,
      /\bwithin \d+ (?:hours?|hrs?|minutes?|mins?)\b/gi,
      /\bfinal (?:notice|warning|reminder)\b/gi,
      /\blast chance\b/gi,
      /\bexpires? (?:today|soon|tonight)\b/gi,
      /\blimited time\b/gi,
    ],
  },
  {
    category: 'threat',
    title: 'Threatens account loss or penalties',
    description:
      'Claims your account will be blocked, suspended or that legal action will follow. Scammers use fear to rush decisions.',
    weight: 2,
    patterns: [
      /\b(?:will be |has been |is )?(?:blocked|suspended|locked|deactivated|frozen|terminated)\b/gi,
      /\blegal action\b/gi,
      /\barrest(?:ed)?\b/gi,
      /\bunauthori[sz]ed (?:activity|access|transaction)\b/gi,
    ],
  },
  {
    category: 'prize',
    title: 'Promises prizes or rewards',
    description:
      'Claims you have won something you did not enter for. Unexpected winnings are a classic scam hook.',
    weight: 2,
    patterns: [
      /\bcongratulations\b/gi,
      /\byou(?:'ve| have)? won\b/gi,
      /\bwinner\b/gi,
      /\bprizes?\b/gi,
      /\brewards?\b/gi,
      /\blottery\b/gi,
      /\bjackpot\b/gi,
      /\bcash ?back\b/gi,
      /\bfree (?:gift|iphone|money|cash)\b/gi,
      /\bselected\b/gi,
    ],
  },
  {
    category: 'payment',
    title: 'Demands payment or a fee',
    description:
      'Asks you to pay a fee, transfer money or use gift cards or crypto. Requests to pay to "unlock" something are a strong scam signal.',
    weight: 3,
    patterns: [
      /\bprocessing fee\b/gi,
      /\b(?:delivery|customs|release|clearance|registration) fee\b/gi,
      /\bpay (?:a |the )?(?:fee|charge|amount|now)\b/gi,
      /\bwire transfer\b/gi,
      /\bgift cards?\b/gi,
      /\bbitcoin\b/gi,
      /\bcrypto(?:currency)?\b/gi,
      /\bupi\b/gi,
      /\bsend (?:money|payment)\b/gi,
    ],
  },
  {
    category: 'delivery',
    title: 'Fake delivery or parcel notice',
    description:
      'Claims a parcel is on hold or delivery failed. Fake courier messages often lead to phishing pages.',
    weight: 1,
    patterns: [
      /\b(?:parcel|package|shipment) (?:is )?(?:on hold|held|pending|undelivered)\b/gi,
      /\bdelivery (?:failed|attempt|unsuccessful)\b/gi,
      /\breschedule (?:your )?delivery\b/gi,
      /\bparcel\b/gi,
    ],
  },
]

const URL_PATTERN =
  /\b((?:https?:\/\/|www\.)[^\s<>"']+|(?:[a-z0-9-]+\.)+(?:com|net|org|info|xyz|top|click|link|live|shop|online|site|ru|cn|tk|ml|ga|cf|gq|ly|io|co|in)(?:\/[^\s<>"']*)?)/gi

const URL_SHORTENERS = [
  'bit.ly',
  'tinyurl.com',
  't.co',
  'goo.gl',
  'is.gd',
  'ow.ly',
  'cutt.ly',
  'rb.gy',
  'shorturl.at',
  'tiny.cc',
]

const RISKY_TLDS = ['xyz', 'top', 'click', 'link', 'live', 'shop', 'online', 'site', 'tk', 'ml', 'ga', 'cf', 'gq', 'ru', 'cn']

const LURE_WORDS = ['login', 'verify', 'secure', 'account', 'update', 'bank', 'wallet', 'support', 'kyc', 'confirm']

function inspectUrl(raw: string): DetectedUrl {
  const url = raw.replace(/[.,!?;:)\]]+$/, '')
  const withProtocol = /^https?:\/\//i.test(url) ? url : `http://${url}`
  let host = ''
  try {
    host = new URL(withProtocol).hostname.toLowerCase()
  } catch {
    host = url.toLowerCase()
  }

  const flags: string[] = []
  if (/^http:\/\//i.test(url)) flags.push('Not encrypted (http)')
  if (/^\d{1,3}(?:\.\d{1,3}){3}$/.test(host)) flags.push('Uses a raw IP address')
  if (URL_SHORTENERS.some((s) => host === s || host.endsWith(`.${s}`))) flags.push('Link shortener hides destination')
  const tld = host.split('.').pop() ?? ''
  if (RISKY_TLDS.includes(tld)) flags.push(`Uncommon domain ending (.${tld})`)
  if (host.includes('xn--')) flags.push('Look-alike characters (punycode)')
  if ((host.match(/-/g) ?? []).length >= 2) flags.push('Many hyphens in domain')
  if (url.includes('@')) flags.push('Contains "@" which can disguise the real site')
  const lure = LURE_WORDS.find((w) => host.includes(w))
  if (lure) flags.push(`Domain contains "${lure}"`)

  return { url, domain: host, flags }
}

export function extractUrls(message: string): DetectedUrl[] {
  const found = message.match(URL_PATTERN) ?? []
  const seen = new Set<string>()
  const result: DetectedUrl[] = []
  for (const raw of found) {
    const inspected = inspectUrl(raw)
    if (seen.has(inspected.url.toLowerCase())) continue
    seen.add(inspected.url.toLowerCase())
    result.push(inspected)
  }
  return result
}

export interface HeuristicResult {
  indicators: Indicator[]
  highlights: string[]
  urls: DetectedUrl[]
  points: number
  riskLevel: RiskLevel
  classification: Classification
}

export function runSecurityChecks(message: string): HeuristicResult {
  const indicators: Indicator[] = []
  const highlights = new Set<string>()
  let points = 0

  for (const rule of RULES) {
    const matches = new Set<string>()
    for (const pattern of rule.patterns) {
      for (const match of message.matchAll(pattern)) {
        matches.add(match[0].trim())
      }
    }
    if (matches.size > 0) {
      points += rule.weight
      matches.forEach((m) => highlights.add(m))
      indicators.push({
        category: rule.category,
        title: rule.title,
        description: rule.description,
        matches: [...matches],
      })
    }
  }

  const urls = extractUrls(message)
  if (urls.length > 0) {
    const flagged = urls.some((u) => u.flags.length > 0)
    points += flagged ? 2 : 1
    indicators.push({
      category: 'link',
      title: flagged ? 'Contains a link with warning signs' : 'Contains a link',
      description: flagged
        ? 'The message includes a link with characteristics often seen in phishing. Do not open it.'
        : 'Unexpected links are a common way to deliver phishing pages. Only open links you were expecting from a trusted sender.',
      matches: urls.map((u) => u.url),
    })
  }

  const hasCredentialAsk = indicators.some((i) => i.category === 'credentials')
  let riskLevel: RiskLevel = 'low'
  if (points >= 5 || (hasCredentialAsk && points >= 4)) riskLevel = 'high'
  else if (points >= 2) riskLevel = 'medium'

  return {
    indicators,
    highlights: [...highlights],
    urls,
    points,
    riskLevel,
    classification: riskLevel === 'low' ? 'legitimate' : 'suspicious',
  }
}

export function buildRecommendations(
  classification: Classification,
  indicators: Indicator[],
): string[] {
  if (classification === 'legitimate') {
    return [
      'No strong warning signs were found, but stay cautious with unexpected messages.',
      'If the sender asks for money or personal details later, verify through a separate channel.',
      'When in doubt, contact the organisation using a number or website you already trust.',
    ]
  }

  const recs = ['Do not reply, click links, or call numbers in this message.']
  const has = (c: IndicatorCategory) => indicators.some((i) => i.category === c)

  if (has('credentials')) recs.push('Never share OTPs, passwords, PINs or card details — no genuine organisation will ask for them.')
  if (has('payment')) recs.push('Do not pay any fee or transfer money to claim a prize, parcel or refund.')
  if (has('link')) recs.push('Do not open the link. If you already did, avoid entering any information and close the page.')
  if (has('threat') || has('urgency'))
    recs.push('Contact the organisation directly using its official app, website or the number on your card.')
  recs.push('Report the message to your mobile carrier or national cybercrime helpline, then delete it.')
  return recs
}
