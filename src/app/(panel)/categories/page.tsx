'use client'

import React, { FormEvent, useEffect, useRef, useState } from 'react';
import NewCategoryForm from '@/components/NewCategoryForm';
import axios from 'axios';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<PopdCategoryDoc[]>([]);

  useEffect(() => {
    fetchCategories();
  }, [])

  async function fetchCategories() {
    const res = await axios.get('/api/categories');
    setCategories(res.data);
  }

  return (
    <>
      <h1>Categories</h1>
      <NewCategoryForm categories={categories}/>
      <section>
        <div className='p-0 bottomline flex'>
          <h3 className='w-96'>Category Name</h3>
          <h3>Parent Category</h3>
        </div>
        <div className='flex flex-col gap-1 mt-2'>
          {categories.map(item => (
            <div key={item._id} className='rounded-lg bg-slate-200 px-2 inline-flex  h-10 items-center'>
              <p className='w-96'>{item.name}</p>
              <p className=''>{item.parent?.name}</p>
            </div>
          ))
          }
        </div>
      </section>
    </>
  )
}