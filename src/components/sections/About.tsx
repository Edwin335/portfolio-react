
import { Code2, GraduationCap, Lightbulb } from 'lucide-react'

function About() {
  return (
    <section id="sobre-mi" className="bg-[#0b0b18] px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-violet-400">
            Conóceme
          </span>

          <h2 className="mt-3 text-4xl font-bold text-white">
            Sobre <span className="text-violet-400">mí</span>
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 md:col-span-2">
            <h3 className="mb-4 text-2xl font-semibold text-white">
              Desarrollador de Software
            </h3>

            <p className="leading-8 text-gray-400">
              Soy tecnólogo en Desarrollo de Software, interesado en el
              desarrollo web y la creación de soluciones tecnológicas.
              Tengo conocimientos en desarrollo frontend, consumo de API,
              bases de datos y herramientas de desarrollo.
            </p>

            <p className="mt-4 leading-8 text-gray-400">
              Actualmente continúo fortaleciendo mis habilidades en
              tecnologías frontend y backend, buscando construir
              aplicaciones funcionales, organizadas y eficientes.
            </p>
          </div>

          <div className="flex flex-col justify-between gap-5">
            <div className="rounded-2xl border border-violet-500/20 bg-violet-500/5 p-6">
              <GraduationCap className="mb-4 text-violet-400" size={30} />
              <h3 className="font-semibold text-white">Formación</h3>
              <p className="mt-2 text-sm text-gray-400">
                Tecnología en Desarrollo de Software
              </p>
            </div>

            <div className="rounded-2xl border border-violet-500/20 bg-violet-500/5 p-6">
              <Code2 className="mb-4 text-violet-400" size={30} />
              <h3 className="font-semibold text-white">Desarrollo</h3>
              <p className="mt-2 text-sm text-gray-400">
                Aplicaciones web y consumo de API.
              </p>
            </div>

            <div className="rounded-2xl border border-violet-500/20 bg-violet-500/5 p-6">
              <Lightbulb className="mb-4 text-violet-400" size={30} />
              <h3 className="font-semibold text-white">Aprendizaje</h3>
              <p className="mt-2 text-sm text-gray-400">
                Aprendizaje continuo y resolución de problemas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
