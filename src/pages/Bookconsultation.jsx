import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CalendarClock,
  User,
  Phone,
  Stethoscope,
  Building2,
  Clock3,
  Wallet,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  MapPin,
  Ambulance,
  ArrowLeft,
  Sun,
  Moon,
} from 'lucide-react'

import Button from '../components/Button.jsx'

// ---------------------------------------------------------------------------
// Booking form. On submit we first save the request to the backend API,
// then open WhatsApp with a pre-filled message to the hospital's reception
// number. If the backend call fails (e.g. slot already booked), WhatsApp is
// not opened and the error is shown inline instead.
// ---------------------------------------------------------------------------

const RECEPTION_WHATSAPP = '917769976833' // country code + number, no +
const RECEPTION_PHONE = 'tel:+912026138375'

// `branch` here is where each surgeon usually consults — selecting a doctor
// moves the branch to match, and the patient can still change it afterwards.
const DOCTORS = [
  {
    id: 'nazim',
    name: 'Dr. Nazim Shaikh',
    detail: 'M.S. (Ortho) · 40 yrs · Trauma, Joints, Spine',
    branch: 'nanapeth',
  },
  {
    id: 'shoaib',
    name: 'Dr. Shoaib Nazim Shaikh',
    detail: 'DNB (Ortho) · Joint Replacement, Arthroscopy',
    branch: 'kondhwa',
  },
  {
    id: 'any',
    name: 'Any available surgeon',
    detail: 'Whoever is free at your preferred time',
    branch: null,
  },
]

const BRANCHES = [
  { id: 'nanapeth', name: 'Modern Hospital, Nana Peth', detail: '461, Sant Kabir Chowk, Pune 411002' },
  { id: 'kondhwa', name: 'Dr. Sarwat Hospital, Kondhwa', detail: 'Mitha Nagar, Lane 2, Kondhwa Kh., Pune 411048' },
]

const REASONS = [
  'Fracture or injury',
  'Knee / joint pain',
  'Back pain or sciatica',
  'Arthritis follow-up',
  'Frozen shoulder / heel pain',
  'General surgery (hernia, appendix)',
  'Child / paediatric concern',
  'Something else',
]

const MORNING_SLOTS = ['10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM']
const EVENING_SLOTS = ['6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM']

const VISIT_TYPES = [
  { id: 'new', label: 'First visit', fee: 600, note: 'Consultation fee' },
  { id: 'followup', label: 'Follow-up', fee: 500, note: 'Within 1 month of first visit' },
]

function todayISO() {
  const d = new Date()
  return d.toISOString().split('T')[0]
}

// Converts a display slot like "10:30 AM" into backend-friendly "10:30:00"
function to24HourTime(slot) {
  const [time, period] = slot.split(' ')
  let [hours, minutes] = time.split(':').map(Number)
  if (period === 'PM' && hours !== 12) hours += 12
  if (period === 'AM' && hours === 12) hours = 0
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`
}

export default function Bookconsultation() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    age: '',
    doctor: 'nazim',
    branch: 'nanapeth',
    visitType: 'new',
    date: todayISO(),
    slot: '',
    reason: '',
    notes: '',
  })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const set = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }))
    setErrors((e) => ({ ...e, [key]: undefined }))
  }

  // Picking a doctor also moves the branch to where that surgeon consults.
  // "Any available surgeon" leaves whatever branch the patient already chose.
  const selectDoctor = (doctorId) => {
    const doctor = DOCTORS.find((d) => d.id === doctorId)
    setForm((f) => ({
      ...f,
      doctor: doctorId,
      branch: doctor?.branch ?? f.branch,
    }))
  }

  const selectedDoctor = DOCTORS.find((d) => d.id === form.doctor)
  const selectedBranch = BRANCHES.find((b) => b.id === form.branch)
  const selectedVisit = VISIT_TYPES.find((v) => v.id === form.visitType)

  const isSunday = useMemo(() => {
    if (!form.date) return false
    return new Date(`${form.date}T00:00:00`).getDay() === 0
  }, [form.date])

  function validate() {
    const next = {}
    if (form.name.trim().length < 2) next.name = 'Please enter the patient\u2019s name.'
    if (!/^[0-9]{10}$/.test(form.phone.replace(/\s/g, ''))) next.phone = 'Enter a 10-digit mobile number.'
    if (form.age && (Number(form.age) < 0 || Number(form.age) > 120)) next.age = 'Enter a valid age.'
    if (!form.date) next.date = 'Pick a date for the visit.'
    if (!form.slot) next.slot = 'Choose a time slot.'
    if (!form.reason) next.reason = 'Tell us what the visit is for.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function sendToWhatsApp() {
    const lines = [
      'Appointment request — Modern Hospital',
      `Patient: ${form.name}${form.age ? `, ${form.age} yrs` : ''}`,
      `Mobile: ${form.phone}`,
      `Doctor: ${selectedDoctor.name}`,
      `Branch: ${selectedBranch.name}`,
      `Date & time: ${form.date} at ${form.slot}`,
      `Visit type: ${selectedVisit.label} (\u20B9${selectedVisit.fee})`,
      `Reason: ${form.reason}`,
      form.notes ? `Notes: ${form.notes}` : null,
    ].filter(Boolean)

    const url = `https://wa.me/${RECEPTION_WHATSAPP}?text=${encodeURIComponent(lines.join('\n'))}`
    window.open(url, '_blank', 'noopener')
  }

  // Saves the booking to the Spring Boot backend. Throws with the server's
  // error message on failure (e.g. duplicate slot -> 409 Conflict).
  async function saveToBackend() {
    const payload = {
      fullName: form.name,
      mobileNumber: form.phone,
      age: form.age ? Number(form.age) : null,
      visitType: selectedVisit.label, // "First visit" / "Follow-up"
      doctor: selectedDoctor.name,
      branch: selectedBranch.name,
      appointmentDate: form.date, // already "YYYY-MM-DD"
      appointmentTime: to24HourTime(form.slot),
      reason: form.reason,
      notes: form.notes || null,
    }

    const response = await fetch(`${import.meta.env.VITE_API_URL}/consultations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Could not save your request. Please try again.')
    }

    return data
  }

  async function handleSubmit() {
    if (!validate()) {
      const firstError = document.querySelector('[data-error="true"]')
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }

    setSubmitting(true)
    setSubmitError('')

    try {
      await saveToBackend()
      sendToWhatsApp()
      setSubmitted(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      setSubmitError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  // -------------------------------------------------------------- confirmed
  if (submitted) {
    return (
      <div className="min-h-screen bg-background pb-16 md:pb-0">
      
        <section className="mx-auto max-w-content px-4 py-16 sm:px-6 sm:py-24">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-xl rounded-2xl border border-border bg-white p-6 text-center shadow-elevated sm:p-8"
          >
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-surface-soft text-success">
              <CheckCircle2 size={28} />
            </span>
            <h1 className="mt-4 text-[22px] font-bold text-text-primary sm:text-[26px]">
              Request sent to reception
            </h1>
            <p className="mt-2 text-[14px] leading-relaxed text-text-secondary">
              We&apos;ve opened WhatsApp with your details. Reception will confirm your slot by
              phone — usually within OPD hours. Nothing is booked until they confirm.
            </p>

            <div className="mt-5 space-y-2 rounded-xl bg-surface-soft p-4 text-left text-[13.5px]">
              <Row label="Patient" value={`${form.name}${form.age ? `, ${form.age} yrs` : ''}`} />
              <Row label="Doctor" value={selectedDoctor.name} />
              <Row label="Where" value={selectedBranch.name} />
              <Row label="When" value={`${form.date} · ${form.slot}`} />
              <Row label="Fee" value={`\u20B9${selectedVisit.fee} (${selectedVisit.label})`} />
            </div>

            <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-center">
              <Button as="a" href={RECEPTION_PHONE} size="md" className="gap-1.5">
                <Phone size={15} /> Call reception instead
              </Button>
              <Button as="a" href="/" variant="secondary" size="md" className="gap-1.5">
                <ArrowLeft size={15} /> Back to home
              </Button>
            </div>
          </motion.div>
        </section>
      </div>
    )
  }

  // ------------------------------------------------------------------- form
  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
    

      {/* Page header */}
      <section className="border-b border-border bg-surface-soft">
        <div className="mx-auto max-w-content px-4 py-8 sm:px-6 sm:py-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-[11.5px] font-semibold text-secondary shadow-card">
            <CalendarClock size={13} /> OPD Appointment
          </span>
          <h1 className="mt-3 text-[26px] font-extrabold leading-tight tracking-tight text-text-primary sm:text-[36px]">
            Book a Consultation
          </h1>
          <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-text-secondary">
            Fill in a few details and reception will call you back to confirm. For fractures,
            accidents, or anything urgent, don&apos;t wait for a slot — call us directly, emergency
            care runs 24 hours.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-content px-4 py-8 sm:px-6 sm:py-12">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.4fr_0.6fr] lg:items-start">
          {/* ---------------------------------------------------- form column */}
          <div className="flex flex-col gap-4">
            {/* Patient details */}
            <Card icon={User} title="Patient details">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Full name" error={errors.name} required>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => set('name', e.target.value)}
                    placeholder="Name as you'd like it on the file"
                    className={inputClass(errors.name)}
                  />
                </Field>
                <Field label="Mobile number" error={errors.phone} required>
                  <div className="flex">
                    <span className="flex items-center rounded-l-lg border border-r-0 border-border bg-surface-soft px-3 text-[14px] text-text-secondary">
                      +91
                    </span>
                    <input
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      value={form.phone}
                      onChange={(e) => set('phone', e.target.value.replace(/\D/g, ''))}
                      placeholder="10-digit number"
                      className={`${inputClass(errors.phone)} rounded-l-none`}
                    />
                  </div>
                </Field>
                <Field label="Age" error={errors.age} hint="Optional">
                  <input
                    type="number"
                    min="0"
                    max="120"
                    value={form.age}
                    onChange={(e) => set('age', e.target.value)}
                    placeholder="e.g. 46"
                    className={inputClass(errors.age)}
                  />
                </Field>
                <Field label="Visit type">
                  <div className="flex gap-2">
                    {VISIT_TYPES.map((v) => (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => set('visitType', v.id)}
                        className={`flex-1 rounded-lg border px-3 py-2.5 text-left text-[13px] font-medium transition-colors ${
                          form.visitType === v.id
                            ? 'border-primary bg-surface-soft text-primary'
                            : 'border-border text-text-primary hover:bg-surface-soft'
                        }`}
                      >
                        {v.label}
                        <span className="block text-[11px] font-normal text-text-secondary">
                          &#8377;{v.fee}
                        </span>
                      </button>
                    ))}
                  </div>
                </Field>
              </div>
            </Card>

            {/* Doctor & branch */}
            <Card icon={Stethoscope} title="Doctor & location">
              <Field label="Preferred doctor">
                <div className="flex flex-col gap-2">
                  {DOCTORS.map((d) => (
                    <SelectRow
                      key={d.id}
                      active={form.doctor === d.id}
                      onClick={() => selectDoctor(d.id)}
                      title={d.name}
                      detail={d.detail}
                    />
                  ))}
                </div>
              </Field>
              <Field
                label="Branch"
                hint={selectedDoctor.branch ? 'set from your doctor — change if needed' : 'optional'}
                className="mt-4"
              >
                <div className="flex flex-col gap-2">
                  {BRANCHES.map((b) => (
                    <SelectRow
                      key={b.id}
                      active={form.branch === b.id}
                      onClick={() => set('branch', b.id)}
                      title={b.name}
                      detail={b.detail}
                      icon={Building2}
                    />
                  ))}
                </div>
              </Field>
            </Card>

            {/* Date & slot */}
            <Card icon={CalendarClock} title="Date & time">
              <Field label="Preferred date" error={errors.date} required>
                <input
                  type="date"
                  min={todayISO()}
                  value={form.date}
                  onChange={(e) => set('date', e.target.value)}
                  className={`${inputClass(errors.date)} sm:max-w-[240px]`}
                />
              </Field>

              <AnimatePresence>
                {isSunday && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2 flex items-start gap-2 text-[12.5px] text-danger"
                  >
                    <AlertCircle size={14} className="mt-0.5 shrink-0" />
                    OPD runs Monday to Saturday. Sunday visits are emergency-only — please call
                    before coming.
                  </motion.p>
                )}
              </AnimatePresence>

              <div className="mt-5" data-error={errors.slot ? 'true' : undefined}>
                <SlotGroup
                  icon={Sun}
                  title="Morning OPD"
                  window="10:00 AM – 2:00 PM"
                  slots={MORNING_SLOTS}
                  selected={form.slot}
                  onSelect={(s) => set('slot', s)}
                />
                <SlotGroup
                  icon={Moon}
                  title="Evening OPD"
                  window="6:00 PM – 8:00 PM"
                  slots={EVENING_SLOTS}
                  selected={form.slot}
                  onSelect={(s) => set('slot', s)}
                  className="mt-4"
                />
                {errors.slot && <ErrorText text={errors.slot} />}
              </div>
            </Card>

            {/* Reason */}
            <Card icon={MessageCircle} title="What is the visit for?">
              <div data-error={errors.reason ? 'true' : undefined}>
                <div className="flex flex-wrap gap-2">
                  {REASONS.map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => set('reason', r)}
                      className={`rounded-full border px-3 py-1.5 text-[13px] font-medium transition-colors ${
                        form.reason === r
                          ? 'border-primary bg-surface-soft text-primary'
                          : 'border-border text-text-primary hover:bg-surface-soft'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
                {errors.reason && <ErrorText text={errors.reason} />}
              </div>

              <Field label="Anything the doctor should know beforehand?" hint="Optional" className="mt-4">
                <textarea
                  rows={3}
                  value={form.notes}
                  onChange={(e) => set('notes', e.target.value)}
                  placeholder="Existing reports, how long the pain has lasted, previous surgery..."
                  className={`${inputClass()} resize-none`}
                />
              </Field>
            </Card>

            <div className="flex flex-col gap-3 rounded-xl border border-border bg-white p-5 shadow-card sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[12.5px] leading-relaxed text-text-secondary">
                  Submitting opens WhatsApp with your details filled in. Your slot is confirmed only
                  once reception calls back.
                </p>
                {submitError && <ErrorText text={submitError} />}
              </div>
              <Button
                onClick={handleSubmit}
                size="lg"
                disabled={submitting}
                className="w-full shrink-0 gap-1.5 sm:w-auto"
              >
                <MessageCircle size={16} /> {submitting ? 'Sending...' : 'Send request'}
              </Button>
            </div>
          </div>

          {/* ------------------------------------------------- summary column */}
          <div className="flex flex-col gap-4 lg:sticky lg:top-32">
            <div className="rounded-xl border border-border bg-white p-5 shadow-card">
              <h3 className="text-[15px] font-semibold text-text-primary">Your request so far</h3>
              <div className="mt-3 space-y-2 text-[13px]">
                <Row label="Doctor" value={selectedDoctor.name} />
                <Row label="Branch" value={selectedBranch.name.split(',')[0]} />
                <Row label="Date" value={form.date || '—'} />
                <Row label="Time" value={form.slot || 'Not chosen yet'} />
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                <span className="flex items-center gap-1.5 text-[13px] text-text-secondary">
                  <Wallet size={14} /> {selectedVisit.label} fee
                </span>
                <span className="text-[18px] font-bold text-text-primary">
                  &#8377;{selectedVisit.fee}
                </span>
              </div>
              <p className="mt-1 text-[11.5px] text-text-secondary">{selectedVisit.note}</p>
            </div>

            <div className="rounded-xl border border-border bg-white p-5 shadow-card">
              <h3 className="flex items-center gap-2 text-[15px] font-semibold text-text-primary">
                <Clock3 size={16} className="text-primary" /> OPD hours
              </h3>
              <div className="mt-3 space-y-2 text-[13px]">
                <Row label="Mon–Sat morning" value="10 AM – 2 PM" />
                <Row label="Mon–Sat evening" value="6 PM – 8 PM" />
                <Row label="Emergency" value="24 hours" />
              </div>
              <p className="mt-3 flex items-start gap-2 text-[12.5px] text-text-secondary">
                <MapPin size={14} className="mt-0.5 shrink-0" />
                {selectedBranch.detail}
              </p>
            </div>

            <div className="rounded-xl border border-danger/30 bg-danger/5 p-5">
              <h3 className="flex items-center gap-2 text-[15px] font-semibold text-danger">
                <Ambulance size={16} /> Is this an emergency?
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-text-secondary">
                Don&apos;t fill this form for a fresh fracture, accident, or severe pain. Call us
                and come in — someone is on duty at all hours.
              </p>
              <Button as="a" href={RECEPTION_PHONE} size="md" className="mt-3 w-full gap-1.5">
                <Phone size={15} /> Call 26138375
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

/* --------------------------------------------------------------- helpers */

function inputClass(error) {
  return `w-full rounded-lg border bg-white px-3 py-2.5 text-[14px] text-text-primary placeholder:text-text-secondary/70 focus:outline-none focus:ring-2 focus:ring-primary/30 ${
    error ? 'border-danger' : 'border-border'
  }`
}

function Card({ icon: Icon, title, children }) {
  return (
    <div className="rounded-xl border border-border bg-white p-5 shadow-card sm:p-6">
      <div className="mb-4 flex items-center gap-2">
        <Icon size={18} className="text-primary" />
        <h2 className="text-[16px] font-semibold text-text-primary">{title}</h2>
      </div>
      {children}
    </div>
  )
}

function Field({ label, hint, error, required, className = '', children }) {
  return (
    <div className={className} data-error={error ? 'true' : undefined}>
      <label className="mb-1.5 flex items-center gap-1.5 text-[13px] font-medium text-text-primary">
        {label}
        {required && <span className="text-danger">*</span>}
        {hint && <span className="text-[11.5px] font-normal text-text-secondary">({hint})</span>}
      </label>
      {children}
      {error && <ErrorText text={error} />}
    </div>
  )
}

function ErrorText({ text }) {
  return (
    <p className="mt-1.5 flex items-center gap-1.5 text-[12px] text-danger">
      <AlertCircle size={13} /> {text}
    </p>
  )
}

function SelectRow({ active, onClick, title, detail, icon: Icon }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-start gap-3 rounded-lg border p-3 text-left transition-colors ${
        active ? 'border-primary bg-surface-soft' : 'border-border hover:bg-surface-soft'
      }`}
    >
      <span
        className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${
          active ? 'border-primary' : 'border-border'
        }`}
      >
        {active && <span className="h-2 w-2 rounded-full bg-primary" />}
      </span>
      <span className="min-w-0">
        <span className="flex items-center gap-1.5 text-[13.5px] font-semibold leading-snug text-text-primary">
          {Icon && <Icon size={13} className="shrink-0 text-secondary" />}
          {title}
        </span>
        <span className="mt-0.5 block text-[12px] leading-snug text-text-secondary">{detail}</span>
      </span>
    </button>
  )
}

function SlotGroup({ icon: Icon, title, window: win, slots, selected, onSelect, className = '' }) {
  return (
    <div className={className}>
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
        <span className="flex items-center gap-1.5 text-[13px] font-medium text-text-primary">
          <Icon size={14} className="shrink-0 text-secondary" /> {title}
        </span>
        <span className="text-[12px] text-text-secondary">{win}</span>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-2 xs:grid-cols-3 sm:grid-cols-4">
        {slots.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => onSelect(s)}
            className={`rounded-lg border py-2 text-[13px] font-medium transition-colors ${
              selected === s
                ? 'border-primary bg-primary text-white'
                : 'border-border text-text-primary hover:bg-surface-soft'
            }`}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  )
}

function Row({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <span className="shrink-0 text-text-secondary">{label}</span>
      <span className="min-w-0 break-words text-right font-medium text-text-primary">{value}</span>
    </div>
  )
}