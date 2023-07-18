'use client'

import { useSession, signIn, signOut } from 'next-auth/react';
import Nav from './Nav';
import { redirect } from 'next/navigation';

export default function SessionLayout({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/login');
        }
    });

    if (status === 'loading') {
        return <h1>Checking Credentials...</h1>
    } else if (status === 'authenticated') {
        return (
            <>
                {session &&
                    <div className='bg-cyan-900 min-h-screen flex'>
                        <Nav></Nav>
                        <div className='bg-white flex-grow mt-2 mr-2 mb-2 rounded-lg p-4'>
                            {children}
                        </div>
                    </div>
                }
            </>
        )
    }
}