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
    <div className='page-container mt-4'>
      <div className='mt-4 flex gap-3 '>
        <input type='text' onChange={(e) => handleSearch(e.target.value)}/>
        <SortDropdown products={products} returnSorted={handleSort}/>
      </div>
      <div className='flex bottomline gap-2 mt-4'>
        <p className='grow-[60]'>Product Name</p>
        <p className='grow-[30]'>Price</p>
      </div>
      <div className='flex flex-col gap-1 mt-2'>
        {displayedProducts.map(product => (
          <ProductItem key={product._id} product={product} />
        ))}
      </div>
    </div>
  )
}