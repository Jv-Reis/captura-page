import { APP_URL } from './AppLink'
import { Logo } from './Logo'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/8 py-14">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-5 text-center sm:px-8 md:flex-row md:justify-between md:text-left">
        <Logo size={24} />

        <nav aria-label="Rodapé" className="flex flex-wrap items-center justify-center gap-x-6">
          <a
            href="#como-funciona"
            className="inline-flex min-h-11 items-center rounded-full text-sm text-mist hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            Como funciona
          </a>
          <a
            href="#produto"
            className="inline-flex min-h-11 items-center rounded-full text-sm text-mist hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            Em campo
          </a>
          <a
            href="#recursos"
            className="inline-flex min-h-11 items-center rounded-full text-sm text-mist hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            Recursos
          </a>
          <a
            href={`${APP_URL}/privacidade.html`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center rounded-full text-sm text-mist hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            Privacidade
            <span className="sr-only"> (abre em nova aba)</span>
          </a>
        </nav>

        <p className="text-xs text-mist-dim">© {year} CAPTURA</p>
      </div>
    </footer>
  )
}
