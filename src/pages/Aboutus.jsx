import { motion } from 'framer-motion'
import {
  Building2,
  Users,
  BedDouble,
  Stethoscope,
  Star,
  Quote,
  GraduationCap,
  BadgeCheck,
  Wallet,
  HeartPulse,
  ShieldPlus,
  CreditCard,
  Banknote,
  FileCheck2,
  MapPin,
  Phone,
  Clock3,
  Ambulance,
  ArrowRight,
  Target,
  Eye,
} from 'lucide-react'

import Button from '../components/Button.jsx'
import SectionTitle from '../components/SectionTitle.jsx'
import StatCard from '../components/StatCard.jsx'

// ---------------------------------------------------------------------------
// About Us — content sourced from Modern Hospital's own records and its
// Practo listing (ratings, bed count, treatment count, payment modes).
// Keep this in sync with Home.jsx if fees / timings ever change.
//
// NOTE: Navbar is no longer imported/rendered here — it now lives once in
// App.jsx, above every page's overflow-x-hidden wrapper, so sticky
// positioning works consistently across all routes.
// ---------------------------------------------------------------------------

const FACILITY_STATS = [
  { icon: GraduationCap, label: 'YEARS OF PRACTICE', value: '40+', sub: 'Since Dr. Nazim Shaikh began practicing' },
  { icon: BedDouble, label: 'BED CAPACITY', value: '15', sub: 'Inpatient & day-care beds' },
  { icon: ShieldPlus, label: 'TREATMENTS OFFERED', value: '218', sub: 'Across orthopaedic & general surgery' },
  { icon: Star, label: 'PATIENT RATING', value: '5.0', sub: '48 patient stories shared' },
]

const VALUES = [
  {
    icon: Target,
    title: 'Our Mission',
    body: 'To blend state-of-the-art medical technology and research with a genuine dedication to patient welfare — treating every fracture, joint, and surgical case with the same care we would want for our own family.',
  },
  {
    icon: Eye,
    title: 'Our Approach',
    body: 'Not every condition needs an operation. We assess conservative and non-surgical options first — injections, physiotherapy — and reserve surgery for when it is genuinely the better path for the patient.',
  },
  {
    icon: HeartPulse,
    title: 'Our Commitment',
    body: 'From a first fracture consultation to years of follow-up arthritis care, patients stay with the same surgeons over time — continuity that a hospital this size can still offer.',
  },
]

const DOCTORS = [
  {
    image:
      'https://images.unsplash.com/photo-1612531386530-97286d97c2d2?q=80&w=500&auto=format&fit=crop',
    name: 'Dr. Nazim Shaikh',
    qualification: 'MBBS, M.S. (Orthopaedics)',
    role: 'Senior Orthopaedic Surgeon · Founder',
    experience: '40 Years Experience',
    bio: 'Dr. Nazim Shaikh has practiced orthopaedic surgery in Pune for four decades, with fellowship training in I.P.T.M. (Israel) and further fellowship study in Portugal. He also serves as Secretary of MMERC at Unani Medical College & Physiotherapy College, Pune, and treats everything from fresh trauma to complex, old malunited fractures.',
    focus: ['Fracture & Trauma Care', 'Joint Replacement', 'Spinal Pain & Sciatica'],
  },
  {
    image:
      'https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=500&auto=format&fit=crop',
    name: 'Dr. Shoaib Nazim Shaikh',
    qualification: 'MBBS, DNB (Orthopedics)',
    role: 'Orthopaedic & Joint Replacement Surgeon',
    experience: '11+ Years Experience',
    bio: 'Dr. Shoaib Nazim Shaikh trained further in Europe after his DNB in Orthopedics, and now leads much of the hospital\u2019s joint replacement and arthroscopy practice alongside general trauma care, working closely with patients through both surgery and post-operative recovery.',
    focus: ['Joint Replacement', 'Knee Arthroscopy', 'Trauma & Fracture Care'],
  },
]

const PAYMENT_MODES = [
  { icon: Banknote, label: 'Cash' },
  { icon: CreditCard, label: 'Cheque' },
  { icon: FileCheck2, label: 'Insurance Accepted' },
]

const TESTIMONIALS = [
  {
    quote:
      'A patient described being treated for a spinal problem and said the pain eased over three to four weeks, recommending the hospital for joint and orthopaedic issues.',
    context: 'Treated for a spinal condition',
  },
  {
    quote:
      'A patient wrote about bringing several family members in over multiple visits and said every case was treated with full attention and commitment.',
    context: 'Multiple family visits over time',
  },
  {
    quote:
      'A patient called it one of the better hospitals in Pune, citing effective, reasonably priced treatment they would recommend to family and friends.',
    context: 'Spinal therapy patient',
  },
]

export default function About() {
  return (
    <div className="min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-background pb-16 md:pb-0">
      {/* ================================================================ */}
      {/* HERO                                                             */}
      {/* ================================================================ */}
      <section className="relative overflow-hidden bg-surface-soft">
        <div className="mx-auto max-w-content px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-secondary shadow-card sm:text-[12px]"
          >
            <Building2 size={13} className="shrink-0" />
            <span className="leading-snug">About Modern Hospital</span>
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="mt-4 max-w-2xl text-[26px] font-extrabold leading-[1.15] tracking-tight text-text-primary xs:text-[30px] sm:text-[42px] lg:text-[46px]"
          >
            Four Decades of Orthopaedic Care, Rooted in Nana Peth.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22 }}
            className="mt-4 max-w-xl text-[15px] leading-relaxed text-text-secondary sm:text-[15.5px]"
          >
            Modern Hospital has treated Pune families since long before "multi-speciality" was a
            buzzword — starting as an orthopaedic practice and growing, patient by patient, into
            a 15-bed hospital covering fracture care, joint replacement, general surgery, and
            paediatric surgery.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4"
          >
            {FACILITY_STATS.map((stat, i) => (
              <StatCard
                key={stat.label}
                icon={stat.icon}
                label={stat.label}
                value={stat.value}
                sub={stat.sub}
                delay={0.4 + i * 0.08}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* MISSION / APPROACH / COMMITMENT                                  */}
      {/* ================================================================ */}
      <section className="py-10 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-content px-4 sm:px-6">
          <SectionTitle
            eyebrow="Why We Exist"
            heading="What Guides Every Consultation"
            description="A small hospital's advantage is consistency — the same surgeons, the same standards, visit after visit."
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {VALUES.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-xl border border-border bg-white p-5 shadow-card"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-surface-soft text-primary">
                  <item.icon size={22} strokeWidth={1.75} />
                </div>
                <h3 className="mt-4 text-[16px] font-semibold text-text-primary">{item.title}</h3>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-text-secondary">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* MEET THE SURGEONS                                                */}
      {/* ================================================================ */}
      <section id="doctors" className="bg-surface-soft py-10 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-content px-4 sm:px-6">
          <SectionTitle
            eyebrow="Our Team"
            heading="The Surgeons Behind Modern Hospital"
            description="Two generations of the same family, practicing orthopaedic surgery under one roof."
          />
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {DOCTORS.map((doc, i) => (
              <motion.div
                key={doc.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="overflow-hidden rounded-xl border border-border bg-white shadow-card"
              >
                <div className="flex flex-col gap-4 p-5 sm:flex-row sm:p-6">
                  <img
                    src={doc.image}
                    alt={`${doc.name}, ${doc.role} at Modern Hospital, Pune`}
                    loading="lazy"
                    className="h-40 w-full shrink-0 rounded-lg object-cover sm:h-auto sm:w-32"
                  />
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold tracking-wide text-secondary">{doc.role}</p>
                    <h3 className="mt-0.5 break-words text-[17px] font-bold text-text-primary">{doc.name}</h3>
                    <p className="mt-0.5 text-[13px] text-text-secondary">{doc.qualification}</p>
                    <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-surface-soft px-2.5 py-1 text-[11px] font-semibold text-primary">
                      <BadgeCheck size={12} className="shrink-0" /> {doc.experience}
                    </span>
                    <p className="mt-3 text-[13.5px] leading-relaxed text-text-secondary">{doc.bio}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {doc.focus.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-border px-2.5 py-1 text-[11px] font-medium text-text-primary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-6 flex justify-center">
            <Button as="a" href="/#physicians" variant="secondary" size="md" className="w-full gap-1.5 sm:w-auto">
              View OPD Slots &amp; Book <ArrowRight size={15} />
            </Button>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* FACILITY / PAYMENT / TIMINGS                                     */}
      {/* ================================================================ */}
      <section className="py-10 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-content px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6 }}
              className="rounded-xl border border-border bg-white p-5 shadow-card sm:p-6"
            >
              <div className="flex items-center gap-2">
                <BedDouble size={18} className="shrink-0 text-primary" />
                <h3 className="text-[16px] font-semibold text-text-primary">The Facility</h3>
              </div>
              <p className="mt-3 text-[13.5px] leading-relaxed text-text-secondary">
                A 15-bed multi-speciality hospital with dedicated inpatient and day-care beds,
                built to keep fracture, surgical, and paediatric patients close to the same
                surgeon throughout their treatment.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="rounded-xl border border-border bg-white p-5 shadow-card sm:p-6"
            >
              <div className="flex items-center gap-2">
                <Wallet size={18} className="shrink-0 text-primary" />
                <h3 className="text-[16px] font-semibold text-text-primary">Modes of Payment</h3>
              </div>
              <ul className="mt-3 space-y-2.5">
                {PAYMENT_MODES.map((mode) => (
                  <li key={mode.label} className="flex items-center gap-2.5 text-[13.5px] text-text-primary">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-surface-soft text-secondary">
                      <mode.icon size={13} />
                    </span>
                    {mode.label}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.16 }}
              className="rounded-xl border border-border bg-white p-5 shadow-card sm:p-6"
            >
              <div className="flex items-center gap-2">
                <Clock3 size={18} className="shrink-0 text-primary" />
                <h3 className="text-[16px] font-semibold text-text-primary">Hours</h3>
              </div>
              <div className="mt-3 space-y-2 text-[13.5px]">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-text-secondary">OPD Consultations</span>
                  <span className="text-right font-medium text-text-primary">10 AM–2 PM &amp; 6–8 PM</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-text-secondary">Emergency &amp; Wards</span>
                  <span className="text-right font-medium text-danger">Open 24 Hours</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* PATIENT STORIES                                                  */}
      {/* ================================================================ */}
      <section className="bg-surface-soft py-10 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-content px-4 sm:px-6">
          <SectionTitle
            eyebrow="Patient Stories"
            heading="What Patients Say"
            action={
              <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-[13px] font-semibold text-text-primary">
                <Star size={14} className="shrink-0 fill-[#F4A83A] text-[#F4A83A]" />
                5.0 · 48 Patient Stories
              </span>
            }
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.context}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-xl border border-border bg-white p-5 shadow-card"
              >
                <Quote size={18} className="text-primary/40" />
                <p className="mt-3 text-[13.5px] leading-relaxed text-text-primary">{t.quote}</p>
                <p className="mt-3 text-[12px] font-medium text-text-secondary">{t.context}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      

      {/* ================================================================ */}
      {/* VISIT US CTA                                                     */}
      {/* ================================================================ */}
      <section className="py-10 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-content px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-start justify-between gap-5 rounded-2xl border border-border bg-white p-6 shadow-card sm:flex-row sm:items-center sm:p-8"
          >
            <div className="min-w-0">
              <h3 className="text-[20px] font-bold text-text-primary sm:text-[22px]">
                Come See Us at Nana Peth
              </h3>
              <p className="mt-2 flex items-start gap-2 text-[13.5px] text-text-secondary">
                <MapPin size={15} className="mt-0.5 shrink-0" />
                <span className="min-w-0">461, Nana Peth, Sant Kabir Chowk, Pune – 411002</span>
              </p>
            </div>
            <div className="flex w-full flex-wrap gap-2 sm:w-auto">
              <Button as="a" href="tel:+912026138375" size="md" className="flex-1 gap-1.5 sm:flex-none">
                <Phone size={15} /> Call 26138375
              </Button>
              <Button as="a" href="/#timings" variant="secondary" size="md" className="flex-1 gap-1.5 sm:flex-none">
                <Ambulance size={15} /> OPD Timings &amp; Fees
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}