import Footer from '@/components/Footer'
import { UserAccountHamburger } from '@/components/UserAccountHamburger'
import HamburgerNav from '@/components/HamburgerNav'
import Header from '@/components/Header'
import NavBar from '@/components/NavBar'
import Providers from '@/components/Providers'
import { cn, createMetadata } from '@/lib/utils'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Suspense } from 'react'
import { Toaster } from 'sonner'
import './globals.css'
import UserAccountNavBar from '@/components/UserAccountNavBar'

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
