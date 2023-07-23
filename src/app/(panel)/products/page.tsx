import ProductsList from '@/components/ProductsList';
import NewProductButton from '@/components/NewProductButton';
import { Suspense } from 'react';
import loading from './loading';

export default function Products() {
    return (
        <>
            <NewProductButton />
            <Suspense fallback={loading()}>
                <ProductsList />
            </Suspense>
        </>
    )
}