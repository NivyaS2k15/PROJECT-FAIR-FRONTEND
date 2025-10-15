import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './bootstrap.min.css'
import ContextApi from './contexts/ContextApi.jsx'
import { AuthcontextApi } from './contexts/AuthcontextApi.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthcontextApi>
      <ContextApi>
        <App />
      </ContextApi>
    </AuthcontextApi>
  </StrictMode>
)