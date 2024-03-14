export async function getServerSideProps() {
  try {
    const res = await fetch('http://localhost:3000/api/getallproducts');
    if (res.status === 200) {
      const allProducts = await res.json();
      return allProducts;
    } else {
      console.error('Error fetching products:', res.statusText);
      return {
        props: {
          allProducts: []
        }
      };
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    return {
      props: {
        allProducts: []
      }
    };
  }
}
