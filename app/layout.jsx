import './globals.css'
import { AuthProvider } from '@/lib/auth/AuthContext'

export const metadata = {
  title: 'Fintia - Finanzas Personales Simples',
  description: 'Fintia - Controla tu dinero sin complicaciones. Registra, visualiza y automatiza tus finanzas personales.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
