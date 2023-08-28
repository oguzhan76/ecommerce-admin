'use client'

import React, { useRef, useState, FormEvent } from 'react';
import CategoryParentDropdown from './CategoryParentDropdown';
import CategoryPropertiesList from './CategoryPropertiesList';


// type ValidationError = {
//     category: string | null,
//     property: string | null,
// }

type Props = {
    categories: Category[],
    onSave: (newCategory: Category) => void
}

export default function NewCategoryForm({ categories, onSave }: Props) {
    const categoryNameRef = useRef<HTMLInputElement>(null);
    const propertyNameRef = useRef<HTMLInputElement>(null);
    const propertyValuesRef = useRef<HTMLInputElement>(null);
    const [parentId, setParentId] = useState<string | undefined>(undefined);
    const [CategoryError, setCategoryError] = useState<string>('');
    const [propertyError, setPropertyError] = useState<string>('');
    // const [validationError, setValidationError] = useState<ValidationError>({category: null, property: null});
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

    function addNewProperty() {
        if(!propertyNameRef.current?.value) 
            return setPropertyError('A name should be provided for a new property');
        if(!propertyValuesRef.current?.value)
            return setPropertyError('Values should be provided for a new property');

        const values: string[] = propertyValuesRef.current?.value.split(',');
        setProperties([ ...properties, { name: propertyNameRef.current?.value, values }]);
        propertyNameRef.current.value = '';
        propertyValuesRef.current.value = '';
        setPropertyError('');
    }

    function handleEnterKey(e: React.KeyboardEvent<HTMLInputElement>) {
        if(e.key === 'Enter') addNewProperty();
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
                <form onSubmit={saveNewCategory} className='flex gap-3 mb-4'>
                    <input ref={categoryNameRef} type='text' className='pl-1 w-72 input-border' placeholder='Category name' autoFocus />
                    <CategoryParentDropdown categoriesToShow={categories} setParent={setParentId} />
                    <button type='submit' className='btn btn-primary'>Save</button>
                </form>
            </section>
            <section>
                <h3>
                    Properties<span>
                        {/* <button 
                            className='btn btn-small rounded leading-3 p-1 mx-2'
                            onClick={createProperty}
                        >+</button> */}
                    </span>
                </h3>
                <CategoryPropertiesList properties={properties}/>
                {propertyError && <p className='text-error'>* {propertyError}</p>}
                <div className='inline-flex gap-2'>
                    <input onKeyDown={handleEnterKey} ref={propertyNameRef} className='w-44' placeholder='Name'/>
                    <input onKeyDown={handleEnterKey} ref={propertyValuesRef} className='w-96' placeholder='Values (Separate with comma, no space)'/>
                    <button 
                            className='btn btn-small rounded text-sm leading-3 p-1 mx-2 h-7'
                            onClick={addNewProperty}
                    >Add</button>
                </div>
            </section>
        </>
    )
}

// e.key === 'Enter' ? addNewProperty() : null)