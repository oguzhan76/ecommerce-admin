'use client'

import { useSession, signIn, signOut } from 'next-auth/react';
import Nav from './Nav';
import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import Loading from '../loading';

export default function SessionLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/login');
    }
  });

  return (
    <Suspense fallback={<Loading />}>
      {session && 
      <div className='bg-cyan-900 min-h-screen flex'>
        <Nav></Nav>
        <div className='bg-white flex-grow mt-2 mr-2 mb-2 rounded-lg p-4'>
          {children}
        </div>
      </div>
      }
    </Suspense>
  )
}