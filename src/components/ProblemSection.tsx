import { Reveal } from './Reveal'

const PAINS = [
  {
    title: 'Ninguém sabe o que já foi gravado.',
    body: 'Um momento perdido só aparece quando você revê o material, e aí já é tarde.',
  },
  {
    title: 'Cada um olha uma lista diferente.',
    body: 'Cinegrafista, fotógrafo e redes sociais trabalham sem a mesma visão do que já foi feito.',
  },
  {
    title: 'Ninguém sabe quanto tempo levou.',
    body: 'O tempo entre gravar e postar vira palpite, não dado.',
  },
]

export function ProblemSection() {
  return (
    <section className="border-t border-white/8 py-24 md:py-32">
      <Reveal className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-16">
        <div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-paper text-balance md:text-4xl">
            O plano da cobertura não sobrevive ao dia do evento.
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-mist">
            Casamento, 15 anos ou evento corporativo: hoje o plano vira um
            documento longo, mensagens soltas no WhatsApp ou memória. E quebra
            assim que o evento começa.
          </p>
        </div>

        <ul className="divide-y divide-white/8 border-y border-white/8 md:self-end">
          {PAINS.map((pain) => (
            <li key={pain.title} className="py-5">
              <h3 className="font-display text-base font-semibold text-paper md:text-lg">{pain.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-mist">{pain.body}</p>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}
