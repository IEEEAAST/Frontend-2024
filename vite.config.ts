import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.VITE_REACT_FIREBASE_API_KEY':JSON.stringify(process.env.VITE_REACT_FIREBASE_API_KEY),
    'process.env.VITE_REACT_FIREBASE_AUTH_DOMAIN':JSON.stringify(process.env.VITE_REACT_FIREBASE_AUTH_DOMAIN),
    'process.env.VITE_REACT_FIREBASE_PROJECT_ID':JSON.stringify(process.env.VITE_REACT_FIREBASE_PROJECT_ID),
    'process.env.VITE_REACT_FIREBASE_STORAGE_BUCKET':JSON.stringify(process.env.VITE_REACT_FIREBASE_STORAGE_BUCKET),
    'process.env.VITE_REACT_FIREBASE_MESSAGING_SENDER_ID':JSON.stringify(process.env.VITE_REACT_FIREBASE_MESSAGING_SENDER_ID),
    'process.env.VITE_REACT_FIREBASE_APP_ID':JSON.stringify(process.env.VITE_REACT_FIREBASE_APP_ID),
    'process.env.VITE_REACT_FIREBASE_APP_CHECK':JSON.stringify(process.env.VITE_REACT_FIREBASE_APP_CHECK),
    
  }
})
