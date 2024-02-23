import Header from '@/components/Header'
import './scss/globals.scss'
import { ThemeProvider  } from '@/theme'
import { UserProvider } from '@/context/UserProvider'
import Footer from '@/components/Footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { CategoryProvider } from '@/context/CategoryProvider'
import { FoodProvider } from '@/context/FoodProvider'

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
            <CategoryProvider>
              <FoodProvider>
                <ToastContainer/>
                <Header/>
                  {children}
                <Footer/>
              </FoodProvider>
            </CategoryProvider>
          </UserProvider>
        </ThemeProvider> 
      </body>
    </html>
  )
}
