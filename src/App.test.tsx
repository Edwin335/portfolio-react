import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from './App'

import { vi } from 'vitest'

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

describe('App', () => {
  it('renderiza las secciones principales del portafolio', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    )

    expect(screen.getByText(/Edwin Javier Pabón Rodríguez/i)).toBeInTheDocument()
    expect(screen.getByText(/Sobre mí/i)).toBeInTheDocument()
    expect(screen.getAllByText(/Proyectos/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Habilidades/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Contacto/i).length).toBeGreaterThan(0)
  })
})