import React from 'react';
import RecipeReviewCard from '@/components/clients/card';

// Define server-side data fetching using React Server Components
export async function unstable_getServerData() {
  try {
    const res = await fetch('http://localhost:3000/api/getallproducts',{ cache: 'no-store' });
    return await res.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return false;
  }
}

// Define your Products component
async function Products() {
  const allProducts = await unstable_getServerData();
  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {allProducts?.map((product, index) => (
          <div key={product._id} style={{ width: '20%', padding: '10px'}}>
            <RecipeReviewCard product={product} />
          </div>
        ))}
      </div>
    </>
  );
}



export default Products;
