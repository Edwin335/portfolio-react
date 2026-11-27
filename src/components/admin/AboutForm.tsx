
import { useEffect, useState } from 'react'
import { Plus, Trash2, Save } from 'lucide-react'
import {
  getPortfolioContent,
  updatePortfolioContent,
} from '../../services/portfolioContentService'
import type { AboutCard } from '../../types/portfolioContent'

function AboutForm() {
  const [eyebrow, setEyebrow] = useState('')
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [description, setDescription] = useState('')
  const [secondaryDescription, setSecondaryDescription] = useState('')
  const [cards, setCards] = useState<AboutCard[]>([])

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    async function loadContent() {
      try {
        const content = await getPortfolioContent()

        setEyebrow(content.about_eyebrow)
        setTitle(content.about_title)
        setSubtitle(content.about_subtitle)
        setDescription(content.about_description)
        setSecondaryDescription(content.about_secondary_description)
        setCards(content.about_cards)
      } catch {
        setError('No fue posible cargar el contenido.')
      } finally {
        setLoading(false)
      }
    }

    loadContent()
  }, [])

  function updateCard(
    index: number,
    field: keyof AboutCard,
    value: string
  ) {
    setCards((current) =>
      current.map((card, i) =>
        i === index ? { ...card, [field]: value } : card
      )
    )
  }

  function addCard() {
    setCards((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        title: '',
        description: '',
      },
    ])
  }

  function removeCard(index: number) {
    setCards((current) => current.filter((_, i) => i !== index))
  }

  async function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaving(true)
    setError(null)
    setSuccess(false)

    try {
      await updatePortfolioContent({
        about_eyebrow: eyebrow,
        about_title: title,
        about_subtitle: subtitle,
        about_description: description,
        about_secondary_description: secondaryDescription,
        about_cards: cards,
      })

      setSuccess(true)
    } catch {
      setError('No fue posible guardar los cambios. Inténtalo nuevamente.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <p className="py-8 text-center text-gray-400">Cargando contenido...</p>
  }

  if (error && !title && !description) {
    return <p className="py-8 text-center text-red-400">{error}</p>
  }

  const inputClass =
    'w-full rounded-lg border border-white/10 bg-[#10101f] px-4 py-3 text-sm text-white outline-none transition focus:border-violet-500'

  const labelClass = 'mb-2 block text-sm font-medium text-gray-300'

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div>
        <h4 className="text-lg font-semibold">Sección Conóceme</h4>
        <p className="mt-1 text-sm text-gray-400">
          Modifica los textos que aparecen en la sección Sobre mí.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className={labelClass}>Texto superior</label>
          <input
            className={inputClass}
            value={eyebrow}
            onChange={(e) => setEyebrow(e.target.value)}
            required
          />
        </div>

        <div>
          <label className={labelClass}>Título principal</label>
          <input
            className={inputClass}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Subtítulo</label>
        <input
          className={inputClass}
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label className={labelClass}>Descripción principal</label>
        <textarea
          className={inputClass}
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div>
        <label className={labelClass}>Descripción secundaria</label>
        <textarea
          className={inputClass}
          rows={4}
          value={secondaryDescription}
          onChange={(e) => setSecondaryDescription(e.target.value)}
          required
        />
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h5 className="font-semibold">Tarjetas informativas</h5>
            <p className="mt-1 text-sm text-gray-400">
              Edita, agrega o elimina tarjetas.
            </p>
          </div>

          <button
            type="button"
            onClick={addCard}
            className="flex items-center gap-2 rounded-lg border border-violet-500/30 px-3 py-2 text-sm text-violet-300 transition hover:bg-violet-500/10"
          >
            <Plus size={16} />
            Agregar tarjeta
          </button>
        </div>

        {cards.map((card, index) => (
          <div
            key={card.id}
            className="space-y-4 rounded-xl border border-white/10 bg-white/[0.02] p-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-300">
                Tarjeta {index + 1}
              </span>

              <button
                type="button"
                onClick={() => removeCard(index)}
                aria-label={`Eliminar tarjeta ${index + 1}`}
                className="rounded-lg p-2 text-gray-400 transition hover:bg-red-500/10 hover:text-red-400"
              >
                <Trash2 size={17} />
              </button>
            </div>

            <div>
              <label className={labelClass}>Título</label>
              <input
                className={inputClass}
                value={card.title}
                onChange={(e) =>
                  updateCard(index, 'title', e.target.value)
                }
                required
              />
            </div>

            <div>
              <label className={labelClass}>Descripción</label>
              <textarea
                className={inputClass}
                rows={2}
                value={card.description}
                onChange={(e) =>
                  updateCard(index, 'description', e.target.value)
                }
                required
              />
            </div>
          </div>
        ))}
      </div>

      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}

      {success && (
        <p className="text-sm text-green-400">
          ¡Contenido actualizado correctamente!
        </p>
      )}

      <div className="flex justify-end border-t border-white/10 pt-5">
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 rounded-lg bg-violet-600 px-5 py-3 text-sm font-semibold transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Save size={17} />
          {saving ? 'Guardando...' : 'Guardar cambios'}
        </button>
      </div>
    </form>
  )
}

export default AboutForm
