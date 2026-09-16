import { forwardRef } from 'react'

const VARIANTS = {
  primary:
    'bg-primary text-white hover:bg-primary-dark shadow-card',
  secondary:
    'bg-white text-primary border border-border hover:border-primary/40 hover:bg-surface-soft',
  ghost:
    'bg-transparent text-primary hover:bg-surface-soft',
  danger:
    'bg-danger text-white hover:bg-[var(--danger-dark)]',
}

const SIZES = {
  sm: 'text-xs px-3 py-2',
  md: 'text-sm px-4 py-2.5',
  lg: 'text-[15px] px-6 py-3',
}

const Button = forwardRef(function Button(
  { as: Tag = 'button', variant = 'primary', size = 'md', className = '', children, ...props },
  ref
) {
  return (
    <Tag
      ref={ref}
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-semibold
        transition-all duration-200 ease-out active:scale-[0.98]
        disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap
        ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  )
})

export default Button
