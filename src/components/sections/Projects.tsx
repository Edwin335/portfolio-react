
import { useEffect, useState } from 'react'
import { Code2, ExternalLink, FolderCode } from 'lucide-react'
import type { Project } from '../../types/project'
import { getPublishedProjects } from '../../services/projectService'

function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await getPublishedProjects()
        setProjects(data)
      } catch {
        setError('No fue posible cargar los proyectos.')
      } finally {
        setLoading(false)
      }
    }

    loadProjects()
  }, [])

  return (
    <section id="proyectos" className="bg-[#080814] px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-violet-400">
            Mi trabajo
          </span>

          <h2 className="mt-3 text-4xl font-bold text-white">
            Mis <span className="text-violet-400">proyectos</span>
          </h2>

          <p className="mt-4 text-gray-400">
            Algunos proyectos en los que he trabajado.
          </p>
        </div>

        {loading ? (
          <p className="py-12 text-center text-gray-400">
            Cargando proyectos...
          </p>
        ) : error ? (
          <p className="py-12 text-center text-red-400">
            {error}
          </p>
        ) : projects.length === 0 ? (
          <p className="py-12 text-center text-gray-400">
            Próximamente encontrarás aquí mis proyectos.
          </p>
        ) : (
          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <article
                key={project.id}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition hover:-translate-y-2 hover:border-violet-500/50"
              >
                {/* Imagen del proyecto */}
                <div className="flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br from-violet-950 to-[#171329]">
                  {project.image_url ? (
                    <img
                      src={project.image_url}
                      alt={`Imagen del proyecto ${project.title}`}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <FolderCode
                      size={65}
                      className="text-violet-400 transition group-hover:scale-110"
                    />
                  )}
                </div>

                <div className="p-6">
                  <h3 className="break-words text-xl font-bold text-white">
                    {project.title}
                  </h3>

                  <p className="mt-3 min-h-16 break-words text-sm leading-6 text-gray-400">
                    {project.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-xs text-violet-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex gap-5 border-t border-white/10 pt-5">
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 text-sm text-gray-300 hover:text-violet-400"
                      >
                        <Code2 size={17} />
                        GitHub
                      </a>
                    )}

                    {project.demo_url && (
                      <a
                        href={project.demo_url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 text-sm text-gray-300 hover:text-violet-400"
                      >
                        <ExternalLink size={17} />
                        Demo
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Projects
