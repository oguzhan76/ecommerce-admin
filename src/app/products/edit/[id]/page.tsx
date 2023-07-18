'use client'

import { useRouter } from 'next/navigation';
import axios from 'axios';
import ProductForm from '@/components/ProductForm';
import { useEffect, useState } from 'react';

type Params = {
    params: { id: string }
}

export const revalidate = 60;

export default async function EditProduct({ params: { id } }: Params) {
    const router = useRouter();
    const [productInfo, setProductInfo] = useState<ProductDoc>();

    // get the product from db with id
    useEffect(() => {
        axios.get(`/api/products/${id}`).then(res => {
            setProductInfo(res.data);
        })
        .catch(e => {
            console.error(e.response.data.message, e);
            alert('Error fetching product details');
            router.replace('/products');
        });
    }, [id]);

    const editProduct = async (productData: ProductDoc | Product) => {
        try {
            await axios.patch('/api/products', productData);
        } catch (error) {
            if(error.response.status >= 500)   
                console.error(error.response.data.message, error);
            else console.error('Network Error when editing', error);
            alert('Error when editing product');
        }
        router.push('/products');
    }

    return (
        <>
            <h1>Edit Product</h1>
            {
                productInfo &&
                <ProductForm editProduct={editProduct} productInfo={productInfo} />
            }
        </>
    )
}