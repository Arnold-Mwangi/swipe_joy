import React from 'react'
import AddToCart from './AddToCart'
import {Product} from '../page'

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => (
  <div>
    <h6>{product.title}</h6>
      <img src={product.thumbnailUrl} alt={`Product ${product.id}`} />
  </div>
);

export default ProductCard;

