import { motion } from 'framer-motion'

export default function SectionTitle({
  eyebrow,
  heading,
  description,
  align = 'left',
  action,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between mb-8 md:mb-10 ${
        align === 'center' ? 'text-center sm:text-center items-center' : ''
      }`}
    >
      <div className={align === 'center' ? 'mx-auto max-w-2xl' : 'max-w-xl'}>
        {eyebrow && (
          <span className="text-[13px] font-semibold tracking-wide text-secondary">
            {eyebrow}
          </span>
        )}
        <h2 className="mt-2 text-[28px] leading-tight sm:text-[34px] font-bold text-text-primary">
          {heading}
        </h2>
        {description && (
          <p className="mt-2 text-[15px] leading-relaxed text-text-secondary max-w-lg">
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </motion.div>
  )
}
