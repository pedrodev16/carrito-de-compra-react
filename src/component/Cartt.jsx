// src/components/Cart.js
import React from 'react';

export const Cartt = ({ cart, onRemoveFromCart }) => (
  <div>
    <h3>Carrito de compras</h3>
    {cart.length === 0 ? (
      <p>Tu carrito está vacío.</p>
    ) : (
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price}
            <button onClick={() => onRemoveFromCart(item.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    )}
  </div>
);

