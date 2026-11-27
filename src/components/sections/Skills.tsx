
import { useEffect, useState } from 'react'
import {
  Code2,
  Database,
  Globe,
  GitBranch,
  Wrench,
} from 'lucide-react'

import { getPortfolioContent } from '../../services/portfolioContentService'
import type { SkillCategory } from '../../types/portfolioContent'

const categoryIcons = [Globe, Code2, Database, Wrench, GitBranch]

function Skills() {
  const [content, setContent] = useState<{
    eyebrow: string
    title: string
    description: string
    categories: SkillCategory[]
  } | null>(null)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadContent() {
      try {
        const data = await getPortfolioContent()

        setContent({
          eyebrow: data.skills_eyebrow,
          title: data.skills_title,
          description: data.skills_description,
          categories: data.skills_categories,
        })
      } catch (error) {
        console.error('Error al cargar las habilidades:', error)
      } finally {
        setLoading(false)
      }
    }

    loadContent()
  }, [])

  if (loading) {
    return (
      <section id="habilidades" className="bg-[#0b0b18] px-6 py-24">
        <div className="mx-auto max-w-6xl text-center text-gray-400">
          Cargando habilidades...
        </div>
      </section>
    )
  }

  if (!content) return null

  return (
    <section id="habilidades" className="bg-[#0b0b18] px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-violet-400">
            {content.eyebrow}
          </span>

          <h2 className="mt-3 text-4xl font-bold text-white">
            {content.title}
          </h2>

          <p className="mt-4 text-gray-400">
            {content.description}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {content.categories.map((skill, index) => {
            const Icon = categoryIcons[index % categoryIcons.length]

            return (
              <article
                key={skill.id}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition hover:border-violet-500/50"
              >
                <div className="mb-5 flex items-center gap-3">
                  {skill.icon_url ? (
                    <img
                      src={skill.icon_url}
                      alt={`Ícono de ${skill.category}`}
                      className="size-12 shrink-0 object-contain"
                    />
                  ) : (
                    <Icon
                      size={25}
                      className="shrink-0 text-violet-400"
                    />
                  )}

                  <h3 className="text-lg font-semibold text-white">
                    {skill.category}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {skill.technologies.map((technology, technologyIndex) => (
                    <span
                      key={`${skill.id}-${technologyIndex}`}
                      className="rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-2 text-sm text-violet-300"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Skills
