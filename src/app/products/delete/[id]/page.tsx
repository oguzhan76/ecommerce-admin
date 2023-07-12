'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios';

type Params = {
    params: { id: string }
}

export default function DeleteProductPage({ params: { id } }: Params) {
    const router = useRouter();
    const [productInfo, setProductInfo] = useState<ProductDoc>();

    useEffect(() => {
        axios.get(`/api/products/${id}`).then(res => {
            setProductInfo(res.data);
        })
        .catch(e => console.error('Error: No product with this id!', e));
    }, [id]);

    async function deleteItem() {
        if(productInfo?.images?.length) {   
            const ut: Promise<AxiosResponse> = axios.put('/api/products', productInfo?.images?.map(item => item.fileKey));
            const mongo: Promise<AxiosResponse> = axios.delete(`/api/products/${id}`);

            Promise.all([mongo, ut]).then(responses => {
                responses.forEach(res => console.log(res.data) );
            }).catch(e => console.error(e.response.data.message));
            return router.replace('/products');
        } else {
            try {
                await axios.delete(`/api/products/${id}`);
            } catch (error) {
                alert('Error when deleting this product');
                console.log(error);
            }     
            return router.replace('/products');
        }
    }

    return (
        <>
            {productInfo &&
                <>
                    <h1 className='text-center'>Are you sure about deleting this product &apos;{productInfo?.title}&apos; permanently?</h1>
                    <div className='flex gap-2 justify-center'>
                        <button className='btn-red' onClick={deleteItem}>Yes</button>
                        <button className='btn-default' onClick={() => router.replace('/products')}>No</button>
                    </div>
                </>}
        </>
    )
}
