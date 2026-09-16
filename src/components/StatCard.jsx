import { motion } from 'framer-motion'

export default function StatCard({ icon: Icon, label, value, sub, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className="flex items-start gap-3 rounded-xl border border-border bg-white/80 backdrop-blur-sm px-4 py-3.5 shadow-card"
    >
      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-soft text-primary">
        <Icon size={18} strokeWidth={2} />
      </div>
      <div>
        <p className="text-[11px] font-semibold tracking-wide text-text-secondary">{label}</p>
        <p className="text-[17px] font-bold text-text-primary leading-tight">{value}</p>
        <p className="text-[12px] text-text-secondary leading-snug">{sub}</p>
      </div>
    </motion.div>
  )
}
