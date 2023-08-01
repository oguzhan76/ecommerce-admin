import React, { useRef, useState, useEffect, FormEvent} from 'react';
import axios from 'axios';
import CategoryParentDropdown from './CategoryParentDropdown';
import * as mongoose from 'mongoose';

export default function NewCategoryForm({ categories }: {categories: Category[] }) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [parent, setParentId] = useState<string | null>(null);

    async function saveNewCategory(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const newCategory: Category = {
            name: inputRef.current?.value || '',
        }
        if(parent) newCategory.parent = new mongoose.Types.ObjectId(parent);
        
        const res = await axios.post('/api/categories', newCategory);
        console.log(res.data);
    }
    
    return (
        <section>
            <div className='my-2 bottomline flex'>
            <label className='w-72'>New category name</label>
            <label className='w-72 pl-3'>Parent Category</label>
            </div>
            <form onSubmit={saveNewCategory} className='flex gap-3 mb-4'>
                <input ref={inputRef} type='text' className='pl-1 w-72' autoFocus />
                <CategoryParentDropdown categories={categories} setParent={setParentId} />
                <button type='submit' className='btn-primary'>Save</button>
            </form>
        </section>
    )
}
