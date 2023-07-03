// products/new

'use client'

import SessionLayout from '@/app/components/SessionLayout';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import ProductForm from '@/app/components/ProductForm';

export default function NewProduct() {
    const router = useRouter();

    const createProduct = async (productData: IProduct) => {
        await axios.post('/api/products', productData);
        router.push('/products');
    }

    return (
        <SessionLayout>
            <h1>New Product</h1>
            <ProductForm onSubmit={createProduct}/>
        </SessionLayout>
    )
}
