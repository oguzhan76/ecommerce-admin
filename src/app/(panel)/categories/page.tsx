'use client'

import React, { useEffect, useState } from 'react';
import NewCategoryForm from '@/components/NewCategoryForm';
import axios from 'axios';
import CategoriesListItem from '@/components/CategoriesListItem';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<PopdCategoryDoc[]>([]);

  useEffect(() => {
    fetchCategories();
  }, [])


  async function fetchCategories() {
    const res = await axios.get('/api/categories');
    setCategories(res.data);
    console.log(res.data);
  }

  function onEditAnItem(cat: PopdCategoryDoc) {
    const updatedCategories: PopdCategoryDoc[] = categories.map(item => item._id === cat._id ? cat : item);
    setCategories(updatedCategories);
  }

  return (
    <>
      <h1>Categories</h1>
      <NewCategoryForm categories={categories} />
      <section>
        <div className='p-0 bottomline flex'>
          <h3 className='w-96'>Category Name</h3>
          <h3>Parent Category</h3>
        </div>
        <div className='flex flex-col gap-1 mt-2'>
          {categories.map(item => (
            <CategoriesListItem key={item._id} item={item} categories={categories} onEdit={onEditAnItem}/>
          ))
          }
        </div>
      </section>
    </>
  )
}