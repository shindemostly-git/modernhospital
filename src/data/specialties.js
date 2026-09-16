// src/data/specialties.js
//
// Single source of truth for the 6 specialty cards on Home.jsx AND their
// detail pages. Each entry's `slug` is used to build the URL
// (/specialties/:slug) and to look the entry up in SpecialtyDetail.jsx.
//
// Icons are referenced by name (string) instead of the component itself so
// this file stays plain data — SpecialtyDetail.jsx resolves the name to the
// actual lucide-react component.

export const SPECIALTIES = [
  {
    slug: 'fracture-trauma-care',
    icon: 'Bone',
    badge: 'Core Specialty',
    title: 'Fracture & Trauma Care',
    description:
      'Complete fracture treatment including complex and old malunited fractures, plus dedicated care for trauma and sports injuries.',
    meta: 'Emergency: 24 Hours',
    linkLabel: 'Learn More',
    intro:
      'Fractures rarely happen on schedule. Our trauma team is set up for same-day X-ray, casting, and — when needed — surgical fixation, whether it is a fresh break or an old fracture that never healed correctly.',
    treatments: [
      'Consultation & diagnosis',
      'Fracture treatment (simple & compound)',
      'Treatment of old malunited fractures',
      'Trauma injuries',
      'Sports injuries',
      'Operative treatment where required',
    ],
    whoItsFor: [
      'A fresh fracture from a fall, accident, or sports injury',
      'An old fracture that healed out of alignment',
      'Ongoing pain or reduced movement after a past injury',
    ],
  },
  {
    slug: 'joint-replacement-arthroscopy',
    icon: 'Activity',
    badge: 'Minimally Invasive',
    title: 'Joint Replacement & Arthroscopy',
    description:
      'Arthroscopic treatment of the knee and joint replacement surgery for advanced arthritis and degenerative joint disease.',
    meta: 'Operative Treatment Available',
    linkLabel: 'Learn More',
    intro:
      'When knee pain or joint damage stops responding to medication and physiotherapy, arthroscopy or joint replacement can restore movement — evaluated case by case, with surgery offered only when it is genuinely the right next step.',
    treatments: [
      'Arthroscopic treatment of the knee',
      'Joint replacement surgery',
      'Operative treatment for degenerative joint disease',
      'Pre- and post-operative rehabilitation guidance',
    ],
    whoItsFor: [
      'Advanced arthritis that limits daily movement',
      'Knee damage confirmed on imaging that hasn\u2019t improved with therapy',
      'Persistent joint pain despite medication',
    ],
  },
  {
    slug: 'arthritis-rheumatology-care',
    icon: 'ShieldPlus',
    badge: 'Age & Autoimmune Care',
    title: 'Arthritis & Rheumatology Care',
    description:
      'Treatment for arthritis due to old age as well as rheumatoid arthritis, focused on restoring mobility and reducing pain.',
    meta: 'Consultation & Ongoing Follow-up',
    linkLabel: 'Learn More',
    intro:
      'Age-related and rheumatoid arthritis are managed differently, and both need ongoing follow-up rather than a single visit. We track how the joint responds over time and adjust treatment accordingly.',
    treatments: [
      'Arthritis treatment due to old age',
      'Rheumatoid arthritis treatment',
      'Pain and mobility management',
      'Ongoing follow-up consultations',
    ],
    whoItsFor: [
      'Stiffness or joint pain that has developed with age',
      'A rheumatoid arthritis diagnosis needing active management',
      'Reduced mobility affecting daily activities',
    ],
  },
  {
    slug: 'non-surgical-pain-injection-therapy',
    icon: 'Syringe',
    badge: 'Without Surgery',
    title: 'Non-Surgical Pain & Injection Therapy',
    description:
      'Intra-articular and trigger point injections for frozen shoulder and painful heel, plus relief for spinal pain and sciatica.',
    meta: 'Includes Physiotherapy',
    linkLabel: 'Learn More',
    intro:
      'Many pain conditions can be treated without an operation. Intra-articular and trigger-point injections relieve pain and restore mobility, followed by guided physiotherapy for lasting recovery.',
    treatments: [
      'Frozen shoulder & painful heel treatment',
      'Spinal pain and sciatica relief',
      'Trigger-point injection therapy',
      'Structured physiotherapy programs',
    ],
    whoItsFor: [
      'Frozen shoulder limiting arm movement',
      'Heel pain on standing or walking',
      'Spinal pain or sciatica not needing surgery',
    ],
  },
  {
    slug: 'hernia-appendix-swellings',
    icon: 'Scissors',
    badge: 'General Surgery',
    title: 'Hernia, Appendix & Swellings',
    description:
      'Surgical treatment for appendix, hernia, hydrocele, swellings, and non-healing ulcers of the limbs.',
    meta: 'Day-Care & Inpatient Options',
    linkLabel: 'Learn More',
    intro:
      'General surgical conditions like hernia, appendicitis, and hydrocele are treated with both day-care and inpatient options, chosen based on what the individual case needs.',
    treatments: [
      'Appendix surgery',
      'Hernia repair',
      'Hydrocele treatment',
      'Swellings & non-healing ulcers of the limbs',
    ],
    whoItsFor: [
      'A hernia that is uncomfortable or growing',
      'Suspected appendicitis needing urgent evaluation',
      'A wound or ulcer on the limb that isn\u2019t healing',
    ],
  },
  {
    slug: 'paediatric-plastic-surgery',
    icon: 'Baby',
    badge: 'Plastic & Paediatric',
    title: 'Paediatric & Plastic Surgery',
    description:
      'Corrective surgery for club foot and childhood deformities, along with plastic surgery for children and adults.',
    meta: 'Early Intervention Recommended',
    linkLabel: 'Learn More',
    intro:
      'Childhood deformities like club foot respond best to early correction. Our team handles paediatric surgical correction alongside plastic surgery for both children and adults.',
    treatments: [
      'Paediatric surgery',
      'Club foot surgery',
      'Childhood deformity treatment',
      'Plastic surgery (children & adults)',
    ],
    whoItsFor: [
      'A newborn or infant diagnosed with club foot',
      'A childhood deformity that needs corrective surgery',
      'Plastic surgery consultation for children or adults',
    ],
  },
]

export function getSpecialtyBySlug(slug) {
  return SPECIALTIES.find((item) => item.slug === slug)
}