import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Providers from '@/components/Providers'
import { UserAccountHamburger } from '@/components/UserAccountHamburger'
import UserAccountNavBar from '@/components/UserAccountNavBar'
import { cn, createMetadata } from '@/lib/utils'
import { Inter } from 'next/font/google'
import { Toaster } from 'sonner'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = createMetadata()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, 'antialiased')}>
        <Providers>
          <Header 
            UserAccountHamburger={<UserAccountHamburger />} 
            UserAccountNavbar={<UserAccountNavBar/>}
          />
          <main>
            {children}
          </main>
          <Footer />
        </Providers>
        <Toaster position='top-center' richColors={true} />
      </body>
    </html>
  )
}
