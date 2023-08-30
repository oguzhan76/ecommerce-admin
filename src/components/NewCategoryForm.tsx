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
        if(properties.find(item => item.name === property.name))
            return false;
        else
            setProperties(prev => ([ ...prev, property]));
        return true;
    }

    function onEditProperty(property: Property): boolean {
        setProperties
        return true;
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
                        <div key={item.name} className='flex items-center gap-5 h-8 '>
                            <PropertyListItem property={item} allowEditing onEdit={onEditProperty} />
                        </div>
                    ))}
                <PropertyForm onSave={onAddProperty}/>
            </section>
        </>
    )
}