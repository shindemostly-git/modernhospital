import { motion } from 'framer-motion'

export default function StatCard({ icon: Icon, label, value, sub, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className="min-w-0 flex items-start gap-2.5 rounded-xl border border-border bg-white/80 backdrop-blur-sm px-3 py-3 shadow-card sm:gap-3 sm:px-4 sm:py-3.5"
    >
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface-soft text-primary sm:h-9 sm:w-9">
        <Icon size={16} strokeWidth={2} className="sm:hidden" />
        <Icon size={18} strokeWidth={2} className="hidden sm:block" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[10px] font-semibold tracking-wide text-text-secondary sm:text-[11px]">{label}</p>
        <p className="break-words text-[14px] font-bold leading-tight text-text-primary sm:text-[17px]">{value}</p>
        <p className="break-words text-[10.5px] leading-snug text-text-secondary sm:text-[12px]">{sub}</p>
      </div>
    </motion.div>
  )
}