'use client'

import React, { useEffect, useState } from 'react';
import NewCategoryForm from '@/components/NewCategoryForm';
import axios from 'axios';
import CategoriesListItem from '@/components/CategoriesListItem';


export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    const res = await axios.get('/api/categories');
    setCategories(res.data);
  }

  function onEditAnItem(cat: Category) {
    console.log(cat);
    const updatedCategories: Category[] = categories.map(item => item._id === cat._id ? cat : item);
    setCategories(updatedCategories);
  }

  async function onCreateNew(name: string, parentId: string | null) {
    try {
      const res = await axios.post('/api/categories', { name, parent: parentId, children: [] });
      const newcats: Category[] = [...categories];
      newcats.push(res.data);
      
      if(parentId){
        await axios.patch(`/api/categories/${parentId}`, { _id: res.data._id });
        newcats.find(i => i._id === parentId)?.children.push(res.data._id);
      }
      
      console.log(newcats);
      setCategories(newcats);

    } catch (error) {
      console.error(error.message);
      alert(`Error! Please try again!`)
    }
  }

  // function onEditAnItem(cat: CategoryWithChildren) {
  //   console.log(cat);
  //   const updatedCategories: CategoryWithChildren[] = categories.map(item => item._id === cat._id ? cat : item);
  //   setCategories(updatedCategories);
  // }

  console.log(categories);

  return (
    <>
      <h1>Categories</h1>
      <NewCategoryForm categories={categories} onSave={onCreateNew} />
      <section>
        <div className='p-0 bottomline flex'>
          <h3 className='w-96'>Category Name</h3>
          <h3>Parent Category</h3>
        </div>
        <div className='flex flex-col gap-1 mt-2'>
          {categories.map(item => (
            <CategoriesListItem key={item._id} item={item} categories={categories} onEdit={onEditAnItem} onDelete={fetchCategories} />
          ))
          }
        </div>
      </section>
    </>
  )
}