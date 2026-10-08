import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Veille from './pages/Veille.jsx'
import './index.css'
import './page.css'
import './veille.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Veille />
  </StrictMode>,
)
