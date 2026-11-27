
import { useState } from 'react'
import { UserRound, Code2, Mail } from 'lucide-react'
import AboutForm from './AboutForm'
import SkillsForm from './SkillsForm'
import ContactForm from './ContactForm'

function PortfolioContent() {
  const [activeTab, setActiveTab] = useState<
    'about' | 'skills' | 'contact'
  >('about')

  const tabs = [
    { id: 'about' as const, label: 'Conóceme', icon: UserRound },
    { id: 'skills' as const, label: 'Habilidades', icon: Code2 },
    { id: 'contact' as const, label: 'Contacto', icon: Mail },
  ]

  return (
    <section className="rounded-xl border border-white/10 bg-white/[0.03] p-4 sm:p-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold">Contenido del portafolio</h3>
        <p className="mt-1 text-sm text-gray-400">
          Administra la información que aparece en tu portafolio.
        </p>
      </div>

      <div className="mb-8 flex flex-wrap gap-2 border-b border-white/10 pb-4">
        {tabs.map((tab) => {
          const Icon = tab.icon

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 rounded-lg px-4 py-3 text-sm transition ${
                activeTab === tab.id
                  ? 'bg-violet-600/20 text-violet-300'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon size={18} />
              {tab.label}
            </button>
          )
        })}
      </div>

      <div className="min-h-64">
        {activeTab === 'about' && <AboutForm />}
        {activeTab === 'skills' && <SkillsForm />}
        {activeTab === 'contact' && <ContactForm />}
      </div>
    </section>
  )
}

export default PortfolioContent
