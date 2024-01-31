import Header from '@/components/Header'
import './scss/globals.scss'
import { ThemeProvider  } from '@/theme'
import { UserProvider } from '@/context/UserProvider'
import Footer from '@/components/Footer'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        
        <ThemeProvider>
          <UserProvider>
            <Header/>
              {children}
            <Footer/>
          </UserProvider>
        </ThemeProvider> 
      </body>
    </html>
  )
}
