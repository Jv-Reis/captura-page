import { useState } from 'react'
import { ListIcon, XIcon } from '@phosphor-icons/react'
import { AppLink } from './AppLink'
import { Logo } from './Logo'

const LINKS = [
  { href: '#como-funciona', label: 'Como funciona' },
  { href: '#produto', label: 'Em campo' },
  { href: '#recursos', label: 'Recursos' },
]

export function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 border-b border-white/8 bg-ink/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a
          href="#top"
          aria-label="CAPTURA, início"
          className="-my-2 rounded-full py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
        >
          <Logo />
        </a>

        <nav aria-label="Principal" className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full text-sm text-mist transition-colors hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <AppLink size="sm" />
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="-mr-3 inline-flex size-11 items-center justify-center rounded-full text-paper md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper"
        >
          {open ? <XIcon size={22} aria-hidden="true" /> : <ListIcon size={22} aria-hidden="true" />}
        </button>
      </div>

      {open ? (
        <div id="mobile-menu" className="border-t border-white/8 px-5 pb-6 pt-2 md:hidden">
          <nav aria-label="Principal" className="flex flex-col pt-1">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg py-3 text-base text-mist hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper"
              >
                {link.label}
              </a>
            ))}
            <AppLink className="mt-3 w-full" onClick={() => setOpen(false)} />
          </nav>
        </div>
      ) : null}
    </header>
  )
}
