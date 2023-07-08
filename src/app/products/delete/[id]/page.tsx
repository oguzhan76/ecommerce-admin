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
        const res = await axios.delete(`/api/products/${id}`);
        if (res.statusText === "OK") {
            router.replace('/products');
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
