import React from 'react'
import ProductCard  from './components/ProductCard';

export interface Product {
    id: number;
    title: string;
    albumId: number;
    thumbnailUrl: string;
}


const Products = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/photos');
    const products: Product[] = await res.json();
  return (
    <div>
        <h1>Products</h1>
        {products.slice(0, 10).map((product) => (
            <ProductCard key={product.id} product={product} />
        ))}
    </div>
  );

};

export default Products;

