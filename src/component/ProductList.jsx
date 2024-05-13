// src/components/ProductList.js
import React from 'react';

const products = [
  { id: 1, name: 'Product 1', price: 10 },
  { id: 2, name: 'Product 2', price: 20 },
  // ... más productos
];

export const ProductList = ({ onAddToCart }) => (
  <div>
    {products.map((product) => (
      <div key={product.id}>
        <h3>{product.name}</h3>
        <p>${product.price}</p>
        <button onClick={() => onAddToCart(product)}>Agregar al carrito</button>
      </div>
    ))}
  </div>
);

