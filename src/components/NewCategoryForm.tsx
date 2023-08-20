'use client'

import React, { useRef, useState, FormEvent} from 'react';
import CategoryParentDropdown from './CategoryParentDropdown';

type Props = {
    categories: Category[],
    onSave: (name: string, parentId: string | undefined) => void
}

export default function NewCategoryForm({ categories, onSave }: Props) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [parentId, setParentId] = useState<string | undefined>(undefined);
    const [validationError, setValidationError] = useState<string>('');

    async function saveNewCategory(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if(!inputRef.current?.value.length)
            return setValidationError('A name should be provided for a new category');
            
        onSave(inputRef.current?.value, parentId || undefined);
        inputRef.current!.value = '';
        setValidationError('');
    }

    return (
        <section>
            <div className='my-2 bottomline flex'>
                <label className='w-72'>New category name</label>
                <label className='w-72 pl-3'>Parent Category</label>
            </div>
            {!!validationError.length && 
                <div className='text-sm italic text-red-400 font-semibold'>
                    <p>* {validationError}</p>
                </div>
            }
            <form onSubmit={saveNewCategory} className='flex gap-3 mb-4'>
                <input ref={inputRef} type='text' className='pl-1 w-72' autoFocus />
                <CategoryParentDropdown categories={categories} setParent={setParentId} />
                <button type='submit' className='btn-primary'>Save</button>
            </form>
        </section>
    )
}
