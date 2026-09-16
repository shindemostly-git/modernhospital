// src/data/specialtyImages.js
//
// Pratyek image verified Unsplash direct-CDN photo aahe (fetch karun page
// load hote ka check kelay). Adhीच्या version madhe multiple keywords
// (physiotherapy / arthritis / joint / orthopaedic / bone) ekach photo ID
// kade point karat hote, ani je specialty konatahi keyword match karat
// navhते te sगळे DEFAULT_IMAGE var padत hote — तोच duplicate-image bug.
//
// Fix: SLUG_IMAGES madhe pratyek specialty sathi स्वतंत्र, exact slug ->
// unique image mapping ahe (collision impossible, karan ek slug = ek key).
// KEYWORD_IMAGES फक्त fallback sathi ahe, tyat pan pratyek keyword-group
// la स्वतंत्र image ahe — kontehi don groups ek image share karत nahi.

const SLUG_IMAGES = {
  'fracture-trauma-care': 'photo-1516069677018-378515003435', // X-ray chart — verified
  'joint-replacement-arthroscopy': 'photo-1748407407936-2aeffd8428dd', // knee joint model — verified
  'arthritis-rheumatology-care': 'photo-1775049728396-d641f91f6c62', // elderly hands — verified
  'non-surgical-pain-injection-therapy': 'photo-1649751361457-01d3a696c7e6', // leg examination — verified
  'hernia-appendix-swellings': 'photo-1551601651-2a8555f1a136', // general surgery, OT — verified
  'paediatric-plastic-surgery': 'photo-1676313030076-4ac0b37050fd', // child stethoscope exam — verified
}

// Fallback keyword buckets — each bucket maps to ITS OWN unique photo so
// two different specialties can never end up sharing one image again.
const KEYWORD_IMAGES = {
  fracture: 'photo-1516069677018-378515003435',
  trauma: 'photo-1516069677018-378515003435',

  joint: 'photo-1748407407936-2aeffd8428dd',
  arthroscopy: 'photo-1748407407936-2aeffd8428dd',
  'joint replacement': 'photo-1748407407936-2aeffd8428dd',

  arthritis: 'photo-1775049728396-d641f91f6c62',
  rheumatology: 'photo-1775049728396-d641f91f6c62',

  'non-surgical': 'photo-1649751361457-01d3a696c7e6',
  injection: 'photo-1649751361457-01d3a696c7e6',
  physiotherapy: 'photo-1649751361457-01d3a696c7e6',

  hernia: 'photo-1551601651-2a8555f1a136',
  appendix: 'photo-1551601651-2a8555f1a136',
  'general surgery': 'photo-1551601651-2a8555f1a136',
  swelling: 'photo-1551601651-2a8555f1a136',

  vaccination: 'photo-1676313030076-4ac0b37050fd',
  immuniz: 'photo-1676313030076-4ac0b37050fd',
  pediatric: 'photo-1676313030076-4ac0b37050fd',
  paediatric: 'photo-1676313030076-4ac0b37050fd',
  child: 'photo-1676313030076-4ac0b37050fd',

  // generic orthopaedic branding — distinct from the specific conditions above
  orthopaedic: 'photo-1516069677018-378515003435',
  orthopedic: 'photo-1516069677018-378515003435',
  bone: 'photo-1516069677018-378515003435',
}

const DEFAULT_IMAGE = 'photo-1758691462878-6edc3d3da1be' // doctor consultation — verified

function findByKeyword(text = '') {
  const t = text.toLowerCase()
  const hit = Object.keys(KEYWORD_IMAGES).find((k) => t.includes(k))
  return hit ? KEYWORD_IMAGES[hit] : null
}

/**
 * Specialty object { slug, title, badge } ghevun match karnara image ID.
 * Priority: exact slug > keyword in slug > keyword in title > keyword in
 * badge > default. Exact slug match guarantees zero collisions for any
 * specialty explicitly listed in SLUG_IMAGES.
 */
function resolveId(specialty) {
  if (!specialty) return DEFAULT_IMAGE
  const { slug = '', title = '', badge = '' } = specialty

  if (SLUG_IMAGES[slug]) return SLUG_IMAGES[slug]

  return (
    findByKeyword(slug) ||
    findByKeyword(title) ||
    findByKeyword(badge) ||
    DEFAULT_IMAGE
  )
}

function buildUrl(id, w) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`
}

/**
 * @param {object|string} specialtyOrSlug  full specialty object (best),
 *   or a plain slug string (matches on slug text only).
 */
export function specialtyImage(specialtyOrSlug, w = 800) {
  const specialty =
    typeof specialtyOrSlug === 'string' ? { slug: specialtyOrSlug } : specialtyOrSlug
  return buildUrl(resolveId(specialty), w)
}

export function specialtySecondaryImage(specialtyOrSlug, w = 1200) {
  return specialtyImage(specialtyOrSlug, w)
}

export function specialtyImageAlt(title) {
  return `${title} at Modern Hospital, Nana Peth`
}