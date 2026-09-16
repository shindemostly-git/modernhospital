// src/pages/SpecialtyDetail.jsx
import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Bone,
  Activity,
  ShieldPlus,
  Syringe,
  Scissors,
  Baby,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  PhoneCall,
} from 'lucide-react'


import Button from '../components/Button.jsx'
import { SPECIALTIES, getSpecialtyBySlug } from '../data/specialties.js'
import {
  specialtyImage,
  specialtySecondaryImage,
  specialtyImageAlt,
} from '../data/specialtyImages.js'

const ICONS = { Bone, Activity, ShieldPlus, Syringe, Scissors, Baby }

export default function SpecialtyDetail() {
  const { slug } = useParams()
  const specialty = getSpecialtyBySlug(slug)

  if (!specialty) {
    return <Navigate to="/" replace />
  }

  const Icon = ICONS[specialty.icon] ?? Bone

  return (
    <div className="min-h-screen bg-background">
     

      {/* ============================================================== */}
      {/* HEADER — text dawikade, photo ujavikade                         */}
      {/* ============================================================== */}
      <section className="border-b border-border bg-surface-soft">
        <div className="mx-auto max-w-content px-4 py-8 sm:px-6 sm:py-12 lg:py-14">
          <Link
            to="/#specialties"
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-text-secondary hover:text-text-primary"
          >
            <ArrowLeft size={14} /> All Specialties
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-4 grid items-center gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12"
          >
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-secondary shadow-card">
                {specialty.badge}
              </span>
              <h1 className="mt-3 text-[24px] font-bold leading-tight text-text-primary sm:text-[30px] lg:text-[34px]">
                {specialty.title}
              </h1>
              <p className="mt-3 max-w-[62ch] text-[14.5px] leading-relaxed text-text-secondary sm:text-[15px]">
                {specialty.intro}
              </p>
            </div>

            {/* HERO PHOTO — ithe aadhi icon box hota */}
            <figure className="relative overflow-hidden rounded-2xl shadow-card">
              <div className="aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3]">
                <img
                  src={specialtyImage(specialty.slug, 1000)}
                  alt={specialtyImageAlt(specialty.title)}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>
              <figcaption className="absolute bottom-3 left-3 flex items-center gap-2 rounded-lg bg-white/95 px-3 py-2 text-[12px] font-medium text-text-primary shadow-card">
                <Icon size={16} className="text-primary" strokeWidth={1.75} />
                {specialty.badge}
              </figcaption>
            </figure>
          </motion.div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* TREATMENTS + WHO IT'S FOR                                       */}
      {/* ============================================================== */}
      <section className="py-10 sm:py-14 lg:py-16">
        <div className="mx-auto grid max-w-content gap-8 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-[18px] font-semibold text-text-primary">What we treat</h2>
            <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {specialty.treatments.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 rounded-lg border border-border bg-white p-3 text-[13.5px] leading-snug text-text-primary sm:text-[14px]"
                >
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>

            {/* DUSRA PHOTO — wide band */}
            <figure className="mt-6 overflow-hidden rounded-xl shadow-card">
              <div className="aspect-[16/7] sm:aspect-[16/6]">
                <img
                  src={specialtySecondaryImage(specialty.slug, 1400)}
                  alt={`Treatment and follow-up for ${specialty.title.toLowerCase()}`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>
            </figure>

            <div className="mt-6 rounded-xl border border-border bg-surface-soft p-5 sm:p-6">
              <p className="text-[13.5px] leading-relaxed text-text-secondary">
                {specialty.meta}. Every case starts with a consultation — the fee is ₹600, with a
                ₹500 follow-up if you return within a month. Emergency care is staffed around the
                clock at the Nana Peth branch.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="h-fit rounded-xl border border-border bg-white p-5 shadow-card sm:p-6 lg:sticky lg:top-24"
          >
            <h2 className="text-[16px] font-semibold text-text-primary">This may be for you if…</h2>
            <ul className="mt-4 space-y-3">
              {specialty.whoItsFor.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-[13.5px] leading-snug text-text-secondary"
                >
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-success" />
                  {item}
                </li>
              ))}
            </ul>

            <Button as="a" href="tel:+912026138375" size="md" className="mt-6 w-full gap-1.5">
              <PhoneCall size={15} /> Call to Discuss: 26138375
            </Button>
            <Button
              as={Link}
              to="/bookconsultation"
              variant="secondary"
              size="md"
              className="mt-3 w-full gap-1.5"
            >
              Book a Consultation <ArrowRight size={15} />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* RELATED SPECIALTIES — ata photo thumbnails sah                  */}
      {/* ============================================================== */}
      <section className="border-t border-border bg-surface-soft py-10 sm:py-14">
        <div className="mx-auto max-w-content px-4 sm:px-6">
          <h2 className="text-[16px] font-semibold text-text-primary">Other specialties</h2>
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SPECIALTIES.filter((item) => item.slug !== specialty.slug).map((item) => (
              <Link
                key={item.slug}
                to={`/specialties/${item.slug}`}
                className="group flex items-center gap-3 overflow-hidden rounded-xl border border-border bg-white p-2.5 shadow-card transition-colors hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              >
                <img
                  src={specialtyImage(item.slug, 200)}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="h-14 w-16 shrink-0 rounded-lg object-cover sm:h-16 sm:w-20"
                />
                <span className="text-[13.5px] font-medium leading-snug text-text-primary">
                  {item.title}
                </span>
                <ArrowRight
                  size={15}
                  className="ml-auto mr-1 shrink-0 text-text-secondary transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}