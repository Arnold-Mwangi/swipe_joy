import React from 'react'
import Image from 'next/image'
import AddToCart from './AddToCart'

interface Product {
  id: number;
  title: string;
  thumbnailUrl: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => (
  <div className="border rounded-lg p-4 shadow-md">
    <h6 className="text-lg font-semibold mb-2">{product.title}</h6>
    <div className="relative w-full h-48 mb-4">
      <Image 
        src={product.thumbnailUrl} 
        alt={`Product ${product.id}`} 
        layout="fill"
        objectFit="cover"
        className="rounded-md"
      />
    </div>
    <AddToCart />
  </div>
);

export default ProductCard;