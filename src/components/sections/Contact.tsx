
import { useEffect, useState } from 'react'
import { Code2, Mail, Send } from 'lucide-react'

import { getPortfolioContent } from '../../services/portfolioContentService'
import type { ContactMethod } from '../../types/portfolioContent'

function Contact() {
  const [content, setContent] = useState<{
    eyebrow: string
    title: string
    description: string
    methods: ContactMethod[]
  } | null>(null)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadContent() {
      try {
        const data = await getPortfolioContent()

        setContent({
          eyebrow: data.contact_eyebrow,
          title: data.contact_title,
          description: data.contact_description,
          methods: data.contact_methods,
        })
      } catch (error) {
        console.error('Error al cargar Contacto:', error)
      } finally {
        setLoading(false)
      }
    }

    loadContent()
  }, [])

  if (loading) {
    return (
      <section id="contacto" className="bg-[#080812] px-6 py-24">
        <div className="mx-auto max-w-5xl text-center text-gray-400">
          Cargando contacto...
        </div>
      </section>
    )
  }

  if (!content) return null

  return (
    <section id="contacto" className="bg-[#080812] px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-14 text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-violet-400">
            {content.eyebrow}
          </span>

          <h2 className="mt-3 text-4xl font-bold text-white">
            {content.title}
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            {content.description}
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {content.methods.map((method, index) => {
            const Icon = index === 0 ? Mail : Code2

            return (
              <a
                key={method.id}
                href={method.href}
                target={method.href.startsWith('mailto:') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition duration-300 hover:-translate-y-1 hover:border-violet-500/50 hover:bg-violet-500/5"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400 transition group-hover:bg-violet-500/20">
                  <Icon size={24} />
                </div>

                <h3 className="font-semibold text-white">
                  {method.name}
                </h3>

                <p className="mt-2 break-words text-sm text-gray-400">
                  {method.value}
                </p>

                <div className="mt-5 flex items-center gap-2 text-sm font-medium text-violet-400">
                  Visitar
                  <Send size={15} />
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Contact
