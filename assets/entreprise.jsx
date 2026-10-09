import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Entreprise from './pages/Entreprise.jsx'
import './index.css'
import './page.css'
import './wheello.css'
import './entreprise.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Entreprise />
  </StrictMode>,
)
