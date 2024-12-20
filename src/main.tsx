import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';

import App from './App.tsx'
import './index.css'
import { Toaster } from '@/components/ui/toaster.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId='97595572343-v9duromgjrt2vqhc39dirsemmi3hnf64.apps.googleusercontent.com'>
      <BrowserRouter>
        <App />
        <Toaster/>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>,
)
