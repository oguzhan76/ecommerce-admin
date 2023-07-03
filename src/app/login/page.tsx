'use client'

import React from 'react'
import { signIn } from 'next-auth/react';

export default function Login() {
    return (
        <div className="bg-cyan-500 w-screen h-screen flex items-center" >
            <div className="text-center w-full">
                <button
                    onClick={() => signIn('google', { callbackUrl: '/'})}
                    className="bg-white p-4 rounded-lg font-semibold"
                >
                    Login with Google
                </button>
            </div>
        </div>
    );
}
