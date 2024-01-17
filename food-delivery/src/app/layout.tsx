import Header from '@/components/Header'
import './globals.css'
import { ThemeProvider  } from '@/theme'
import Footer from '@/components/Footer'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header/>
        <ThemeProvider>{children}</ThemeProvider>
        <Footer/>
      </body>
    </html>
  )
}
