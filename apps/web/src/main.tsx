import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
import App from './App'
import { LocaleProvider } from './context/LocaleContext'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <LocaleProvider>
        <App />
      </LocaleProvider>
    </MotionConfig>
  </StrictMode>,
)
