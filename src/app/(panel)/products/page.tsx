import ProductsList from '@/components/ProductsList';
import { Suspense, } from 'react';
import Loading from './loading';
import Link from 'next/link';

export default function Products() {
    return (
        <>
            <Link href={'/products/new'} className='btn-primary'>Add Product</Link>
            <Suspense fallback={<Loading />}>
                <ProductsList />
            </Suspense>
        </>
    )
}