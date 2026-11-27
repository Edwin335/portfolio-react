
import { useEffect, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { Plus, Trash2, Save, X, ImagePlus } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import {
  getPortfolioContent,
  updatePortfolioContent,
} from '../../services/portfolioContentService'
import type { SkillCategory } from '../../types/portfolioContent'

function SkillsForm() {
  const [eyebrow, setEyebrow] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [categories, setCategories] = useState<SkillCategory[]>([])
  const [originalCategories, setOriginalCategories] = useState<SkillCategory[]>([])

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploadingCategory, setUploadingCategory] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    async function loadContent() {
      try {
        const content = await getPortfolioContent()

        setEyebrow(content.skills_eyebrow)
        setTitle(content.skills_title)
        setDescription(content.skills_description)
        setCategories(content.skills_categories)
        setOriginalCategories(content.skills_categories)
      } catch {
        setError('No fue posible cargar las habilidades.')
      } finally {
        setLoading(false)
      }
    }

    loadContent()
  }, [])

  function updateCategory(index: number, value: string) {
    setCategories((current) =>
      current.map((category, i) =>
        i === index ? { ...category, category: value } : category
      )
    )
  }

  function addCategory() {
    setCategories((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        category: '',
        technologies: [],
      },
    ])
  }

  function removeCategory(index: number) {
    setCategories((current) => current.filter((_, i) => i !== index))
  }

  function addTechnology(index: number) {
    setCategories((current) =>
      current.map((category, i) =>
        i === index
          ? { ...category, technologies: [...category.technologies, ''] }
          : category
      )
    )
  }

  function updateTechnology(
    categoryIndex: number,
    technologyIndex: number,
    value: string
  ) {
    setCategories((current) =>
      current.map((category, i) =>
        i === categoryIndex
          ? {
              ...category,
              technologies: category.technologies.map((technology, j) =>
                j === technologyIndex ? value : technology
              ),
            }
          : category
      )
    )
  }

  function removeTechnology(
    categoryIndex: number,
    technologyIndex: number
  ) {
    setCategories((current) =>
      current.map((category, i) =>
        i === categoryIndex
          ? {
              ...category,
              technologies: category.technologies.filter(
                (_, j) => j !== technologyIndex
              ),
            }
          : category
      )
    )
  }

  async function handleIconUpload(
    categoryId: string,
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0]
    event.target.value = ''

    if (!file) return

    if (file.type !== 'image/png') {
      setError('El ícono debe estar en formato PNG.')
      return
    }

    if (file.size > 1024 * 1024) {
      setError('El ícono no puede superar 1 MB.')
      return
    }

    setError(null)
    setSuccess(false)
    setUploadingCategory(categoryId)

    try {
      const filePath = `${categoryId}/${crypto.randomUUID()}.png`

      const { error: uploadError } = await supabase.storage
        .from('skill-icons')
        .upload(filePath, file, {
          contentType: 'image/png',
          upsert: false,
        })

      if (uploadError) throw uploadError

      const { data } = supabase.storage
        .from('skill-icons')
        .getPublicUrl(filePath)

      setCategories((current) =>
        current.map((category) =>
          category.id === categoryId
            ? {
                ...category,
                icon_url: data.publicUrl,
                icon_path: filePath,
              }
            : category
        )
      )
    } catch {
      setError('No fue posible subir el ícono. Inténtalo nuevamente.')
    } finally {
      setUploadingCategory(null)
    }
  }

  function removeIcon(categoryId: string) {
    setCategories((current) =>
      current.map((category) =>
        category.id === categoryId
          ? { ...category, icon_url: undefined, icon_path: undefined }
          : category
      )
    )
  }

  async function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaving(true)
    setError(null)
    setSuccess(false)

    try {
      const cleanCategories = categories.map((category) => ({
        ...category,
        category: category.category.trim(),
        technologies: category.technologies
          .map((technology) => technology.trim())
          .filter(Boolean),
      }))

      await updatePortfolioContent({
        skills_eyebrow: eyebrow,
        skills_title: title,
        skills_description: description,
        skills_categories: cleanCategories,
      })

      const currentPaths = new Set(
        cleanCategories
          .map((category) => category.icon_path)
          .filter((path): path is string => Boolean(path))
      )

      const pathsToDelete = originalCategories
        .map((category) => category.icon_path)
        .filter(
            (path): path is string =>
            typeof path === 'string' && !currentPaths.has(path)
        )

      if (pathsToDelete.length > 0) {
        const { error: deleteError } = await supabase.storage
          .from('skill-icons')
          .remove(pathsToDelete)

        if (deleteError) {
          console.error('No se pudieron limpiar algunos íconos:', deleteError)
        }
      }

      setCategories(cleanCategories)
      setOriginalCategories(cleanCategories)
      setSuccess(true)
    } catch {
      setError('No fue posible guardar las habilidades.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <p className="py-8 text-center text-gray-400">Cargando habilidades...</p>
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
        <h4 className="text-lg font-semibold">Sección Habilidades</h4>
        <p className="mt-1 text-sm text-gray-400">
          Administra las categorías, sus íconos y tecnologías de tu portafolio.
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
            <h5 className="font-semibold">Categorías y tecnologías</h5>
            <p className="mt-1 text-sm text-gray-400">
              Organiza las tecnologías y personaliza el ícono de cada categoría.
            </p>
          </div>

          <button
            type="button"
            onClick={addCategory}
            className="flex items-center gap-2 rounded-lg border border-violet-500/30 px-3 py-2 text-sm text-violet-300 transition hover:bg-violet-500/10"
          >
            <Plus size={16} />
            Agregar categoría
          </button>
        </div>

        {categories.map((category, categoryIndex) => (
          <div
            key={category.id}
            className="space-y-4 rounded-xl border border-white/10 bg-white/[0.02] p-4"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-semibold text-gray-300">
                Categoría {categoryIndex + 1}
              </span>

              <button
                type="button"
                onClick={() => removeCategory(categoryIndex)}
                aria-label={`Eliminar categoría ${categoryIndex + 1}`}
                className="rounded-lg p-2 text-gray-400 transition hover:bg-red-500/10 hover:text-red-400"
              >
                <Trash2 size={17} />
              </button>
            </div>

            <div>
              <label className={labelClass}>Nombre de la categoría</label>
              <input
                className={inputClass}
                value={category.category}
                onChange={(e) =>
                  updateCategory(categoryIndex, e.target.value)
                }
                placeholder="Ej. Frontend"
                required
              />
            </div>

            <div>
              <label className={labelClass}>Ícono de la categoría</label>

              <div className="flex flex-wrap items-center gap-4">
                <div className="flex size-20 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                  {category.icon_url ? (
                    <img
                      src={category.icon_url}
                      alt={`Ícono de ${category.category || 'categoría'}`}
                      className="size-12 object-contain"
                    />
                  ) : (
                    <ImagePlus size={28} className="text-gray-500" />
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-violet-500/30 px-3 py-2 text-sm text-violet-300 transition hover:bg-violet-500/10">
                    <ImagePlus size={16} />
                    {uploadingCategory === category.id
                      ? 'Subiendo...'
                      : category.icon_url
                        ? 'Cambiar ícono'
                        : 'Subir PNG'}
                    <input
                      type="file"
                      accept="image/png"
                      className="hidden"
                      disabled={uploadingCategory !== null || saving}
                      onChange={(e) => handleIconUpload(category.id, e)}
                    />
                  </label>

                  {category.icon_url && (
                    <button
                      type="button"
                      onClick={() => removeIcon(category.id)}
                      disabled={saving || uploadingCategory !== null}
                      className="rounded-lg border border-red-500/20 px-3 py-2 text-sm text-red-400 transition hover:bg-red-500/10"
                    >
                      Quitar ícono
                    </button>
                  )}
                </div>
              </div>

              <p className="mt-2 text-xs text-gray-500">
                PNG, máximo 1 MB. Recomendado: 256 × 256 píxeles, fondo transparente.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className={labelClass}>Tecnologías</label>

                <button
                  type="button"
                  onClick={() => addTechnology(categoryIndex)}
                  className="flex items-center gap-1 text-xs text-violet-300 hover:text-violet-200"
                >
                  <Plus size={15} />
                  Agregar
                </button>
              </div>

              {category.technologies.map((technology, technologyIndex) => (
                <div
                  key={`${category.id}-${technologyIndex}`}
                  className="flex items-center gap-2"
                >
                  <input
                    className={inputClass}
                    value={technology}
                    onChange={(e) =>
                      updateTechnology(
                        categoryIndex,
                        technologyIndex,
                        e.target.value
                      )
                    }
                    placeholder="Ej. JavaScript"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      removeTechnology(categoryIndex, technologyIndex)
                    }
                    aria-label="Eliminar tecnología"
                    className="shrink-0 rounded-lg p-2 text-gray-400 transition hover:bg-red-500/10 hover:text-red-400"
                  >
                    <X size={18} />
                  </button>
                </div>
              ))}

              {category.technologies.length === 0 && (
                <p className="text-xs text-gray-500">
                  Todavía no hay tecnologías en esta categoría.
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      {success && (
        <p className="text-sm text-green-400">
          ¡Habilidades actualizadas correctamente!
        </p>
      )}

      <div className="flex justify-end border-t border-white/10 pt-5">
        <button
          type="submit"
          disabled={saving || uploadingCategory !== null}
          className="flex items-center gap-2 rounded-lg bg-violet-600 px-5 py-3 text-sm font-semibold transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Save size={17} />
          {saving ? 'Guardando...' : 'Guardar cambios'}
        </button>
      </div>
    </form>
  )
}

export default SkillsForm
