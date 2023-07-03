// products

'use client'

import { useEffect, useState } from 'react';
import SessionLayout from '../components/SessionLayout';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Products() {
    const [products, setProducts] = useState<IProductDoc[]>([]);
    const router = useRouter();

    useEffect(() => {
        axios.get('/api/products').then(response => {
            const data = response.data.map(({ __v, ...rest }: { __v: string }) => rest); // get rid of __v field
            setProducts(data);
            console.log('products: ', data);
        })
    }, []);

    return (
        <SessionLayout>
            <button
                className='btn-primary min-w-fit'
                onClick={() => router.push('/products/new')}
            >
                New Product
            </button>
            <table className='basic mt-2'>
                <thead>
                    <tr>
                        <td>Product name</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product._id}>
                            <td>{product.title}</td>
                            <td>
                                <Link href={'/products/edit/' + product._id}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                    </svg>
                                    Edit
                                </Link>
                                <Link href={'delete'}>
                                    Delete
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </SessionLayout>
    )
}
