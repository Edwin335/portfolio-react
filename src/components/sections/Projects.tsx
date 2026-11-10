
import { Code2, ExternalLink, FolderCode } from 'lucide-react'

const projects = [
  {
    title: 'Sistema de gestión de comidas',
    description: 'Aplicación web para gestionar pedidos, productos y procesos de compra.',
    technologies: ['Angular', 'Python', 'Flask', 'MongoDB'],
    github: 'https://github.com/Edwin335/comidas',
    demo: '',
  },
  {
    title: 'Panel administrativo',
    description: 'Interfaz para administrar productos y gestionar la información del sistema.',
    technologies: ['Angular', 'TypeScript', 'CSS'],
    github: 'https://github.com/Edwin335/panelComidasAdmin',
    demo: '',
  },
  {
    title: 'Portafolio personal',
    description: 'Sitio web para presentar mi perfil profesional y proyectos.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS'],
    github: 'https://github.com/edwinpabonr',
    demo: '',
  },
]

function Projects() {
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

        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.title}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition hover:-translate-y-2 hover:border-violet-500/50"
            >
              <div className="flex h-44 items-center justify-center bg-gradient-to-br from-violet-950 to-[#171329]">
                <FolderCode
                  size={65}
                  className="text-violet-400 transition group-hover:scale-110"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-white">
                  {project.title}
                </h3>

                <p className="mt-3 min-h-16 text-sm leading-6 text-gray-400">
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
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-sm text-gray-300 hover:text-violet-400"
                  >
                    <Code2 size={17} />
                    GitHub
                  </a>

                  {project.demo && (
                    <a
                      href={project.demo}
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
      </div>
    </section>
  )
}

export default Projects
