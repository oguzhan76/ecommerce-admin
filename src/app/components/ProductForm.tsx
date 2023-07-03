import { useState, FormEvent, useEffect } from 'react'

type Props = {
    onSubmit: (p: IProduct) => void,
    populate?: IProduct
}

export default function ProductForm({ onSubmit, populate }: Props) {
    const [title, setTitle] = useState<string>(populate?.title || '');
    const [description, setDescription] = useState<string>(populate?.description || '');
    const [price, setPrice] = useState<string>(populate?.price.toString() || '');

    const handleSubmit = (e: FormEvent<HTMLFormElement> ) => {
        e.preventDefault();
        onSubmit({title, description, price: parseInt(price) });
    }

    return (
        <form onSubmit={handleSubmit} className='flex flex-col'>
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
    )
}