'use client'

import { useSession, signIn, signOut } from 'next-auth/react';

export default function Signin() {
    const { data: session } = useSession();
    
    if (!session) {
        return (
            <button
            onClick={() => signIn('google')}
            className="bg-white p-4 rounded-lg font-semibold"
            >
                Login with Google
            </button>
        )
    }

    return <p>{session.user.email}</p>
}