import './globals.css'
import { Inter } from 'next/font/google';
import { NextAuthProvider } from '@/components/NextAuthProvider';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Admin Dashboard',
  description: 'Admin panel for ecommerce',
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
            {children}
        </NextAuthProvider>
      </body>
    </html>
  )
}
