
import { Code2, Database, Globe, GitBranch, Wrench } from 'lucide-react'

const skills = [
  {
    category: 'Frontend',
    icon: Globe,
    technologies: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Angular', 'React'],
  },
  {
    category: 'Backend',
    icon: Code2,
    technologies: ['Python', 'Flask', 'Consumo de APIs REST'],
  },
  {
    category: 'Bases de datos',
    icon: Database,
    technologies: ['MySQL', 'MongoDB'],
  },
  {
    category: 'Herramientas',
    icon: Wrench,
    technologies: ['Git', 'GitHub', 'VS Code', 'WordPress'],
  },
  {
    category: 'Control de versiones',
    icon: GitBranch,
    technologies: ['Git', 'GitHub', 'Ramas y trabajo colaborativo'],
  },
]

function Skills() {
  return (
    <section id="habilidades" className="bg-[#0b0b18] px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-violet-400">
            Mi conocimiento
          </span>

          <h2 className="mt-3 text-4xl font-bold text-white">
            Mis <span className="text-violet-400">habilidades</span>
          </h2>

          <p className="mt-4 text-gray-400">
            Tecnologías y herramientas con las que he trabajado.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill) => {
            const Icon = skill.icon

            return (
              <article
                key={skill.category}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition hover:border-violet-500/50"
              >
                <div className="mb-5 flex items-center gap-3">
                  <Icon size={25} className="text-violet-400" />
                  <h3 className="text-lg font-semibold text-white">
                    {skill.category}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {skill.technologies.map((technology) => (
                    <span
                      key={technology}
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
