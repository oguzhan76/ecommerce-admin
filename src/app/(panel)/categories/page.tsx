'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NewCategoryForm from '@/components/NewCategoryForm';
import CategoriesListItem from '@/components/CategoriesListItem';
import useMappedCategories from '@/hooks/useMappedCategories';


export default function CategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [expanded, setExpanded] = useState<Boolean>(false);
    const {categoriesMap, isDescendant, getAllDescendantsOf } = useMappedCategories(categories);

    useEffect(() => {
        fetchCategories();
    }, []);

    async function fetchCategories() {
        const res = await axios.get('/api/categories');
        setCategories(res.data);
    }

    function onEditAnItem(cat: Category) {
        const updatedCategories: Category[] = categories.map(item => item._id === cat._id ? cat : item);
        setCategories(updatedCategories);
    }

    async function onCreateNew(name: string, parentId: string | undefined) {
        try {
            const newCat = { name, parent: parentId };
            console.log('parent', parentId);
            await axios.post('/api/categories', newCat);
            fetchCategories();
        } catch (error) {
            console.error(error.message);
            alert(`Error! Please try again!`)
        }
    }

    return (
        <>
            <h1>Categories</h1>
            <NewCategoryForm categories={categories} onSave={onCreateNew}/>
            <section>
                <div className='p-0 bottomline flex'>
                    <h3 className='w-96'>Category Name</h3>
                </div>
                <div className='flex flex-col gap-1 mt-2'>
                    <button className='bg-none underline w-24 text-sm' onClick={() => setExpanded(prev => !prev)}>{expanded ? 'Collapse all' : 'Expand All'}</button>
                    {categories.map(item => !item.parent && (
                        <CategoriesListItem
                            key={item._id}
                            item={item}
                            categories={categories}
                            categoriesMap={categoriesMap}
                            expanded={expanded}
                            isDescendant={isDescendant}
                            getAllDescendantsOf={getAllDescendantsOf}
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