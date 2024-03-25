import React, { Suspense } from 'react';
import RecipeReviewCard from '@/components/clients/card';



export async function unstable_getServerData() {
  try {
    const res = await fetch('http://localhost:3000/api/getallproducts',{ cache: 'no-store' });
    return await res.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return false;
  }
}


async function Products() {
  const allProducts = await unstable_getServerData();
  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Suspense fallback={"Initial Loading Wait a While"}>
        {allProducts?.map((product, index) => (
          <div key={product._id} style={{ width: '20%', padding: '10px'}}>
            <RecipeReviewCard product={product} />
          </div>
        ))}
        </Suspense>

      </div>
    </>
  );
}



export default Products;
