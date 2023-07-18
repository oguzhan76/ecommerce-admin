'use client'

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { redirect } from 'next/navigation';
import ProductsList from '@/components/ProductsList';
import NavigationLayout from '@/components/NavigationLayout';


export default function Products() {
    const { status } = useSession({
        required: true,
        onUnauthenticated() {
            console.log('directed from /products/page.tsx');
            redirect('/login');
        }
    });
    const router = useRouter();

    if (status === 'loading') {
        return <h1>Checking Credentials...</h1>
    } else if (status === 'authenticated') {
        return (
            <NavigationLayout>
                <button
                    className='btn-primary min-w-fit'
                    onClick={() => router.push('/products/new')}
                >
                    New Product
                </button>
                <ProductsList />
            </NavigationLayout>
        )
    }
}
