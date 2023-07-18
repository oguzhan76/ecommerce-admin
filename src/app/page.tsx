// Dashboard page

'use client'

import NavigationLayout from '@/components/NavigationLayout';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function Home() {
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/login');
        }
    });

    console.log('dashboard', status);
    if (status === 'loading') {
        return <h1>Checking Credentials...</h1>
    } else if (status === 'authenticated') {
        return (
            <>
                {session &&
                    <NavigationLayout>
                        <div className='flex justify-between'>
                            <h2>
                                Hello, {session?.user?.name}
                            </h2>
                            <div className='flex bg-gray-300 gap-1 text-black rounded-2xl'>
                                {session?.user?.image && <img src={session?.user?.image} alt='' className='w-8 h-8 rounded-2xl' />}
                                <span className='py-1 pl-2 pr-4'>{session?.user?.name}</span>
                            </div>
                        </div>
                    </NavigationLayout>
                }
            </>
        )
    }
}