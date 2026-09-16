// src/components/SpecialityCard.jsx
import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

import { specialtyImage, specialtyImageAlt } from '../data/specialtyImages.js'

export default function SpecialityCard({
  icon: Icon,
  badge,
  title,
  description,
  meta,
  linkLabel,
  slug,
  image,          // optional: pass a full URL to override the Unsplash default
  index = 0,
}) {
  const reduceMotion = useReducedMotion()
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)

  // Pass slug + title + badge so keyword matching has more to go on
  // than the slug alone.
  const src = image ?? specialtyImage({ slug, title, badge }, 800)

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-white shadow-card transition-shadow duration-300 hover:shadow-elevated focus-within:ring-2 focus-within:ring-primary/40 focus-within:ring-offset-2 motion-safe:hover:-translate-y-1 motion-safe:transition-transform"
    >
      {/* ---------- image ---------- */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-soft sm:aspect-[16/9]">
        {!failed && (
          <img
            src={src}
            sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 100vw"
            alt={specialtyImageAlt(title)}
            loading="lazy"
            decoding="async"
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
            className={`h-full w-full object-cover transition-[opacity,transform] duration-500 motion-safe:group-hover:scale-[1.04] ${
              loaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* skeleton while loading / fallback if the image 404s */}
        {(!loaded || failed) && (
          <div className="absolute inset-0 flex items-center justify-center bg-surface-soft">
            {failed && Icon && <Icon size={34} strokeWidth={1.5} className="text-primary/40" />}
          </div>
        )}

        {/* icon chip + badge sit on top of the photo */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-gradient-to-t from-black/45 to-transparent p-3 sm:p-4">
          {Icon && (
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/95 text-primary shadow-card sm:h-11 sm:w-11">
              <Icon size={20} strokeWidth={1.75} />
            </span>
          )}
          {badge && (
            <span className="rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-secondary">
              {badge}
            </span>
          )}
        </div>
      </div>

      {/* ---------- body ---------- */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="text-[16px] font-semibold leading-snug text-text-primary sm:text-[17px]">
          {title}
        </h3>
        <p className="mt-1.5 max-w-[60ch] text-[13px] leading-relaxed text-text-secondary sm:text-[13.5px]">
          {description}
        </p>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-t border-border pt-3 sm:mt-4">
          <span className="text-[12px] text-text-secondary">{meta}</span>
          <Link
            to={`/specialties/${slug}`}
            className="inline-flex items-center gap-1 rounded text-[13px] font-semibold text-primary outline-none hover:text-primary-dark focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            {/* stretched link: the whole card is clickable, but only one tab stop */}
            <span className="absolute inset-0" aria-hidden="true" />
            <span className="relative">{linkLabel}</span>
            <ArrowRight
              size={14}
              className="relative transition-transform duration-200 motion-safe:group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    </motion.article>
  )
}