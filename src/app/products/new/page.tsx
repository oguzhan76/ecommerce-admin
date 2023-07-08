// products/new

'use client'

import { useRouter } from 'next/navigation';
import axios from 'axios';
import ProductForm from '@/app/components/ProductForm';

export default function NewProduct() {
    const router = useRouter();

    const createProduct = async (productData: Product) => {
        await axios.post('/api/products', productData);
        router.push('/products');
    }

    return (
        <>
            <h1>New Product</h1>
            <ProductForm onSubmit={createProduct}/>
        </>
    )
}
