'use client'

import { useRouter } from 'next/navigation';
import axios from 'axios';
import ProductForm from '@/components/ProductForm';

export default function NewProduct() {
    const router = useRouter();

    const createProduct = async (productData: Product) => {
        try {
            await axios.post('/api/products', productData);
        } catch (error) {
            if (error.response.status >= 500)
                console.error(error.response.data.message);
            else
                console.error('Network Error', error);
            alert('Error when creating product');
        }
        router.push('/products');
    }

    return (
        <>
            <h1 className='pl-4'>New Product</h1>
            <div className='page-container '>
                <ProductForm onSubmit={createProduct} />
            </div>
        </>
    )
}
