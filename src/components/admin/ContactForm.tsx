
import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { Plus, Trash2, Save } from 'lucide-react'
import {
  getPortfolioContent,
  updatePortfolioContent,
} from '../../services/portfolioContentService'
import type { ContactMethod } from '../../types/portfolioContent'

function ContactForm() {
  const [eyebrow, setEyebrow] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [methods, setMethods] = useState<ContactMethod[]>([])

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    async function loadContent() {
      try {
        const content = await getPortfolioContent()

        setEyebrow(content.contact_eyebrow)
        setTitle(content.contact_title)
        setDescription(content.contact_description)
        setMethods(content.contact_methods)
      } catch {
        setError('No fue posible cargar la información de contacto.')
      } finally {
        setLoading(false)
      }
    }

    loadContent()
  }, [])

  function updateMethod(
    index: number,
    field: keyof ContactMethod,
    value: string
  ) {
    setMethods((current) =>
      current.map((method, i) =>
        i === index ? { ...method, [field]: value } : method
      )
    )
  }

  function addMethod() {
    setMethods((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        name: '',
        value: '',
        href: '',
      },
    ])
  }

  function removeMethod(index: number) {
    setMethods((current) => current.filter((_, i) => i !== index))
  }

  async function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaving(true)
    setError(null)
    setSuccess(false)

    try {
      const cleanMethods = methods.map((method) => ({
        ...method,
        name: method.name.trim(),
        value: method.value.trim(),
        href: method.href.trim(),
      }))

      await updatePortfolioContent({
        contact_eyebrow: eyebrow.trim(),
        contact_title: title.trim(),
        contact_description: description.trim(),
        contact_methods: cleanMethods,
      })

      setMethods(cleanMethods)
      setSuccess(true)
    } catch {
      setError('No fue posible guardar los cambios.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <p className="py-8 text-center text-gray-400">
        Cargando información de contacto...
      </p>
    )
  }

  if (error && !title) {
    return <p className="py-8 text-center text-red-400">{error}</p>
  }

  const inputClass =
    'w-full rounded-lg border border-white/10 bg-[#10101f] px-4 py-3 text-sm text-white outline-none transition focus:border-violet-500'

  const labelClass = 'mb-2 block text-sm font-medium text-gray-300'

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div>
        <h4 className="text-lg font-semibold">Sección Contacto</h4>
        <p className="mt-1 text-sm text-gray-400">
          Administra tus datos y enlaces para que puedan comunicarse contigo.
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
        <label className={labelClass}>Descripción</label>
        <textarea
          className={inputClass}
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h5 className="font-semibold">Métodos de contacto</h5>
            <p className="mt-1 text-sm text-gray-400">
              Agrega, modifica o elimina tus enlaces de contacto.
            </p>
          </div>

          <button
            type="button"
            onClick={addMethod}
            className="flex items-center gap-2 rounded-lg border border-violet-500/30 px-3 py-2 text-sm text-violet-300 transition hover:bg-violet-500/10"
          >
            <Plus size={16} />
            Agregar contacto
          </button>
        </div>

        {methods.map((method, index) => (
          <div
            key={method.id}
            className="space-y-4 rounded-xl border border-white/10 bg-white/[0.02] p-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-300">
                Contacto {index + 1}
              </span>

              <button
                type="button"
                onClick={() => removeMethod(index)}
                aria-label={`Eliminar contacto ${index + 1}`}
                className="rounded-lg p-2 text-gray-400 transition hover:bg-red-500/10 hover:text-red-400"
              >
                <Trash2 size={17} />
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className={labelClass}>Nombre</label>
                <input
                  className={inputClass}
                  value={method.name}
                  onChange={(e) =>
                    updateMethod(index, 'name', e.target.value)
                  }
                  placeholder="Ej. LinkedIn"
                  required
                />
              </div>

              <div>
                <label className={labelClass}>Texto visible</label>
                <input
                  className={inputClass}
                  value={method.value}
                  onChange={(e) =>
                    updateMethod(index, 'value', e.target.value)
                  }
                  placeholder="Ej. Conectemos profesionalmente"
                  required
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Enlace o dirección</label>
              <input
                className={inputClass}
                value={method.href}
                onChange={(e) =>
                  updateMethod(index, 'href', e.target.value)
                }
                placeholder="mailto:correo@ejemplo.com o https://..."
                required
              />
            </div>
          </div>
        ))}

        {methods.length === 0 && (
          <p className="rounded-lg border border-dashed border-white/10 p-5 text-center text-sm text-gray-500">
            Todavía no tienes métodos de contacto.
          </p>
        )}
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      {success && (
        <p className="text-sm text-green-400">
          ¡Información de contacto actualizada correctamente!
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

export default ContactForm
