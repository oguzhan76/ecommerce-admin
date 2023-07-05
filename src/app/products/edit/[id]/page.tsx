// products/edit/[id]

'use client'

import { useRouter } from 'next/navigation';
import axios from 'axios';
import ProductForm from '@/app/components/ProductForm';
import { useEffect, useState } from 'react';

type Params = {
    params: { id: string }
}

// TODO: generate static params

export default async function EditProduct({ params: { id } }: Params) {
    const router = useRouter();
    const [productInfo, setProductInfo] = useState<IProduct>();

    // get the product from db with id
    useEffect(() => {
        axios.get(`/api/products/${id}`).then(res => {
            setProductInfo(res.data);
        })
    }, [id]);

    const editProduct = async (productData: IProduct) => {
        const updatedProduct: IProductDoc = { _id: id, ...productData };
        const res = await axios.patch('/api/products/', updatedProduct);
        router.push('/products');
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