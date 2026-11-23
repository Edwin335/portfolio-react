import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renderiza las secciones principales del portafolio', () => {
    render(<App />)
    expect(screen.getByText(/Edwin Javier Pabón Rodríguez/i)).toBeInTheDocument()
    expect(screen.getByText(/Sobre mí/i)).toBeInTheDocument()
    expect(screen.getAllByText(/Proyectos/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Habilidades/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Contacto/i).length).toBeGreaterThan(0)
  })
})