'use client'

import React from 'react'
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

export default function Login() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl')  || '/';

    return (
        <div className="bg-cyan-500 w-screen h-screen flex items-center" >
            <div className="text-center w-full">
                <button
                    onClick={() => signIn('google', { callbackUrl })}
                    className="bg-white p-4 rounded-lg font-semibold"
                >
                    Login with Google
                </button>
            </div>
        </div>
    );
}
