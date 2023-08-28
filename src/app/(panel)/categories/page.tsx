'use client'

import React, { useEffect } from 'react';
import axios from 'axios';
import NewCategoryForm from '@/components/NewCategoryForm';
import CategoriesListItem from '@/components/CategoriesListItem';
import { useCategoriesContext } from '@/contexts/CategoriesContext';


export default function CategoriesPage() {
    const { categories, setCategories, listExpanded, setListExpanded } = useCategoriesContext();

    useEffect(() => {
        fetchCategories();
    }, []);

    async function fetchCategories() {
        const res = await axios.get('/api/categories');
        setCategories(res.data);
        console.log(res.data);
    }

    function onEditAnItem(editedCategory: Category) {
        const updatedCategories: Category[] = categories.map(item => item._id === editedCategory._id ? editedCategory : item);
        setCategories(updatedCategories);
    }

    async function onCreateNew(newCategory: Category) {
        try {
            // const newCategory = { name, parent: parentId };
            const res = await axios.post('/api/categories', newCategory);
            console.log('created cat:', res.data);
            fetchCategories();
        } catch (error) {
            console.error(error.message);
            alert(`Error! Please try again!`)
        }
    }

    return (
        <>
            <div className='page-container p-4 mb-4'>
                <NewCategoryForm categories={categories} onSave={onCreateNew} />
            </div>
            <section className='bg-white rounded-lg p-4'>
                <div className='p-0 bottomline flex'>
                    <h3 className='w-96'>Category Name</h3>
                </div>
                <div className='flex flex-col gap-1 mt-2'>
                    <button className='bg-none underline w-24 text-sm' onClick={() => setListExpanded(prev => !prev)}>{listExpanded ? 'Collapse all' : 'Expand All'}</button>
                    {categories.map(item => !item.parent && (
                        <CategoriesListItem
                            key={item._id}
                            item={item}
                            onEdit={onEditAnItem}
                            onDelete={fetchCategories}
                        />
                    ))
                    }
                </div>
            </section>
        </>
    )
}