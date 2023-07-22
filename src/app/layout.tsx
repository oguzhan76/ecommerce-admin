import './globals.css'
import { Inter } from 'next/font/google';
import { NextAuthProvider } from '@/components/NextAuthProvider';
import { getServerSession } from "next-auth";
import { AuthOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import Nav from '@/components/Nav';


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Admin Dashboard',
  description: 'Admin panel for ecommerce',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(AuthOptions);

  if (!session) {
    const headerslist = headers();
    const path = headerslist.get('x-invoke-path');
    redirect(`/api/auth/signin?callbackUrl=${path}`);
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className='bg-cyan-900 min-h-screen flex'>
          <Nav></Nav>
          <div className='bg-white flex-grow mt-2 mr-2 mb-2 rounded-lg p-4'>
            {/* <NextAuthProvider> */}
            {children}
            {/* </NextAuthProvider> */}
          </div>
        </div>
      </body>
    </html>
  )
}
