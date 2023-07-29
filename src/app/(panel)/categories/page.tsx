'use client'

import React, { FormEvent, useEffect, useRef, useState } from 'react';
import NewCategoryForm from '@/components/NewCategoryForm';
import axios from 'axios';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<CategoryDoc[]>([]);



  useEffect(() => {
    fetchCategories();
  }, [])

  console.log(categories);

  async function fetchCategories() {
    // fetch('/api/categories').then(res => res.json()).then(data => setCategories(data));
    const res = await axios.get('/api/categories');
    setCategories(res.data);
  }



  return (
    <>
      <h1>Categories</h1>
      <NewCategoryForm categories={categories}/>
      <section>
        <div className='p-0 bottomline'>
          <h3>Category Name</h3>
        </div>
        <div className='flex flex-col gap-1 mt-2'>
          {categories.map(item => (
            <div key={item._id} className='rounded-lg bg-slate-200 px-2 inline-flex justify-between h-10 items-center'>
              <p>{item.name}</p>
            </div>
          ))
          }
        </div>
      </section>
    </>
  )
}