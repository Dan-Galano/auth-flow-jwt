import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/base/index.css'
import './styles/base/typography.css'
import './styles/base/fontsizes.css'
import './styles/components/buttons.css'
import './styles/utilities/animations.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
