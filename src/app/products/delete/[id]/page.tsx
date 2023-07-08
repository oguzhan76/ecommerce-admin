'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import axios from 'axios';

type Params = {
    params: { id: string }
}

export default function DeleteProductPage({ params: { id } }: Params) {
    const router = useRouter();
    const [productInfo, setProductInfo] = useState<ProductDoc>();

    // TODO handle errors

    useEffect(() => {
        axios.get(`/api/products/${id}`).then(res => {
            setProductInfo(res.data);
        })
    }, [id]);

    async function deleteItem() {
        if(productInfo?.images?.length) {   
            const ut = axios.put('/api/products', productInfo?.images?.map(item => item.fileKey));
            const mongo = axios.delete(`/api/products/${id}`);

            Promise.all([mongo, ut]).then(responses => {
                responses.forEach(res => {
                    if (res.statusText !== "OK") 
                        alert(res.data);
                });
                return router.replace('/products');
            });
        } else {
            const res = await axios.delete(`/api/products/${id}`);
            if(res.statusText === "OK")
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
