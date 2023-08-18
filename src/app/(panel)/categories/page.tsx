'use client'

import React, { useEffect, useState, useMemo } from 'react';
import NewCategoryForm from '@/components/NewCategoryForm';
import axios from 'axios';
import CategoriesListItem from '@/components/CategoriesListItem';


export default function CategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);

    // Map to all categories with their ids as key; and themselves as value. For optimizing searching.
    const map: Map<string, Category> = useMemo(() => {
        return new Map<string, Category>(categories.map(item => { return [item._id, item] }));
    }, [categories]);

    // A Map that has all the parent categories ids as a key and array of ids of their children as value
    // Categories with no children are excluded
    const subsMap: Map<string, string[]> = useMemo(() => {
        const subsMap = new Map<string, Array<string>>(categories.filter(item => !!item.parent)
            .map(item => {
                return [item.parent!, []];
            })
        );
        categories.forEach(item => {
            if (item.parent) subsMap.get(item.parent)?.push(item._id);
        });
        return subsMap;
    }, [categories]);

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
            <NewCategoryForm categories={categories} onSave={onCreateNew} />
            <section>
                <div className='p-0 bottomline flex'>
                    <h3 className='w-96'>Category Name</h3>
                    {/* <h3>Parent Category</h3> */}
                </div>
                <div className='flex flex-col gap-1 mt-2'>
                    {categories.map(item => !item.parent && (
                        <CategoriesListItem
                            key={item._id}
                            item={item}
                            categories={categories}
                            categoriesMap={map}
                            subsMap={subsMap}
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