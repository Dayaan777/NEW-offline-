// All icons are 24×24 viewBox, 1.5px stroke, square linecap/linejoin
// Pass className to control size and color — default inherits currentColor

interface IconProps {
  className?: string
  'aria-hidden'?: boolean
}

const defaults: IconProps = { 'aria-hidden': true }

export function IconSearch({ className, ...rest }: IconProps) {
  return (
    <svg {...defaults} {...rest} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"
      className={className}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.5 15.5L21 21" />
    </svg>
  )
}

export function IconHeart({ className, filled, ...rest }: IconProps & { filled?: boolean }) {
  return (
    <svg {...defaults} {...rest} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={1.5}
      strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 21C12 21 3 14.5 3 8.5C3 5.46 5.46 3 8.5 3C10.24 3 11.78 3.85 12 5C12.22 3.85 13.76 3 15.5 3C18.54 3 21 5.46 21 8.5C21 14.5 12 21 12 21Z" />
    </svg>
  )
}

export function IconUser({ className, ...rest }: IconProps) {
  return (
    <svg {...defaults} {...rest} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"
      className={className}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  )
}

export function IconBag({ className, ...rest }: IconProps) {
  return (
    <svg {...defaults} {...rest} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"
      className={className}>
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  )
}

export function IconMenu({ className, ...rest }: IconProps) {
  return (
    <svg {...defaults} {...rest} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"
      className={className}>
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}

export function IconX({ className, ...rest }: IconProps) {
  return (
    <svg {...defaults} {...rest} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"
      className={className}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

export function IconChevronDown({ className, ...rest }: IconProps) {
  return (
    <svg {...defaults} {...rest} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"
      className={className}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

export function IconArrowRight({ className, ...rest }: IconProps) {
  return (
    <svg {...defaults} {...rest} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"
      className={className}>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}

export function IconCheck({ className, ...rest }: IconProps) {
  return (
    <svg {...defaults} {...rest} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"
      className={className}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

export function IconExternal({ className, ...rest }: IconProps) {
  return (
    <svg {...defaults} {...rest} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"
      className={className}>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}
