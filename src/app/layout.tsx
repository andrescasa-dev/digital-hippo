import Footer from '@/components/Footer'
import { FooterHamburgerNav } from '@/components/FooterHamburgerNav'
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
          <Header>
            <HamburgerNav>
              <Suspense>
                <FooterHamburgerNav />
              </Suspense>
            </HamburgerNav>
            <NavBar/>
          </Header>
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
