import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Wheello from './pages/Wheello.jsx'
import './index.css'
import './wheello.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Wheello />
  </StrictMode>,
)
