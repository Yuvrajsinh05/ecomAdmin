import React, { Suspense } from 'react';
import RecipeReviewCard from '@/app/products/ui/card';
import RecipeReviewCardSkeleton from './ui/skeletonCard';
import { unstable_noStore as noStore } from 'next/cache';


export async function unstable_getServerData() {
  try {
    noStore();
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const res = await fetch('http://localhost:3000/api/getallproducts', { cache: 'no-store' });
    return await res.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return false;
  }
}


async function Products() {
  const allProducts = await unstable_getServerData();
  let skeleton = Array.from({ length: 15 }).fill(15).map((_, index) => {
    return <RecipeReviewCardSkeleton key={index} />;
  });
  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Suspense fallback={<>{skeleton}</>}>
          {allProducts?.map((product, index) => (
            <div key={product._id} style={{ width: '20%', padding: '10px' }}>
              <RecipeReviewCard product={product} />
            </div>
          ))}
        </Suspense>

      </div>
    </>
  );
}



export default Products;
