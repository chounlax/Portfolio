import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Cyber2 from './pages/Cyber2.jsx'
import './index.css'
import './page.css'
import './cyber.css'
import './cyber2.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Cyber2 />
  </StrictMode>,
)
