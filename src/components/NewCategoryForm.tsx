'use client'

import React, { useRef, useState, FormEvent} from 'react';
import axios from 'axios';
import CategoryParentDropdown from './CategoryParentDropdown';

type Props = {
    categories: Category[],
    onSave: (name: string, parentId: string | null) => void,
}

export default function NewCategoryForm({ categories, onSave }: Props) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [parentId, setParentId] = useState<string | null>(null);

    async function saveNewCategory(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        onSave(inputRef.current?.value || '', parentId);
        inputRef.current!.value = '';
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
