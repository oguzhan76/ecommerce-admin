'use client'

import { useSession, signIn, signOut } from 'next-auth/react';
import Nav from './Nav';

export default function SessionLayout({ children } : { children: React.ReactNode }) {
    const { data: session } = useSession();

    if (!session) {
        return (
            <div className="bg-cyan-500 w-screen h-screen flex items-center" >
                <div className="text-center w-full">
                    <button
                        onClick={() => signIn('google')}
                        className="bg-white p-4 rounded-lg font-semibold"
                    >
                        Login with Google
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className='bg-cyan-900 min-h-screen flex'>
            <Nav></Nav>
            <div className='bg-white flex-grow mt-2 mr-2 mb-2 rounded-lg p-4'>
                {children}
            </div>
        </div>
    )
}