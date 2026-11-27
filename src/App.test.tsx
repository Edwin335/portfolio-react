import '@testing-library/jest-dom/vitest'

import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from './App'

vi.mock('./lib/supabase', () => ({
  supabase: {
    auth: {
      onAuthStateChange: vi.fn(() => ({
        data: {
          subscription: {
            unsubscribe: vi.fn(),
          },
        },
      })),
      signInWithPassword: vi.fn(),
      signOut: vi.fn(),
    },
  },
}))

vi.mock('./services/portfolioContentService', () => ({
  getPortfolioContent: vi.fn().mockResolvedValue({
    id: 1,
    about_eyebrow: 'Conóceme',
    about_title: 'Sobre mí',
    about_subtitle: 'Desarrollador de Software',
    about_description: 'Descripción de prueba',
    about_secondary_description: 'Segunda descripción de prueba',
    about_cards: [],
    skills_eyebrow: 'Tecnologías',
    skills_title: 'Habilidades',
    skills_description: 'Descripción de habilidades',
    skills_categories: [],
    contact_eyebrow: 'Contacto',
    contact_title: 'Contacto',
    contact_description: 'Descripción de contacto',
    contact_methods: [],
    updated_at: '2026-11-27T00:00:00.000Z',
  }),
}))

vi.mock('./services/projectService', () => ({
  getPublishedProjects: vi.fn().mockResolvedValue([]),
}))

describe('App', () => {
  it('renderiza las secciones principales del portafolio', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    )

    expect(screen.getByText(/Edwin Javier Pabón Rodríguez/i)).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText(/Sobre mí/i)).toBeInTheDocument()
      expect(screen.getAllByText(/Proyectos/i).length).toBeGreaterThan(0)
      expect(screen.getAllByText(/Habilidades/i).length).toBeGreaterThan(0)
      expect(screen.getAllByText(/Contacto/i).length).toBeGreaterThan(0)
    })
  })
})
