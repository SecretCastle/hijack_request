import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import '@/core/xhr_hijack.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.Fragment>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.Fragment>
)
