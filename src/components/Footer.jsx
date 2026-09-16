import { Link } from 'react-router-dom'
import { Building2, MapPin, Phone, Ambulance } from 'lucide-react'

// ---------------------------------------------------------------------------
// Site footer, extracted from Home.jsx so it can be reused across pages
// (Home, About Us, Book Consultation, etc). Keep hospital info in sync with
// the LOCATIONS array in Home.jsx if it ever changes.
// ---------------------------------------------------------------------------

const SPECIALTIES = [
  { name: 'Fracture & Trauma Care', href: '/specialties/fracture-trauma-care' },
  { name: 'Joint Replacement & Arthroscopy', href: '/specialties/joint-replacement-arthroscopy' },
  { name: 'Arthritis & Rheumatology Care', href: '/specialties/arthritis-rheumatology-care' },
  { name: 'Non-Surgical Pain & Injections', href: '/specialties/non-surgical-pain-injection-therapy' },
  { name: 'General Surgery', href: '/specialties/General-surgery' },
  { name: 'Paediatric & Plastic Surgery', href: '/specialties/paediatric-plastic-surgery' },
]

const PATIENT_INFO = [
  'OPD Timings: 10–2 & 6–8',
  'Consultation Fee: ₹600',
  'Follow-up Fee: ₹500',
  'Dr. Nazim Shaikh, M.S. (Ortho)',
  'Dr. Shoaib Nazim Shaikh, DNB',
  'Dr. Sarwat Hospital, Kondhwa',
]

export default function Footer() {
  return (
    <footer className="bg-[var(--primary-dark)] text-white/80">
      <div className="mx-auto max-w-content px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white">
                <Building2 size={18} />
              </span>
              <span className="text-[15px] font-bold text-white">Modern Hospital</span>
            </div>
            <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-white/60">
              Orthopaedic, general, and paediatric surgical care in Pune, led by
              internationally fellowship-trained surgeons with 40+ years of combined
              experience.
            </p>
            <div className="mt-4 space-y-1.5 text-[13px] text-white/70">
              <p className="flex items-center gap-2">
                <MapPin size={14} /> 461, Nana Peth, Sant Kabir Chowk, Pune – 411002
              </p>
              <p className="flex items-center gap-2">
                <Phone size={14} /> 26138375
              </p>
              <p className="flex items-center gap-2">
                <Ambulance size={14} /> Emergency: Available 24 Hours
              </p>
            </div>
          </div>

          <FooterLinkColumn title="Specialties" items={SPECIALTIES} />
          <FooterColumn title="Patient Info" items={PATIENT_INFO} />
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-[12.5px] text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; 2025 Modern Hospital, Pune. All rights reserved.</p>
          <p>Regd. No. LCBP070800362</p>
        </div>
      </div>
    </footer>
  )
}

function FooterLinkColumn({ title, items }) {
  return (
    <div>
      <h4 className="text-[13px] font-semibold text-white">{title}</h4>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item.name}>
            <Link
              to={item.href}
              className="text-[13px] text-white/60 transition-colors hover:text-white"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function FooterColumn({ title, items }) {
  return (
    <div>
      <h4 className="text-[13px] font-semibold text-white">{title}</h4>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item} className="text-[13px] text-white/60">
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}