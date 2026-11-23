import { Routes, Route } from 'react-router-dom'

import Navbar from './components/layout/Navbar'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Projects from './components/sections/Projects'
import Skills from './components/sections/Skills'
import Contact from './components/sections/Contact'
import Footer from './components/layout/Footer'
import Login from './pages/Login'
import Admin from './pages/Admin'

import ProtectedRoute from './components/ProtectedRoute'

function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
        <Footer />
      </main>
    </>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<ProtectedRoute> <Admin /> </ProtectedRoute>} />
    </Routes>
  )
}

export default App