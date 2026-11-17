import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { setupDeferredPixels } from './utils/pixelLoader'

// Initialize deferred tracking pixels on first interaction (Google Ads, Meta Ads, GA4, Clarity)
setupDeferredPixels()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
