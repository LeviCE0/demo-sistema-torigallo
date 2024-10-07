import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import '../styles/Pedidos.css';

function Pedido() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState('');
  const [cantidad, setCantidad] = useState(1);
  const [tablaProductos, setTablaProductos] = useState([]);
  const [mensajeModal, setMensajeModal] = useState('');
  const [mostrarModal, setMostrarModal] = useState(false);

  const [categorias, setCategorias] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [subcategoriaSeleccionada, setSubcategoriaSeleccionada] = useState('');

  useEffect(() => {
    fetch('https://santamariahoteles.com/torigallo/backend/get_productos.php')
      .then((response) => response.json())
      .then((data) => {
        setProductos(data);
        const categoriasUnicas = [...new Set(data.map(producto => producto.categoria))];
        setCategorias(categoriasUnicas);
      })
      .catch((error) => console.error('Error al cargar los productos:', error));

    const pedidoGuardado = localStorage.getItem(`pedido_mesa_${id}`);
    if (pedidoGuardado) {
      setTablaProductos(JSON.parse(pedidoGuardado));
    }
  }, [id]);

  const manejarCategoriaChange = (e) => {
    const categoria = e.target.value;
    setCategoriaSeleccionada(categoria);
    setSubcategoriaSeleccionada('');
    setProductoSeleccionado('');

    const subcategoriasUnicas = [
      ...new Set(
        productos
          .filter(producto => producto.categoria === categoria)
          .map(producto => producto.sub_categoria)
          .filter(subCategoria => subCategoria)
      )
    ];
    setSubcategorias(subcategoriasUnicas);
  };

  const manejarSubcategoriaChange = (e) => {
    const subcategoria = e.target.value;
    setSubcategoriaSeleccionada(subcategoria);
    setProductoSeleccionado('');
  };

  const manejarProductoChange = (e) => {
    const nombreProducto = e.target.value;
    setProductoSeleccionado(nombreProducto);
  };

  const agregarProducto = () => {
    if (productoSeleccionado) {
      const producto = productos.find(p => p.nombre === productoSeleccionado);
      const precio = parseFloat(producto.precio) || 0;

      const productoEnTabla = tablaProductos.find(p => p.nombre === productoSeleccionado);
      const cantidadActual = productoEnTabla ? productoEnTabla.cantidad : 0;

      const nuevaCantidad = Math.min(10 - cantidadActual, cantidad);
      if (nuevaCantidad <= 0) {
        setMensajeModal('No puedes agregar más de 10 unidades en total.');
        setMostrarModal(true);
        return;
      }

      let nuevaTablaProductos;
      if (productoEnTabla) {
        nuevaTablaProductos = tablaProductos.map(p =>
          p.nombre === productoSeleccionado
            ? { ...p, cantidad: p.cantidad + cantidad }
            : p
        );
      } else {
        nuevaTablaProductos = [...tablaProductos, {
          nombre: producto.nombre,
          cantidad,
          precio
        }];
      }

      setTablaProductos(nuevaTablaProductos);
      localStorage.setItem(`pedido_mesa_${id}`, JSON.stringify(nuevaTablaProductos));

      setProductoSeleccionado('');
      setCantidad(1);
    }
  };

  const eliminarProducto = (nombreProducto) => {
    const nuevaTablaProductos = tablaProductos.filter(producto => producto.nombre !== nombreProducto);
    setTablaProductos(nuevaTablaProductos);
    localStorage.setItem(`pedido_mesa_${id}`, JSON.stringify(nuevaTablaProductos));
  };

  const manejarCerrar = () => {
    navigate('/gestionMesas');
  };

  const guardarPedido = () => {
    if (tablaProductos.length === 0) {
      alert('No hay productos en el pedido.');
      return;
    }

    const productosConId = tablaProductos.map(producto => {
      const productoData = productos.find(p => p.nombre === producto.nombre);
      return {
        id: productoData.id,
        cantidad: producto.cantidad,
        precio: producto.precio
      };
    });

    const pedido = {
      idMesa: id,
      productos: productosConId,
      total: tablaProductos.reduce((total, producto) => total + producto.cantidad * producto.precio, 0),
    };

    setMensajeModal('Guardando el pedido, por favor espere...');
    setMostrarModal(true);

    fetch('https://santamariahoteles.com/torigallo/backend/guardar_pedido.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pedido),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error en la respuesta del servidor: ' + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setMostrarModal(false);
        if (data.success) {
          return fetch(`https://santamariahoteles.com/torigallo/backend/update_mesa_estado.php`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, estado: 'Atendido' }),
          });
        } else {
          console.error('Error al guardar el pedido:', data.message);
          throw new Error(data.message);
        }
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al cambiar el estado de la mesa: ' + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          alert('Pedido guardado y mesa marcada como atendida correctamente.');
          navigate('/gestionMesas');
        } else {
          throw new Error(data.message || 'Error al cambiar el estado de la mesa.');
        }
      })
      .catch((error) => {
        setMostrarModal(false);
        console.error('Error de red o de procesamiento:', error.message);
        alert('Hubo un problema: ' + error.message);
      });
  };

  const productosFiltrados = productos.filter(producto =>
    producto.categoria === categoriaSeleccionada &&
    (producto.sub_categoria === subcategoriaSeleccionada || subcategoriaSeleccionada === '')
  );

  const productoEnTabla = tablaProductos.find(p => p.nombre === productoSeleccionado);
  const cantidadActual = productoEnTabla ? productoEnTabla.cantidad : 0;
  const maxCantidad = Math.max(0, 10 - cantidadActual);

  return (
    <div className='pedidos-container'>
      <h2>Pedido para la Mesa {id}</h2>

      <div className='productos-container'>
        <select
          value={categoriaSeleccionada}
          onChange={manejarCategoriaChange}
        >
          <option value="">Selecciona una categoría</option>
          {categorias.map((categoria, index) => (
            <option key={index} value={categoria}>{categoria}</option>
          ))}
        </select>

        {categoriaSeleccionada !== 'Platos a la Carta' && (
          <select
            value={subcategoriaSeleccionada}
            onChange={manejarSubcategoriaChange}
            disabled={!categoriaSeleccionada}
          >
            <option value="">Selecciona una subcategoría</option>
            {subcategorias.map((subcategoria, index) => (
              <option key={index} value={subcategoria}>{subcategoria}</option>
            ))}
          </select>
        )}

        <select
          value={productoSeleccionado}
          onChange={manejarProductoChange}
          disabled={categoriaSeleccionada === '' || (categoriaSeleccionada !== 'Platos a la Carta' && subcategoriaSeleccionada === '')}
        >
          <option value="">Selecciona un producto</option>
          {productosFiltrados.map((producto, index) => (
            <option key={index} value={producto.nombre}>{producto.nombre}</option>
          ))}
        </select>
      </div>
      <div className='productos-container'>
        <input
          type="number"
          value={cantidad}
          min="1"
          max={maxCantidad}
          onChange={(e) => setCantidad(Math.min(maxCantidad, Math.max(1, Number(e.target.value))))}
        />

        <button onClick={agregarProducto}>Agregar Producto</button>
      </div>

      <table className="tabla-productos">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio por Unidad</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tablaProductos.map((producto, index) => (
            <tr key={index}>
              <td>{producto.nombre}</td>
              <td>{producto.cantidad}</td>
              <td>S/ {producto.precio.toFixed(2)}</td>
              <td>S/ {(producto.cantidad * producto.precio).toFixed(2)}</td>
              <td>
                <button onClick={() => eliminarProducto(producto.nombre)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className='buttons-container'>
        <button style={{ backgroundColor: 'red', color: 'white' }} onClick={manejarCerrar}>
          Cerrar
        </button>
        <button onClick={guardarPedido} disabled={tablaProductos.length === 0}>Guardar Pedido</button>
      </div>

      {mostrarModal && (
        <Modal message={mensajeModal} onClose={() => setMostrarModal(false)} />
      )}
    </div>
  );
}

export default Pedido;
