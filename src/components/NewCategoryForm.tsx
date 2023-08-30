'use client'

import React, { useRef, useState, FormEvent } from 'react';
import CategoryParentDropdown from './CategoryParentDropdown';
import PropertyForm from './PropertyForm';
import PropertyListItem from './PropertyListItem';

type Props = {
    categories: Category[],
    onSave: (newCategory: Category) => void
}

export default function NewCategoryForm({ categories, onSave }: Props) {
    const categoryNameRef = useRef<HTMLInputElement>(null);
    const [parentId, setParentId] = useState<string | undefined>(undefined);
    const [CategoryError, setCategoryError] = useState<string>('');
    const [properties, setProperties] = useState<Property[]>([]);

    async function saveNewCategory(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!categoryNameRef.current?.value.length)
            return setCategoryError('A name should be provided for a new category');

        const newCategory: Category = {
            _id: '',
            name: categoryNameRef.current?.value,
            parent: parentId || undefined,
            properties
        }
        onSave(newCategory);
        categoryNameRef.current!.value = '';
        setCategoryError('');
    }

    function onAddProperty(property: Property): boolean {
        console.log(property);
        if (properties.find(item => item.name === property.name))
            return false;
        else
            setProperties(prev => ([...prev, property]));
        return true;
    }

    function deleteProperty(item: Property) {
        setProperties(properties.filter(i => i.name !== item.name));
    }

    return (
        <>
            <section>
                <div className='bottomline flex'>
                    <h3>Create New Category</h3>
                </div>
                {!!CategoryError &&
                    <div className='text-error'>
                        <p>* {CategoryError}</p>
                    </div>
                }
                <form onSubmit={saveNewCategory} className='flex flex-wrap gap-3 mb-4'>
                    <input ref={categoryNameRef} type='text' className='pl-1 w-72 input-border' placeholder='Category name' autoFocus />
                    <CategoryParentDropdown categoriesToShow={categories} setParent={setParentId} />
                    <button type='submit' className='btn btn-primary'>Save</button>
                </form>
            </section>
            <section>
                <h3>Properties</h3>
                {!!properties.length && properties.map(item => (
                    <div key={item.name} className='flex items-center gap-5 h-8'>
                        <button className="btn border-none hover:shadow-none" onClick={() => deleteProperty(item)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                        </button>
                        <>
                            <p className='w-24'>{item.name}</p>
                            <p>{item.values.map((val, i) => [
                                i > 0 && ", ",
                                <span key={i} >{val}</span>])}
                            </p>
                        </>
                    </div>
                ))}
                <PropertyForm onSave={onAddProperty} />
            </section>
        </>
    )
}