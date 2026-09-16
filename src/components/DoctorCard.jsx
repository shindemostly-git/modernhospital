import { motion } from 'framer-motion'
import { MapPin, Stethoscope } from 'lucide-react'
import Button from './Button.jsx'

export default function DoctorCard({ doctor, index = 0 }) {
  const { image, name, credentials, specialty, experience, location, consultType, slots } = doctor

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      className="rounded-xl border border-border bg-white p-5 shadow-card"
    >
      <div className="flex gap-4">
        <img
          src={image}
          alt={`Portrait of ${name}, ${specialty}`}
          loading="lazy"
          className="h-16 w-16 shrink-0 rounded-full object-cover border border-border"
        />
        <div className="min-w-0">
          <h3 className="truncate text-[16px] font-semibold text-text-primary">{name}</h3>
          <p className="text-[13px] text-secondary font-medium">{specialty}</p>
          <span className="mt-1 inline-block rounded-full bg-surface-soft px-2 py-0.5 text-[11px] font-semibold text-primary">
            {experience}
          </span>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[12.5px] text-text-secondary">
        <span className="inline-flex items-center gap-1">
          <MapPin size={13} /> {location}
        </span>
        <span className="inline-flex items-center gap-1">
          <Stethoscope size={13} /> {consultType}
        </span>
      </div>

      <p className="mt-4 text-[11px] font-semibold tracking-wide text-text-secondary">
        SELECT DIRECT CONSULTATION SLOT
      </p>
      <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {slots.map((slot) => (
          <button
            key={slot.time}
            disabled={slot.filled}
            className={`rounded-md border px-2 py-1.5 text-[12px] font-medium transition-colors
              ${
                slot.filled
                  ? 'border-border bg-surface-soft text-text-secondary/50 line-through cursor-not-allowed'
                  : 'border-border text-text-primary hover:border-primary hover:text-primary'
              }`}
          >
            {slot.time}
          </button>
        ))}
      </div>

      <Button variant="primary" size="md" className="mt-4 w-full">
        Confirm Reservation
      </Button>
    </motion.div>
  )
}