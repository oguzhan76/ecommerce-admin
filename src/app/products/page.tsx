'use client'

import { FormEvent, useState } from 'react'
import SessionLayout from '../components/SessionLayout'
import axios from 'axios';

export default function Products() {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [price, setPrice] = useState<string>('');

    const createProduct = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = { title, description, price };
        await axios.post('/api/products', data);
    }

    return (
        <SessionLayout>
            <form onSubmit={e => createProduct(e)} className='flex flex-col'>
                <h1>New Product</h1>
                <label>Product Name</label>
                <input 
                    type='text' 
                    placeholder='product name' 
                    value={title}
                    onChange={e => setTitle(e.target.value)} 
                />
                <label>Description</label>
                <textarea 
                    placeholder='description'
                    value={description}
                    onChange={e => setDescription(e.target.value)} 
                />
                <label>Price (in USD)</label>
                <input 
                    type='text' 
                    placeholder='price' 
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                />
                <button type='submit' className='btn-primary'>Save</button>
            </form>
        </SessionLayout>
    )
}
