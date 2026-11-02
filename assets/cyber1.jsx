import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Cyber1 from './pages/Cyber1.jsx'
import './index.css'
import './page.css'
import './cyber.css'
import './cyber1.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Cyber1 />
  </StrictMode>,
)
