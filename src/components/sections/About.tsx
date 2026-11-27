import { useEffect, useRef, useState } from 'react'
import { Code2, GraduationCap, Lightbulb } from 'lucide-react'

import { getPortfolioContent } from '../../services/portfolioContentService'
import type { AboutCard } from '../../types/portfolioContent'

const cardIcons = [GraduationCap, Code2, Lightbulb]
const cardOffsets = ['', 'md:ml-6', 'md:ml-12']

function About() {
  const [content, setContent] = useState<{
    eyebrow: string
    title: string
    subtitle: string
    description: string
    secondaryDescription: string
    cards: AboutCard[]
  } | null>(null)

  const [loading, setLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const [cardsVisible, setCardsVisible] = useState<boolean[]>([])

  const sectionRef = useRef<HTMLElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    async function loadContent() {
      try {
        const data = await getPortfolioContent()

        setContent({
          eyebrow: data.about_eyebrow,
          title: data.about_title,
          subtitle: data.about_subtitle,
          description: data.about_description,
          secondaryDescription: data.about_secondary_description,
          cards: data.about_cards,
        })

        setCardsVisible(new Array(data.about_cards.length).fill(false))
      } catch (error) {
        console.error('Error al cargar la sección Conóceme:', error)
      } finally {
        setLoading(false)
      }
    }

    loadContent()
  }, [])

  // Observer del bloque de texto (también reversible)
  useEffect(() => {
    if (!sectionRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -8% 0px',
      }
    )

    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [content])

  // Observer de cada tarjeta (aparecen y desaparecen con el scroll)
  useEffect(() => {
    if (!content) return

    const observers: IntersectionObserver[] = []

    cardRefs.current.forEach((card, index) => {
      if (!card) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          setCardsVisible((prev) => {
            const next = [...prev]
            next[index] = entry.isIntersecting
            return next
          })
        },
        {
          threshold: 0.25,
          rootMargin: '0px 0px -10% 0px',
        }
      )

      observer.observe(card)
      observers.push(observer)
    })

    return () => observers.forEach((obs) => obs.disconnect())
  }, [content])

  if (loading) {
    return (
      <section id="sobre-mi" className="scroll-mt-20 bg-[#0b0b18] px-6 py-24">
        <div className="mx-auto max-w-6xl text-center text-gray-400">
          Cargando contenido...
        </div>
      </section>
    )
  }

  if (!content) return null

  return (
    <section
      id="sobre-mi"
      ref={sectionRef}
      className="relative scroll-mt-20 overflow-hidden bg-[#0b0b18] px-6 py-24 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-violet-950/20 via-transparent to-transparent" />

      <div className="relative mx-auto grid max-w-6xl gap-14 md:grid-cols-12 md:items-start md:gap-10">
        {/* Texto izquierdo */}
        <div
          className={`md:sticky md:top-32 md:col-span-7 transition-all duration-1000 ease-out ${
            isVisible
              ? 'translate-y-0 opacity-100'
              : 'translate-y-12 opacity-0'
          }`}
        >
          <p
            className={`text-sm tracking-[0.3em] text-violet-300 transition-all duration-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
          >
            {content.eyebrow}
          </p>

          <h2
            className={`mt-4 text-5xl font-extrabold tracking-tight text-white md:text-7xl transition-all duration-1000 delay-100 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            {content.title}
          </h2>

          <p
            className={`mt-4 text-base tracking-wide text-gray-400 md:text-lg transition-all duration-1000 delay-200 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            {content.subtitle}
          </p>

          <div
            className={`mt-10 max-w-xl space-y-4 border-l-4 border-violet-500 pl-6 transition-all duration-1000 delay-300 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <p className="whitespace-pre-line leading-8 text-gray-200">
              {content.description}
            </p>
            <p className="whitespace-pre-line leading-8 text-gray-400">
              {content.secondaryDescription}
            </p>
          </div>
        </div>

        {/* Tarjetas - aparecen y desaparecen según el scroll */}
        <div className="flex flex-col gap-5 md:col-span-5">
          {content.cards.map((card, index) => {
            const Icon = cardIcons[index % cardIcons.length]
            const offset = cardOffsets[index % cardOffsets.length]
            const isCardVisible = cardsVisible[index]

            return (
              <div
                key={card.id}
                ref={(el) => {
                  cardRefs.current[index] = el
                }}
                className={`group flex items-start gap-4 rounded-2xl border border-violet-500/20 bg-violet-500/5 p-6 backdrop-blur-sm transition-all duration-700 ease-out hover:border-violet-500/40 hover:bg-violet-500/10 ${offset} ${
                  isCardVisible
                    ? 'translate-y-0 scale-100 opacity-100'
                    : 'translate-y-14 scale-[0.96] opacity-0'
                }`}
                style={{
                  transitionDelay: isCardVisible ? `${index * 100}ms` : '0ms',
                }}
              >
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 transition-all duration-500 ${
                    isCardVisible ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
                  }`}
                >
                  <Icon className="text-violet-400" size={26} />
                </div>

                <div>
                  <h3 className="font-semibold text-white transition-colors group-hover:text-violet-200">
                    {card.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-6 text-gray-400">
                    {card.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default About