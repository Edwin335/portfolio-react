
import { Code2, Mail, Send } from 'lucide-react'

const contactMethods = [
  {
    name: 'Correo electrónico',
    value: 'edwinjavierpabonrodriguez@gmail.com',
    href: 'mailto:edwinjavierpabonrodriguez@gmail.com',
    icon: Mail,
  },
  {
    name: 'LinkedIn',
    value: 'Conectemos profesionalmente',
    href: 'https://www.linkedin.com/in/edwin-javier-pabon-rodriguez/',
    icon: Code2,
  },
  {
    name: 'GitHub',
    value: 'Conoce mis proyectos',
    href: 'https://github.com/Edwin335',
    icon: Code2,
  },
]

function Contact() {
  return (
    <section id="contacto" className="bg-[#080812] px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-14 text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-violet-400">
            Hablemos
          </span>

          <h2 className="mt-3 text-4xl font-bold text-white">
            ¿Trabajamos <span className="text-violet-400">juntos?</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            Estoy abierto a nuevas oportunidades, proyectos y colaboraciones.
            Si tienes una propuesta o simplemente quieres conversar, estaré
            encantado de escucharte.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {contactMethods.map((method) => {
            const Icon = method.icon

            return (
              <a
                key={method.name}
                href={method.href}
                target={method.name === 'Correo electrónico' ? undefined : '_blank'}
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
