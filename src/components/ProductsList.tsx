'use client'

import { useState, useEffect, useMemo, useCallback } from 'react';
import ProductItem from './ProductItem';
import SortDropdown from './SortDropdown';


export default function ProductsList() {
  const [products, setProducts] = useState<ProductDoc[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<ProductDoc[]>([]);

  console.log(products);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setDisplayedProducts(data);
      })
      .catch(() => {
        console.log('couldnt get products');
        return <h1>Couldnt Fetch Products</h1>
      })
  }, [])

  const handleSearch = useCallback((search: string) => {
    setDisplayedProducts(products.filter(item => item.title.includes(search)));
  }, [products]);

  const handleSort = useCallback((sortedProducts: ProductDoc[]) => {
    setDisplayedProducts(sortedProducts)
  }, []);

// change select outline color, add defaultValue={sortOptions[0]} (which should be last added)
  return (
    <>
      <div className='mt-4 flex gap-3'>
        <input type='text' onChange={(e) => handleSearch(e.target.value)}/>
        <SortDropdown products={products} returnSorted={handleSort}/>
      </div>
      <div className='flex border-b-2 border-cyan-900 border-opacity-25 gap-2 mt-4'>
        <p className='w-[675px]'>Product Name</p>
        <p className='w-32'>Price</p>
      </div>
      <div className='flex flex-col gap-1 mt-2'>
        {displayedProducts.map(product => (
          <ProductItem key={product._id} product={product} />
        ))}
      </div>
    </>
  )

  return (
    <>
      <table className='basic mt-2'>
        <thead>
          <tr>
            <td>Product name</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <ProductItem key={product._id} product={product} />
          ))}
        </tbody>
      </table>
    </>
  )
}