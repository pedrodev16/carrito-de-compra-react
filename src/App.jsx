import React, { useState, useEffect } from 'react';
import { Homepage } from './pages/Homepage';
import { Contactpage } from './pages/Contactpage';
import { Carritopage } from './pages/Carritopage';
import { Route, Routes } from 'react-router-dom';

// AUTOR: PEDRO OROPEZA
// GITHOB: https://github.com/pedrodev16

// Componente de producto individual
const Producto = ({ producto, agregarAlCarrito }) => {
  return (
    <div className='cart'>
      <h3>{producto.nombre}</h3>
      <p>${producto.precio}</p>
      <button onClick={() => agregarAlCarrito(producto)}>Agregar al Carrito</button>
    </div>
  );
};

// Componente del carrito
const Carrito = ({ carrito, eliminarDelCarrito, disminuirCantidad, aumentarCantidad }) => {


  const precioTotal = carrito.reduce((total, producto) => {
    return total + producto.precio * producto.cantidad;
  }, 0);

  return (
    <div>
      <h2>Carrito de Compras</h2>
      {carrito.map((producto, index) => (
        <div key={index} className='cart'>
          <h4>{producto.nombre}</h4>
          <p>${producto.precio} x {producto.cantidad}</p>
          <button onClick={() => disminuirCantidad(producto.id)}>-</button>
          <button onClick={() => aumentarCantidad(producto.id)}>+</button>
          <button onClick={() => eliminarDelCarrito(producto.id)}>x</button>
        </div>
      ))}

<h3>Total: ${precioTotal}</h3>

    </div>
  );
};


// Componente principal de la aplicación
const App = () => {
  const [productos] = useState([
    { id: 1, nombre: 'Producto 1', precio: 1 },
    { id: 2, nombre: 'Producto 2', precio: 2 },
    { id: 3, nombre: 'Producto 3', precio: 1.3 },
    { id: 4, nombre: 'Producto 4', precio: 2 },
    { id: 5, nombre: 'Producto 5', precio: 3 },
    { id: 6, nombre: 'Producto 6', precio: 5 },
    // ... otros productos
  ]);

  const [carrito, setCarrito] = useState([]);

  // Agregar producto al carrito o incrementar su cantidad
  const agregarAlCarrito = (producto) => {
    const existe = carrito.find((item) => item.id === producto.id);
    if (existe) {
      // Incrementar cantidad
      setCarrito(
        carrito.map((item) =>
          item.id === producto.id ? { ...existe, cantidad: existe.cantidad + 1 } : item
        )
      );
    } else {
      // Agregar nuevo producto
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  // Disminuir la cantidad de un producto en el carrito
  const disminuirCantidad = (id) => {
    const existe = carrito.find((item) => item.id === id);
    if (existe.cantidad === 1) {
      eliminarDelCarrito(id);
    } else {
      setCarrito(
        carrito.map((item) =>
          item.id === id ? { ...existe, cantidad: existe.cantidad - 1 } : item
        )
      );
    }
  };

// Aumentar la cantidad de un producto en el carrito
const aumentarCantidad = (id) => {
  setCarrito(
    carrito.map((item) =>
      item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
    )
  );
};



  // Eliminar producto del carrito
  const eliminarDelCarrito = (id) => {
    setCarrito(carrito.filter((item) => item.id !== id));
  };

  // Guardar y cargar el carrito de Local Storage
  useEffect(() => {
    const carritoAlmacenado = localStorage.getItem('carrito');
    if (carritoAlmacenado) {
      setCarrito(JSON.parse(carritoAlmacenado));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  return (
    <div>
      <Routes>
        <Route path='/' element={ <Homepage></Homepage>}></Route>
        <Route path='/contacto' element={ <Contactpage></Contactpage>}></Route>
        <Route path='/carrito' element={ <Carritopage></Carritopage>}></Route>
     
      </Routes>
      <nav>
    <ul> <li><a href="/">home</a></li>
     <li><a href="/carrito">carrito</a></li>
     <li><a href="/contacto">contactos</a></li>

      </ul>
     
      </nav>
      <h1>Tienda en línea</h1>
      <div className='row'>
        {productos.map((producto) => (
          <Producto key={producto.id} producto={producto} agregarAlCarrito={agregarAlCarrito} />
        ))}
      </div>
      <Carrito carrito={carrito} eliminarDelCarrito={eliminarDelCarrito}  aumentarCantidad={aumentarCantidad} disminuirCantidad={disminuirCantidad} />
    </div>
  );
};

export default App;
