import './globals.css'
import { AuthProvider } from '@/lib/auth/AuthContext'
import Providers from '@/components/Providers'

export const metadata = {
  title: 'Fintia - Finanzas Personales Simples',
  description: 'Fintia - Controla tu dinero sin complicaciones. Registra, visualiza y automatiza tus finanzas personales.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Providers>
          <AuthProvider>
            {children}
          </AuthProvider>
        </Providers>
      </body>
    </html>
  )
}
