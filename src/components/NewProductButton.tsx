'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

export default function NewProductButton() {
    const router = useRouter();
    return (
        <button
            className='btn-primary min-w-fit'
            onClick={() => router.push('/products/new')}
        >
            New Product
        </button>
    )
}
