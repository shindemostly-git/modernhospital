import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'


import {
  Search,
  ChevronDown,
  Star,
  Clock3,
  Bone,
  Activity,
  Syringe,
  Scissors,
  Baby,
  ShieldPlus,
  ArrowRight,
  Building2,
  Phone,
  MapPin,
  Ambulance,
  Stethoscope,
  CalendarClock,
  GraduationCap,
  BadgeCheck,
  Wallet,
  Timer,
  PhoneCall,
  HelpCircle,
} from 'lucide-react'


import Button from '../components/Button.jsx'
import SectionTitle from '../components/SectionTitle.jsx'
import StatCard from '../components/StatCard.jsx'
import SpecialityCard from '../components/SpecialityCard.jsx'
import DoctorCard from '../components/DoctorCard.jsx'
import { SPECIALTIES as SPECIALTIES_DATA } from '../data/specialties.js' 
 


// ---------------------------------------------------------------------------
// Real content, transcribed from Modern Hospital's prescription-pad notes.
// Replace phone numbers / fees here if they ever change — nowhere else.
// ---------------------------------------------------------------------------

const SPECIALTY_ICONS = { Bone, Activity, ShieldPlus, Syringe, Scissors, Baby }
const SPECIALTIES = SPECIALTIES_DATA.map((item) => ({
  ...item,
  icon: SPECIALTY_ICONS[item.icon],
}))

const DOCTORS = [
  {
    image: '/images/nazimshaikh.png',
    name: 'Dr. Nazim Shaikh',
    specialty: 'M.S. (Ortho) · Orthopaedic Surgeon',
    experience: '40+ Yrs Experience',
    location: 'Modern Hospital, Nana Peth',
    consultType: 'Fellowship: I.P.T.M. Israel · Portugal',
    slots: [
      { time: '10:00 AM' },
      { time: '11:30 AM' },
      { time: '06:00 PM' },
      { time: '07:30 PM' },
    ],
  },
  {
    image:
      'https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=300&auto=format&fit=crop',
    name: 'Dr. Shoaib Nazim Shaikh',
    specialty: 'DNB (Orthopedics)',
    experience: 'Fellowship: Europe',
    location: 'Mitha Nagar, Lane 2, Kondhwa Kh., Pune 411048' ,
    consultType: 'Joint Replacement · Trauma Care',
    slots: [
      { time: '10:30 AM' },
      { time: '12:00 PM' },
      { time: '06:30 PM' },
      { time: '08:00 PM' },
    ],
  },
]

const LOCATIONS = [
  {
    name: 'Modern Hospital',
    tag: 'Main Branch',
    address: '461, Nana Peth, Sant Kabir Chowk, Pune – 411002',
    phone: '26138375',
    phoneHref: 'tel:+912026138375',
    hours: 'OPD: 10 AM–2 PM & 6–8 PM · Emergency: 24 Hours',
    extra: 'Regd. No. LCBP070800362',
  },
  {
    name: 'Dr. Sarwat Hospital',
    tag: 'Associate Branch',
    address: 'Mitha Nagar, Lane 2, Near Western Bakery, Kondhwa Kh., Pune – 411048',
    phone: '77699 76833',
    phoneHref: 'tel:+917769976833',
    hours: 'By Appointment',
    extra: 'Affiliated Orthopaedic & Surgical Care',
  },
]

const WHY_US = [
  {
    icon: GraduationCap,
    title: 'Internationally Trained Surgeons',
    body: 'Dr. Nazim Shaikh completed fellowship training (I.P.T.M.) in Israel and a further fellowship in Portugal. Dr. Shoaib Nazim Shaikh holds a DNB in Orthopedics with fellowship training in Europe.',
  },
  {
    icon: BadgeCheck,
    title: '40+ Years of Combined Experience',
    body: 'Dr. Nazim Shaikh brings four decades of orthopaedic practice, and also serves as Secretary of MMERC at Unani Medical College & Physiotherapy College, Pune.',
  },
  {
    icon: Wallet,
    title: 'Transparent, Affordable Fees',
    body: 'A straightforward consultation fee of ₹600, with a reduced ₹500 follow-up fee for repeat visits within one month of your first consultation.',
  },
]

const FAQS = [
  {
    question: 'What is Modern Hospital known for?',
    answer:
      'Modern Hospital is an orthopaedic-led multi-speciality hospital in Nana Peth, Pune, known for fracture and trauma care, joint replacement, and non-surgical pain treatment, alongside general and paediatric surgery — all led by the same surgeons patients see over the years.',
  },
  {
    question: 'What are the OPD timings and consultation fees?',
    answer:
      'OPD runs Monday to Saturday, 10:00 AM–2:00 PM and 6:00 PM–8:00 PM. The consultation fee is ₹600, and a follow-up visit within one month of your first consultation is ₹500. Emergency care is available 24 hours a day.',
  },
  {
    question: 'Do I need an appointment, or can I walk in?',
    answer:
      'Walk-ins are welcome during OPD hours, but booking ahead — by phone or through the Book Consultation page — means a shorter wait and a confirmed slot with your preferred doctor.',
  },
  {
    question: 'Which doctors will I see, and what do they specialise in?',
    answer:
      'Dr. Nazim Shaikh (M.S. Ortho, 40+ years, fellowship-trained in Israel and Portugal) handles fracture, trauma, and spine cases. Dr. Shoaib Nazim Shaikh (DNB Orthopedics, fellowship in Europe) focuses on joint replacement and arthroscopy.',
  },
  {
    question: 'Can some conditions be treated without surgery?',
    answer:
      'Yes. Frozen shoulder, heel pain, and spinal pain or sciatica are often treated with intra-articular or trigger-point injections and guided physiotherapy, with surgery kept as an option only when it is genuinely needed.',
  },
  {
    question: 'Where are Modern Hospital\u2019s locations?',
    answer:
      'The main branch is at 461, Nana Peth, Sant Kabir Chowk, Pune – 411002. The associate branch, Dr. Sarwat Hospital, is in Mitha Nagar, Kondhwa Khurd, Pune – 411048, available by appointment.',
  },
  {
    question: 'What should I do in a medical emergency?',
    answer:
      'Call the Nana Peth branch directly at 26138375, or the Kondhwa branch at 77699 76833. Emergency care is staffed 24 hours a day — come in without waiting for an OPD slot.',
  },
  {
    question: 'Do you treat children as well as adults?',
    answer:
      'Yes. Alongside adult orthopaedic and general surgery, the hospital offers paediatric surgical care, including corrective surgery for club foot and other childhood deformities.',
  },
]

export default function Home() {
  return (
    <div className="min-h-screen w-full max-w-[100vw] overflow-x-hidden overscroll-x-none bg-background pb-16 md:pb-0">
    

      {/* ================================================================ */}
      {/* HERO                                                             */}
      {/* ================================================================ */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-content gap-8 px-4 pb-10 pt-6 sm:gap-10 sm:px-6 sm:pb-14 sm:pt-10 md:pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          {/* Left column */}
          <div className="min-w-0">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full bg-surface-soft px-3 py-1 text-[11px] font-semibold text-secondary sm:text-[12px]"
            >
              <BadgeCheck size={13} className="shrink-0" />
              <span className="leading-snug">Orthopaedic • General • Paediatric Surgery</span>
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
              className="mt-4 text-[24px] font-extrabold leading-[1.18] tracking-tight text-text-primary min-[400px]:text-[28px] sm:text-[40px] md:text-[44px] lg:text-[48px]"
            >
              Expert Bone & Joint Care.
              <br />
              <span className="text-primary">40+ Years You Can Trust.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22 }}
              className="mt-4 max-w-lg text-[14px] leading-relaxed text-text-secondary sm:text-[15.5px]"
            >
              Modern Hospital, Pune is home to internationally fellowship-trained orthopaedic
              surgeons offering fracture care, joint replacement, non-surgical pain relief,
              general surgery, and paediatric surgery — across two convenient locations.
            </motion.p>

            {/* Search / booking bar */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.32 }}
              className="mt-6 flex flex-col gap-2 rounded-xl border border-border bg-white p-2 shadow-card sm:flex-row sm:items-center"
            >
              <div className="flex min-w-0 flex-1 items-center gap-2 rounded-lg px-3 py-2.5">
                <Search size={16} className="shrink-0 text-text-secondary" />
                <input
                  type="text"
                  placeholder="Search: fracture, knee pain, hernia..."
                  aria-label="Search treatments or conditions"
                  className="w-full min-w-0 bg-transparent text-[14px] text-text-primary placeholder:text-text-secondary focus:outline-none"
                />
              </div>
              <div className="hidden h-6 w-px bg-border sm:block" />
              <a
                href="tel:+912026138375"
                className="flex items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-[13px] font-medium text-text-primary hover:bg-surface-soft sm:w-auto sm:text-[13.5px]"
              >
                <span className="flex items-center gap-1.5 whitespace-nowrap">
                  <PhoneCall size={15} className="shrink-0 text-secondary" />
                  26138375
                </span>
                <ChevronDown size={14} className="hidden shrink-0 rotate-[-90deg] text-text-secondary sm:block" />
              </a>
              <Button as="a" href="#physicians" size="lg" className="w-full sm:w-auto">
                Book OPD Visit
              </Button>
            </motion.div>

            {/* Metric cards */}
            <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3">
              <StatCard icon={Clock3} label="OPD TIMING" value="10–2 & 6–8" sub="Emergency care: 24 hours" delay={0.4} />
              <StatCard icon={Wallet} label="CONSULTATION FEE" value="₹600" sub="Follow-up (1 mo.): ₹500" delay={0.48} />
              <div className="col-span-2 sm:col-span-1">
                <StatCard icon={GraduationCap} label="EXPERIENCE" value="40+ Years" sub="Israel & Portugal fellowship" delay={0.56} />
              </div>
            </div>
          </div>

          {/* Right column — doctor profile card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="relative mx-auto w-full max-w-sm min-w-0 lg:mx-0"
          >
            <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-elevated">
              <div className="relative">
                <img
                  src="/images/nazimshaikh.png"
                  alt="Dr. Nazim Shaikh, Orthopaedic Surgeon at Modern Hospital, Pune"
                  loading="lazy"
                  className="h-48 w-full object-cover min-[400px]:h-56 sm:h-72"
                />
                <motion.span
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="absolute left-2 top-2 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2 py-1 text-[10px] font-semibold text-success shadow-card sm:left-3 sm:top-3 sm:px-2.5 sm:text-[11px]"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-success" />
                  <span className="whitespace-nowrap">OPD Open Today</span>
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-white/95 px-2 py-1 text-[10px] font-semibold text-text-primary shadow-card sm:right-3 sm:top-3 sm:px-2.5 sm:text-[11px]"
                >
                  <Star size={12} className="shrink-0 fill-[#F4A83A] text-[#F4A83A]" />
                  <span className="whitespace-nowrap">40+ Yrs Exp.</span>
                </motion.span>
              </div>

              <div className="p-3 sm:p-4">
                <p className="text-[11px] font-semibold tracking-wide text-secondary">ORTHOPAEDIC SURGEON</p>
                <h3 className="mt-0.5 break-words text-[16px] font-bold text-text-primary sm:text-[17px]">Dr. Nazim Shaikh, M.S. (Ortho)</h3>
                <p className="mt-0.5 break-words text-[12.5px] text-text-secondary sm:text-[13px]">
                  Fellowship: I.P.T.M. (Israel) · Fellowship (Portugal) · Secretary, MMERC
                </p>

                <div className="mt-3 flex flex-col items-start gap-2.5 rounded-lg bg-surface-soft px-3 py-2.5 min-[400px]:flex-row min-[400px]:items-center min-[400px]:justify-between">
                  <div className="min-w-0">
                    <p className="text-[11px] font-medium text-text-secondary">Next OPD Slot</p>
                    <p className="text-[13px] font-semibold text-text-primary sm:text-[13.5px]">Today, 6:00 PM Onwards</p>
                  </div>
                  <Button as="a" href="tel:+912026138375" size="sm" className="w-full shrink-0 min-[400px]:w-auto">Call Now</Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* SPECIALTIES / SERVICES                                           */}
      {/* ================================================================ */}
      <section id="specialties" className="bg-surface-soft py-10 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-content px-4 sm:px-6">
          <SectionTitle
            eyebrow="Our Services"
            heading="Complete Orthopaedic & Surgical Care"
            description="From fracture treatment to non-surgical pain relief, general surgery, and paediatric care — all under one roof."
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
           {SPECIALTIES.map((item, i) => (
  <SpecialityCard key={item.slug} {...item} index={i} />
))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* ORTHOPAEDIC & TRAUMA — full treatment list                       */}
      {/* ================================================================ */}
      <section className="py-10 sm:py-16 lg:py-20">
        <div className="mx-auto grid max-w-content gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="order-2 overflow-hidden rounded-xl border border-border shadow-card lg:order-1"
          >
            <img
              src="https://images.unsplash.com/photo-1612531386530-97286d97c2d2?q=80&w=800&auto=format&fit=crop"
              alt="Orthopaedic surgeon reviewing a patient's knee and joint condition"
              loading="lazy"
              className="h-48 w-full object-cover sm:h-64 lg:h-80"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="order-1 min-w-0 lg:order-2"
          >
            <span className="text-[13px] font-semibold tracking-wide text-secondary">Orthopaedic &amp; Trauma Care</span>
            <h2 className="mt-2 text-[22px] font-bold leading-tight text-text-primary sm:text-[30px]">
              Fracture, Arthritis & Joint Treatment
            </h2>
            <p className="mt-3 text-[14px] leading-relaxed text-text-secondary sm:text-[15px]">
              A complete range of orthopaedic consultation and treatment — from acute fractures
              and trauma to long-standing arthritis and joint disease.
            </p>
            <ul className="mt-5 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
              {[
                'Consultation',
                'Fracture treatment',
                'Treatment of old malunited fractures',
                'Arthritis treatment due to old age',
                'Rheumatoid arthritis treatment',
                'Trauma injuries',
                'Sport injuries',
                'Arthroscopic treatment of the knee',
                'Joint replacement surgery',
                'Operative treatment',
              ].map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-[14px] text-text-primary">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-surface-soft text-primary">
                    <Bone size={12} />
                  </span>
                  <span className="min-w-0">{point}</span>
                </li>
              ))}
            </ul>
            <Button as="a" href="#physicians" variant="secondary" size="md" className="mt-6 w-full gap-1.5 sm:w-auto">
              Book a Consultation <ArrowRight size={15} />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* NON-SURGICAL PAIN THERAPY — detail section                       */}
      {/* ================================================================ */}
      <section className="py-10 sm:py-16 lg:py-20">
        <div className="mx-auto grid max-w-content gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="min-w-0"
          >
            <span className="text-[13px] font-semibold tracking-wide text-secondary">Treatment Without Surgery</span>
            <h2 className="mt-2 text-[22px] font-bold leading-tight text-text-primary sm:text-[30px]">
              Many pain disorders can be treated without surgery
            </h2>
            <p className="mt-3 text-[14px] leading-relaxed text-text-secondary sm:text-[15px]">
              Using intra-articular injections and trigger-point injections, our team relieves
              pain and restores mobility for conditions that don't require an operation —
              followed by guided physiotherapy for lasting recovery.
            </p>
            <ul className="mt-5 space-y-3">
              {[
                'Frozen shoulder & painful heel',
                'Spinal pain and sciatica relief',
                'Trigger-point injection therapy',
                'Structured physiotherapy programs',
              ].map((point) => (
                <li key={point} className="flex items-center gap-2.5 text-[14px] text-text-primary">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-surface-soft text-secondary">
                    <Syringe size={12} />
                  </span>
                  <span className="min-w-0">{point}</span>
                </li>
              ))}
            </ul>
            <Button as="a" href="#physicians" variant="secondary" size="md" className="mt-6 w-full gap-1.5 sm:w-auto">
              Discuss Your Symptoms <ArrowRight size={15} />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="overflow-hidden rounded-xl border border-border shadow-card"
          >
            <img
  src="https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?q=80&w=800&auto=format&fit=crop"
  alt="Physiotherapist guiding a patient through a shoulder mobility exercise"
  loading="lazy"
  className="h-48 w-full object-cover sm:h-64 lg:h-80"
/>
          </motion.div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* GENERAL & PLASTIC SURGERY — full treatment list                  */}
      {/* ================================================================ */}
      <section className="bg-surface-soft py-10 sm:py-16 lg:py-20">
        <div className="mx-auto grid max-w-content gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="min-w-0"
          >
            <span className="text-[13px] font-semibold tracking-wide text-secondary">General &amp; Plastic Surgery</span>
            <h2 className="mt-2 text-[22px] font-bold leading-tight text-text-primary sm:text-[30px]">
              Surgical Care for All Ages
            </h2>
            <p className="mt-3 text-[14px] leading-relaxed text-text-secondary sm:text-[15px]">
              Beyond orthopaedics, Modern Hospital offers general surgical treatment and
              paediatric surgical correction for children with congenital conditions.
            </p>

            <div className="mt-5 grid grid-cols-1 gap-6 min-[420px]:grid-cols-2">
              <div className="min-w-0">
                <h3 className="text-[13px] font-semibold text-text-primary">General Surgery</h3>
                <ul className="mt-3 space-y-2.5">
                  {['Appendix', 'Hernia', 'Hydrocele', 'Swellings & non-healing ulcers (limbs)'].map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-[13.5px] text-text-secondary">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-primary">
                        <Scissors size={11} />
                      </span>
                      <span className="min-w-0">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="min-w-0">
                <h3 className="text-[13px] font-semibold text-text-primary">Plastic &amp; Paediatric Surgery</h3>
                <ul className="mt-3 space-y-2.5">
                  {['Paediatric surgery', 'Club foot surgery', 'Childhood deformity treatment'].map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-[13.5px] text-text-secondary">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-primary">
                        <Baby size={11} />
                      </span>
                      <span className="min-w-0">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Button as="a" href="#physicians" variant="secondary" size="md" className="mt-6 w-full gap-1.5 sm:w-auto">
              Ask About Your Condition <ArrowRight size={15} />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-2 gap-4"
          >
            <img
              src="https://images.unsplash.com/photo-1640876777002-badf6aee5bcc?q=80&w=500&auto=format&fit=crop"
              alt="Surgical team performing a procedure in a modern operating room"
              loading="lazy"
              className="col-span-2 h-32 w-full rounded-xl border border-border object-cover shadow-card min-[400px]:h-36 sm:h-48"
            />
            <img
              src="https://images.unsplash.com/photo-1758691462126-2ee47c8bf9e7?q=80&w=500&auto=format&fit=crop"
              alt="Doctor consulting with a mother and child about paediatric care"
              loading="lazy"
              className="col-span-2 h-32 w-full rounded-xl border border-border object-cover shadow-card min-[400px]:h-36 sm:h-48"
            />
          </motion.div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* PHYSICIAN DIRECTORY                                              */}
      {/* ================================================================ */}
      <section id="physicians" className="py-10 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-content px-4 sm:px-6">
          <SectionTitle
            eyebrow="Meet Our Doctors"
            heading="Our Orthopaedic Surgeons"
            action={
              <span className="inline-flex flex-wrap items-center gap-1.5 text-[13px] text-text-secondary">
                <CalendarClock size={14} className="shrink-0" />
                OPD: <strong className="text-text-primary">10 AM–2 PM &amp; 6–8 PM</strong>
              </span>
            }
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {DOCTORS.map((doc, i) => (
              <DoctorCard key={doc.name} doctor={doc} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* OPD TIMINGS, FEES & LOCATIONS                                    */}
      {/* ================================================================ */}
      <section id="timings" className="bg-surface-soft py-10 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-content px-4 sm:px-6">
         <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {/* OPD & Fees card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6 }}
              className="rounded-xl border border-border bg-white p-4 shadow-card sm:p-6"
            >
              <div className="flex items-center gap-2">
                <Timer size={18} className="shrink-0 text-primary" />
                <h3 className="text-[15px] font-semibold text-text-primary sm:text-[16px]">OPD Timings &amp; Fees</h3>
              </div>

              <div className="mt-4 divide-y divide-border">
                <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 py-3">
                  <span className="text-[13px] text-text-secondary sm:text-[13.5px]">Morning OPD</span>
                  <span className="text-right text-[13.5px] font-semibold text-text-primary sm:text-[14px]">10:00 AM – 2:00 PM</span>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 py-3">
                  <span className="text-[13px] text-text-secondary sm:text-[13.5px]">Evening OPD</span>
                  <span className="text-right text-[13.5px] font-semibold text-text-primary sm:text-[14px]">6:00 PM – 8:00 PM</span>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 py-3">
                  <span className="text-[13px] text-text-secondary sm:text-[13.5px]">Emergency Care</span>
                  <span className="text-right text-[13.5px] font-semibold text-danger sm:text-[14px]">Available 24 Hours</span>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 py-3">
                  <span className="text-[13px] text-text-secondary sm:text-[13.5px]">Consultation Fee</span>
                  <span className="text-right text-[13.5px] font-semibold text-text-primary sm:text-[14px]">₹600</span>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 py-3">
                  <span className="text-[13px] text-text-secondary sm:text-[13.5px]">Follow-up Fee (within 1 month)</span>
                  <span className="text-right text-[13.5px] font-semibold text-text-primary sm:text-[14px]">₹500</span>
                </div>
              </div>

              <Button as="a" href="tel:+912026138375" variant="primary" size="md" className="mt-4 w-full gap-1.5">
                <PhoneCall size={15} /> Call to Book: 26138375
              </Button>
            </motion.div>

            {/* Locations */}
            <div className="flex flex-col gap-4" id="locations">
              {LOCATIONS.map((loc, i) => (
                <motion.div
                  key={loc.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
                  className="rounded-xl border border-border bg-white p-4 shadow-card sm:p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-start gap-3">
                      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-soft text-primary">
                        <Building2 size={17} />
                      </span>
                      <div className="min-w-0">
                        <h4 className="break-words text-[14.5px] font-semibold text-text-primary sm:text-[15px]">{loc.name}</h4>
                        <span className="text-[11px] font-semibold text-secondary">{loc.tag}</span>
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 flex items-start gap-2 text-[13px] text-text-secondary">
                    <MapPin size={14} className="mt-0.5 shrink-0" /> <span className="min-w-0">{loc.address}</span>
                  </p>
                  <a
                    href={loc.phoneHref}
                    className="mt-2 flex items-center gap-2 text-[13px] font-medium text-primary hover:text-primary-dark"
                  >
                    <Phone size={14} className="shrink-0" /> {loc.phone}
                  </a>
                  <p className="mt-2 flex items-center gap-2 text-[12.5px] text-text-secondary">
                    <Clock3 size={13} className="shrink-0" /> <span className="min-w-0">{loc.hours}</span>
                  </p>
                  <p className="mt-1 text-[11.5px] text-text-secondary">{loc.extra}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* WHY CHOOSE MODERN HOSPITAL                                       */}
      {/* ================================================================ */}
      <section className="py-10 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-content px-4 sm:px-6">
          <SectionTitle
            eyebrow="Why Modern Hospital"
            heading="Trusted, Experienced, Accessible"
            description="Four decades of orthopaedic practice, internationally fellowship-trained surgeons, and straightforward pricing."
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {WHY_US.map((item, i) => (
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
      {/* FAQ                                                              */}
      {/* ================================================================ */}
      <section id="faqs" className="bg-surface-soft py-10 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-content px-4 sm:px-6">
          <SectionTitle
            eyebrow="FAQs"
            heading="Questions Patients Ask Us Most"
            description="Straightforward answers before your visit. Call us if you don't see what you're looking for."
          />
          <div className="mx-auto max-w-2xl">
            {FAQS.map((faq, i) => (
              <FaqItem key={faq.question} faq={faq} index={i} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto mt-6 flex max-w-2xl flex-col items-start justify-between gap-3 rounded-xl border border-border bg-white p-4 shadow-card sm:flex-row sm:items-center sm:p-5"
          >
            <p className="flex items-start gap-2 text-[13.5px] text-text-primary">
              <HelpCircle size={16} className="mt-0.5 shrink-0 text-primary" />
              <span className="min-w-0">Still have a question? Reception can help directly.</span>
            </p>
            <Button as="a" href="tel:+912026138375" size="sm" className="w-full shrink-0 gap-1.5 sm:w-auto">
              <PhoneCall size={14} /> Call 26138375
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* EMERGENCY / BOOKING CTA STRIP                                    */}
      {/* ================================================================ */}
      <section className="border-y border-border bg-danger">
        <div className="mx-auto flex max-w-content flex-col items-start justify-between gap-3 px-4 py-4 text-white sm:flex-row sm:items-center sm:px-6">
          <div className="flex items-center gap-2.5 text-[13.5px] font-semibold sm:text-[15px]">
            <Ambulance size={18} className="shrink-0" />
            Emergency care available 24 hours a day
          </div>
          <div className="flex w-full flex-col gap-2 min-[420px]:flex-row min-[420px]:flex-wrap sm:w-auto">
            <Button as="a" href="tel:+912026138375" variant="secondary" size="sm" className="w-full border-white/30 bg-white text-danger hover:bg-white/90 min-[420px]:flex-1 sm:w-auto sm:flex-none">
              Call Nana Peth: 26138375
            </Button>
            <Button as="a" href="tel:+917769976833" variant="secondary" size="sm" className="w-full border-white/30 bg-white text-danger hover:bg-white/90 min-[420px]:flex-1 sm:w-auto sm:flex-none">
              Call Kondhwa: 77699 76833
            </Button>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* FOOTER                                                           */}
      {/* ================================================================ */}
      

      {/* ================================================================ */}
      {/* MOBILE BOTTOM NAV                                                */}
      {/* ================================================================ */}
      <nav
        aria-label="Mobile quick actions"
        className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-border bg-white shadow-[0_-4px_16px_rgba(15,23,42,0.08)] md:hidden"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <a href="tel:+912026138375" className="flex min-h-[52px] flex-col items-center justify-center gap-0.5 py-2.5 text-[11px] font-semibold text-danger">
          <Ambulance size={18} />
          Emergency
        </a>
        <a href="#physicians" className="flex min-h-[52px] flex-col items-center justify-center gap-0.5 py-2.5 text-[11px] font-semibold text-text-primary">
          <Stethoscope size={18} />
          Doctors
        </a>
        <a href="#timings" className="flex min-h-[52px] flex-col items-center justify-center gap-0.5 py-2.5 text-[11px] font-semibold text-primary">
          <CalendarClock size={18} />
          Book Visit
        </a>
      </nav>
    </div>
  )
}

function FaqItem({ faq, index }) {
  const [open, setOpen] = useState(index === 0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
      className="mb-3 overflow-hidden rounded-xl border border-border bg-white shadow-card"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex min-h-[48px] w-full items-center justify-between gap-3 px-4 py-3.5 text-left sm:px-5 sm:py-4"
      >
        <span className="min-w-0 text-[13.5px] font-semibold text-text-primary sm:text-[14.5px]">{faq.question}</span>
        <ChevronDown
          size={17}
          className={`shrink-0 text-secondary transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <p className="px-4 pb-4 text-[13px] leading-relaxed text-text-secondary sm:text-[13.5px] sm:px-5">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}