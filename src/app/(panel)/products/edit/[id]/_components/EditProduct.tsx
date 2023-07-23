'use client'

import { useRouter } from 'next/navigation';
import axios from 'axios';
import ProductForm from '@/components/ProductForm';


export default async function EditProduct({ productInfo }: { productInfo: ProductDoc }) {
    const router = useRouter();

    const editProduct = async (productData: ProductDoc | Product) => {
        try {
            await axios.patch('/api/products', productData);
        } catch (error) {
            if(error.response.status >= 500)   
                console.error(error.response.data.message, error);
            else console.error('Network Error when editing', error);
            alert('Error when editing product');
        }
        router.push(`/products`);
        router.refresh();
    }
    
    return (
        <>
            <h1>Edit Product</h1>
            {
                productInfo &&
                <ProductForm onSubmit={editProduct} productInfo={productInfo} />
            }
        </>
    )
}