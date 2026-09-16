import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Phone,
  ShieldAlert,
  Search,
  ChevronDown,
  Menu,
  X,
  Globe,
  UserCircle2,
  Cross,
  Bone,
  Activity,
  ShieldPlus,
  Syringe,
  Scissors,
  Baby,
  ArrowRight,
} from 'lucide-react'
import Button from './Button.jsx'
import { SPECIALTIES } from '../data/specialties.js'


const SPECIALTY_ICONS = { Bone, Activity, ShieldPlus, Syringe, Scissors, Baby }

// Page routes use `to` (React Router Link). In-page anchors (like the
// Specialties mega menu, which scrolls to a section on the current page)
// use `href`. Mixing these up was causing internal route links to behave
// like plain page reloads instead of proper SPA navigation.
const NAV_LINKS = [
  { label: 'Home', to: '/home' },
  { label: 'About Us', to: '/aboutus' },
  { label: 'Specialties', href: '#specialties', megaMenu: true },
  { label: 'Book consultation', to: '/bookconsultation' },
]

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'instant' })

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [specialtiesOpen, setSpecialtiesOpen] = useState(false)
  const [mobileSpecialtiesOpen, setMobileSpecialtiesOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // NOTE ON BREAKPOINTS:
  // The mobile menu toggle and the desktop nav/search/controls now all
  // switch together at `lg` (1024px). Previously the mobile menu vanished
  // at `md` (768px) while the desktop nav links didn't appear until `xl`
  // (1280px), leaving tablets and small laptops with no way to navigate
  // at all. Keeping every "desktop chrome" element on the same
  // breakpoint (lg) and every "mobile chrome" element on lg:hidden fixes
  // that dead zone.

  return (
    <header className="sticky top-0 z-50">
      {/* Emergency Bar */}
      <div className="bg-danger text-white">
        <div className="mx-auto grid max-w-content grid-cols-[1fr_auto_1fr] items-center gap-2 px-4 py-1.5 text-[11px] sm:px-6 sm:text-[11.5px]">
          {/* Left: emergency label (short on mobile, full from sm) */}
          <div className="flex items-center gap-1.5 font-semibold tracking-wide">
            <ShieldAlert size={13} className="shrink-0" />
            <span className="hidden sm:inline">24-HOUR EMERGENCY CARE</span>
            <span className="sm:hidden">EMERGENCY</span>
          </div>

          {/* Center: OPD status, hidden on the smallest screens to avoid crowding */}
          <div className="hidden items-center gap-1 whitespace-nowrap font-medium sm:flex">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white/90 animate-pulse" />
            OPD: 10 AM–2 PM &amp; 6–8 PM
          </div>

          {/* Right: always-reachable call action, scaling up to full numbers */}
          <div className="flex items-center justify-end gap-3">
            <a
              href="tel:+912026138375"
              className="hidden items-center gap-1.5 font-medium md:flex hover:underline"
            >
              <Phone size={12} />
              Nana Peth: 26138375
            </a>
            <a
              href="tel:+917769976833"
              className="hidden items-center gap-1.5 font-semibold lg:flex hover:underline"
            >
              <Phone size={12} />
              Kondhwa: 77699 76833
            </a>
            <a
              href="tel:+912026138375"
              aria-label="Call emergency line"
              className="flex items-center gap-1 font-semibold md:hidden"
            >
              <Phone size={12} />
              Call
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div
        className={`bg-white/95 backdrop-blur transition-shadow duration-300 ${
          scrolled ? 'shadow-[0_1px_0_0_var(--border)]' : ''
        }`}
      >
        <nav className="mx-auto flex max-w-content items-center justify-between gap-4 px-4 py-3 sm:px-6">
          {/* Logo */}
          <Link to="/" onClick={scrollToTop} className="flex min-w-0 items-center gap-2.5 shrink-0">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-white">
              <Cross size={18} strokeWidth={2.4} />
            </span>
            <span className="min-w-0 leading-tight">
              <span className="block truncate text-[15px] font-bold tracking-tight text-primary">
                Modern Hospital
              </span>
              <span className="block truncate text-[10px] font-semibold tracking-wider text-text-secondary">
                ORTHOPAEDIC &amp; GENERAL SURGERY
              </span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-6 lg:flex">
            {NAV_LINKS.map((link) =>
              link.megaMenu ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setSpecialtiesOpen(true)}
                  onMouseLeave={() => setSpecialtiesOpen(false)}
                >
                  <a
                    href={link.href}
                    className="flex items-center gap-1 text-[13.5px] font-medium text-text-primary/80 hover:text-primary transition-colors"
                  >
                    {link.label}
                    <ChevronDown
                      size={13}
                      className={`transition-transform duration-200 ${specialtiesOpen ? 'rotate-180' : ''}`}
                    />
                  </a>

                  <AnimatePresence>
                    {specialtiesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.18, ease: 'easeOut' }}
                        className="absolute left-1/2 top-full z-50 mt-3 w-[min(560px,90vw)] -translate-x-1/2 rounded-xl border border-border bg-white p-4 shadow-elevated"
                      >
                        <div className="grid grid-cols-2 gap-1.5">
                          {SPECIALTIES.map((item) => {
                            const Icon = SPECIALTY_ICONS[item.icon] ?? Bone
                            return (
                              <Link
                                key={item.slug}
                                to={`/specialties/${item.slug}`}
                                onClick={() => {
                                  setSpecialtiesOpen(false)
                                  scrollToTop()
                                }}
                                className="flex items-start gap-3 rounded-lg p-2.5 hover:bg-surface-soft"
                              >
                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-soft text-primary">
                                  <Icon size={17} strokeWidth={1.75} />
                                </span>
                                <span>
                                  <span className="block text-[13px] font-semibold text-text-primary">
                                    {item.title}
                                  </span>
                                  <span className="mt-0.5 block text-[11.5px] leading-snug text-text-secondary">
                                    {item.badge}
                                  </span>
                                </span>
                              </Link>
                            )
                          })}
                        </div>
                        <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                          <span className="text-[12px] text-text-secondary">
                            Not sure which one you need?
                          </span>
                          <a
                            href="#specialties"
                            onClick={() => setSpecialtiesOpen(false)}
                            className="inline-flex items-center gap-1 text-[12.5px] font-semibold text-primary hover:text-primary-dark"
                          >
                            View all specialties <ArrowRight size={13} />
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={scrollToTop}
                  className="text-[13.5px] font-medium text-text-primary/80 hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* Search - appears alongside the desktop nav at the same breakpoint */}
          <div className="hidden max-w-[220px] flex-1 items-center gap-2 rounded-lg border border-border bg-surface-soft px-3 py-2 lg:flex">
            <Search size={14} className="text-text-secondary shrink-0" />
            <input
              type="text"
              placeholder="Search doctors, treatments, conditions..."
              aria-label="Search doctors or conditions"
              className="w-full bg-transparent text-[13px] text-text-primary placeholder:text-text-secondary focus:outline-none"
            />
          </div>

          {/* Right controls - same breakpoint as the nav links/search so they never appear alone */}
          <div className="hidden items-center gap-3 lg:flex">
            <button className="flex items-center gap-1 text-[13px] font-medium text-text-primary/80 hover:text-primary">
              <Globe size={15} />
              EN
              <ChevronDown size={13} />
            </button>
            <Button as={Link} to="/bookconsultation" onClick={scrollToTop} size="md" className="shrink-0">
  Schedule Visit
</Button>
            <UserCircle2 size={30} className="text-text-secondary/70" strokeWidth={1.5} />
          </div>

          {/* Mobile controls - covers everything below lg (phones AND tablets) */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border text-text-primary"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>

        {/* Mobile menu (now correctly covers phones + tablets, matching lg:hidden above) */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="overflow-hidden border-t border-border bg-white lg:hidden"
            >
              <div className="flex flex-col gap-1 px-4 py-4">
                <div className="mb-2 flex items-center gap-2 rounded-lg border border-border bg-surface-soft px-3 py-2">
                  <Search size={14} className="text-text-secondary shrink-0" />
                  <input
                    type="text"
                    placeholder="Search doctors, treatments, conditions..."
                    aria-label="Search doctors or conditions"
                    className="w-full bg-transparent text-[13px] focus:outline-none"
                  />
                </div>

                {NAV_LINKS.map((link) =>
                  link.megaMenu ? (
                    <div key={link.label}>
                      <button
                        type="button"
                        onClick={() => setMobileSpecialtiesOpen((v) => !v)}
                        aria-expanded={mobileSpecialtiesOpen}
                        className="flex w-full items-center justify-between rounded-lg px-2 py-2.5 text-[14px] font-medium text-text-primary hover:bg-surface-soft"
                      >
                        {link.label}
                        <ChevronDown
                          size={16}
                          className={`transition-transform duration-200 ${
                            mobileSpecialtiesOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {mobileSpecialtiesOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.22, ease: 'easeOut' }}
                            className="overflow-hidden pl-2"
                          >
                            {/* On small phones (2-col grid) this reads better than a single tall list */}
                            <div className="grid grid-cols-1 gap-0.5 xs:grid-cols-2">
                              {SPECIALTIES.map((item) => (
                                <Link
                                  key={item.slug}
                                  to={`/specialties/${item.slug}`}
                                  onClick={() => {
                                    setMenuOpen(false)
                                    setMobileSpecialtiesOpen(false)
                                    scrollToTop()
                                  }}
                                  className="block rounded-lg px-2 py-2 text-[13.5px] text-text-secondary hover:bg-surface-soft hover:text-text-primary"
                                >
                                  {item.title}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      key={link.label}
                      to={link.to}
                      onClick={() => {
                        setMenuOpen(false)
                        scrollToTop()
                      }}
                      className="rounded-lg px-2 py-2.5 text-[14px] font-medium text-text-primary hover:bg-surface-soft"
                    >
                      {link.label}
                    </Link>
                  )
                )}

                {/* Quick actions that were desktop-only before now surface for tablets too */}
                <div className="mt-2 flex items-center justify-between border-t border-border pt-3">
                  <button className="flex items-center gap-1 text-[13px] font-medium text-text-primary/80 hover:text-primary">
                    <Globe size={15} />
                    EN
                    <ChevronDown size={13} />
                  </button>
                  <UserCircle2 size={28} className="text-text-secondary/70" strokeWidth={1.5} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Quick Info Strip - desktop/tablet detail bar, intentionally hidden on phones */}
      <div className="hidden border-b border-border bg-white sm:block">
        <div className="mx-auto flex max-w-content flex-wrap items-center justify-between gap-2 px-6 py-1.5 text-[11px]">
          <div className="flex flex-wrap items-center gap-3 text-text-secondary">
            <span className="font-semibold tracking-wide text-text-secondary/80">MODERN HOSPITAL</span>
            <span className="text-text-secondary">461, Nana Peth, Sant Kabir Chowk, Pune 411002</span>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-text-secondary">
            <span>Regd. No. LCBP070800362</span>
            <span className="hidden rounded bg-surface-soft px-1.5 py-0.5 text-[10px] font-semibold text-primary lg:inline">
              40+ Years Orthopaedic Experience
            </span>
            <span className="hidden text-text-secondary xl:inline">Consultation ₹600 · Follow-up ₹500</span>
          </div>
        </div>
      </div>
    </header>
  )
}