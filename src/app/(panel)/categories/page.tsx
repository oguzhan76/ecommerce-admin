'use client'

import React, { FormEvent, useEffect, useState } from 'react'

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('/api/categories').then(res => res.json()).then(data => setCategories(data));
  }, [])

  function saveNewCategory(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <>
      <h1>Categories</h1>
      <div>
        <label>New category name</label>
        <form onSubmit={saveNewCategory} className='flex gap-1 mb-4'>
          <input type='text' className='pl-1 w-72' autoFocus/>
          <button type='submit' className='btn-primary'>Save</button>
        </form>
      </div>
      <section>
        <div className='p-0 border-solid border-b-2 border-slate-400'>
          <h3>Category Name</h3>
        </div>
        <div>
          {categories.map(item => {
            return <p key={item}>{item}</p>
          })}
        </div>
      </section>
    </>
  )
}