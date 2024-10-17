import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import '../styles/Pedidos.css';

function Pedido() {
  const { id } = useParams();
  const navigate = useNavigate();

  const productosData = [
    { "id": 1, "nombre": "Dieta de Pollo", "precio": "20.00", "categoria": "Platos a la Carta", "sub_categoria": null },
    { "id": 2, "nombre": "Sopa a la Minuta", "precio": "20.00", "categoria": "Platos a la Carta", "sub_categoria": null },
    { "id": 3, "nombre": "Trucha Frita", "precio": "20.00", "categoria": "Platos a la Carta", "sub_categoria": null },
    { "id": 4, "nombre": "Chicharron de Pollo", "precio": "20.00", "categoria": "Platos a la Carta", "sub_categoria": null },
    { "id": 5, "nombre": "Lomo Saltado", "precio": "40.00", "categoria": "Platos a la Carta", "sub_categoria": null },
    { "id": 6, "nombre": "Alitas a la BBQ", "precio": "22.00", "categoria": "Platos a la Carta", "sub_categoria": null },
    { "id": 7, "nombre": "Alitas a la Maracuya", "precio": "22.00", "categoria": "Platos a la Carta", "sub_categoria": null },
    { "id": 8, "nombre": "Alitas Acevichadas", "precio": "22.00", "categoria": "Platos a la Carta", "sub_categoria": null },
    { "id": 9, "nombre": "1/4 Cuy Frito o Guisado", "precio": "27.00", "categoria": "Platos a la Carta", "sub_categoria": null },
    { "id": 10, "nombre": "1/2 Cuy Frito o Guisado", "precio": "50.00", "categoria": "Platos a la Carta", "sub_categoria": null },
    { "id": 11, "nombre": "Chicharron de Cerdo", "precio": "20.00", "categoria": "Platos a la Carta", "sub_categoria": null },
    { "id": 12, "nombre": "Milanesa de Pollo", "precio": "20.00", "categoria": "Platos a la Carta", "sub_categoria": null },
    { "id": 13, "nombre": "Fetuccini a la Huancaina/Pesto", "precio": "24.00", "categoria": "Platos a la Carta", "sub_categoria": null },
    { "id": 14, "nombre": "Fetuccini al Alfredo", "precio": "26.00", "categoria": "Platos a la Carta", "sub_categoria": null },
    { "id": 15, "nombre": "Ceviche de Trucha", "precio": "20.00", "categoria": "Platos a la Carta", "sub_categoria": null },
    { "id": 16, "nombre": "Ceviche de Champiñones", "precio": "20.00", "categoria": "Platos a la Carta", "sub_categoria": null },
    { "id": 17, "nombre": "Sudado de Pescado", "precio": "25.00", "categoria": "Platos a la Carta", "sub_categoria": null },
    { "id": 18, "nombre": "Arroz con Mariscos", "precio": "22.00", "categoria": "Platos a la Carta", "sub_categoria": null },
    { "id": 19, "nombre": "Vegetales", "precio": "22.00", "categoria": "Carnes & Parrillas", "sub_categoria": "Entradas de la Casa" },
    { "id": 20, "nombre": "Ceviche de Trucha", "precio": "22.00", "categoria": "Carnes & Parrillas", "sub_categoria": "Entradas de la Casa" },
    { "id": 21, "nombre": "Champiñones en Salsa de la Casa", "precio": "24.00", "categoria": "Carnes & Parrillas", "sub_categoria": "Entradas de la Casa" },
    { "id": 22, "nombre": "Chorizos", "precio": "24.00", "categoria": "Carnes & Parrillas", "sub_categoria": "Entradas de la Casa" },
    { "id": 23, "nombre": "Ceviche de Champiñones", "precio": "22.00", "categoria": "Carnes & Parrillas", "sub_categoria": "Entradas de la Casa" },
    { "id": 24, "nombre": "Anticuchos", "precio": "22.00", "categoria": "Carnes & Parrillas", "sub_categoria": "Entradas de la Casa" },
    { "id": 25, "nombre": "Lomo Saltado 220gr", "precio": "40.00", "categoria": "Carnes & Parrillas", "sub_categoria": "Criollazos de la Casa" },
    { "id": 26, "nombre": "Tacu Tacu con Pollo o Chuleta", "precio": "26.00", "categoria": "Carnes & Parrillas", "sub_categoria": "Criollazos de la Casa" },
    { "id": 27, "nombre": "Tacu Tacu con Churrasco 300gr", "precio": "28.00", "categoria": "Carnes & Parrillas", "sub_categoria": "Criollazos de la Casa" },
    { "id": 28, "nombre": "Tacu Tacu con Lomo Saltado", "precio": "40.00", "categoria": "Carnes & Parrillas", "sub_categoria": "Criollazos de la Casa" },
    { "id": 29, "nombre": "Fetuccini a la Huancaina (Pollo o Chuleta)", "precio": "24.00", "categoria": "Carnes & Parrillas", "sub_categoria": "Criollazos de la Casa" },
    { "id": 30, "nombre": "Fetuccini a lo Alfredo", "precio": "26.00", "categoria": "Carnes & Parrillas", "sub_categoria": "Criollazos de la Casa" },
    { "id": 31, "nombre": "Fetuccini al Pesto (Pollo o Chuleta)", "precio": "24.00", "categoria": "Carnes & Parrillas", "sub_categoria": "Criollazos de la Casa" },
    { "id": 32, "nombre": "Chicharron de Pollo", "precio": "20.00", "categoria": "Carnes & Parrillas", "sub_categoria": "Criollazos de la Casa" },
    { "id": 33, "nombre": "Chicharron de Cerdo", "precio": "22.00", "categoria": "Carnes & Parrillas", "sub_categoria": "Criollazos de la Casa" },
    { "id": 34, "nombre": "Trucha Frita", "precio": "22.00", "categoria": "Carnes & Parrillas", "sub_categoria": "Criollazos de la Casa" },
    { "id": 35, "nombre": "Milanesa de Pollo", "precio": "24.00", "categoria": "Carnes & Parrillas", "sub_categoria": "Criollazos de la Casa" },
    { "id": 36, "nombre": "Cordon Blue de Pollo", "precio": "30.00", "categoria": "Carnes & Parrillas", "sub_categoria": "Criollazos de la Casa" },
    { "id": 37, "nombre": "Cordon Blue de Lomo Fino", "precio": "40.00", "categoria": "Carnes & Parrillas", "sub_categoria": "Criollazos de la Casa" },
    { "id": 38, "nombre": "Duo Parrillero", "precio": "90.00", "categoria": "Carnes & Parrillas", "sub_categoria": "Parrillas para Compartir" },
    { "id": 39, "nombre": "Parrilla para 3 Personas", "precio": "135.00", "categoria": "Carnes & Parrillas", "sub_categoria": "Parrillas para Compartir" },
    { "id": 40, "nombre": "Parrilla para 4 Personas", "precio": "150.00", "categoria": "Carnes & Parrillas", "sub_categoria": "Parrillas para Compartir" },
    { "id": 41, "nombre": "Parrilla Familiar", "precio": "205.00", "categoria": "Carnes & Parrillas", "sub_categoria": "Parrillas para Compartir" },
    { "id": 42, "nombre": "Alitas Acevichadas", "precio": "25.00", "categoria": "Carnes & Parrillas", "sub_categoria": "Festival de Alitas" },
    { "id": 43, "nombre": "Alitas al Maracuya", "precio": "25.00", "categoria": "Carnes & Parrillas", "sub_categoria": "Festival de Alitas" },
    { "id": 44, "nombre": "Alitas a la BBQ", "precio": "25.00", "categoria": "Carnes & Parrillas", "sub_categoria": "Festival de Alitas" },
    { "id": 45, "nombre": "Tira de Res 500gr", "precio": "45.00", "categoria": "Carnes & Parrillas", "sub_categoria": "Res a la Parrilla" },
    { "id": 46, "nombre": "Tira de Res 1kg", "precio": "75.00", "categoria": "Carnes & Parrillas", "sub_categoria": "Res a la Parrilla" },
    { "id": 47, "nombre": "Churrasco 400gr", "precio": "43.00", "categoria": "Carnes & Parrillas", "sub_categoria": "Res a la Parrilla" },
    { "id": 48, "nombre": "Bife Ancho 400gr", "precio": "50.00", "categoria": "Carnes & Parrillas", "sub_categoria": "Res a la Parrilla" },
    { "id": 49, "nombre": "Bife Angosto 400gr", "precio": "50.00", "categoria": "Carnes & Parrillas", "sub_categoria": "Res a la Parrilla" },
    { "id": 50, "nombre": "Picanha 400gr", "precio": "53.00", "categoria": "Carnes & Parrillas", "sub_categoria": "Res a la Parrilla" },
    { "id": 51, "nombre": "Lomo Fino 400gr", "precio": "60.00", "categoria": "Carnes & Parrillas", "sub_categoria": "Res a la Parrilla" },
    { "id": 52, "nombre": "Bife Ancho Angus", "precio": "110.00", "categoria": "Carnes & Parrillas", "sub_categoria": "Cortes de Res Americanos" },
    { "id": 53, "nombre": "Bife Angosto Angus", "precio": "110.00", "categoria": "Carnes & Parrillas", "sub_categoria": "Cortes de Res Americanos" },
    { "id": 54, "nombre": "Picanha Angus", "precio": "120.00", "categoria": "Carnes & Parrillas", "sub_categoria": "Cortes de Res Americanos" },
    { "id": 55, "nombre": "Entraña Angus", "precio": "110.00", "categoria": "Carnes & Parrillas", "sub_categoria": "Cortes de Res Americanos" },
    { "id": 56, "nombre": "Asado de Tira de Cerdo 500gr", "precio": "45.00", "categoria": "Carnes & Parrillas", "sub_categoria": "Cerdo a la Parrilla" },
    { "id": 57, "nombre": "Asado de Tira de Cerdo 1kg", "precio": "75.00", "categoria": "Carnes & Parrillas", "sub_categoria": "Cerdo a la Parrilla" },
    { "id": 58, "nombre": "Chuleta", "precio": "24.00", "categoria": "Carnes & Parrillas", "sub_categoria": "Cerdo a la Parrilla" },
    { "id": 59, "nombre": "Chuleta Doble", "precio": "44.00", "categoria": "Carnes & Parrillas", "sub_categoria": "Cerdo a la Parrilla" },
    { "id": 60, "nombre": "Costilla de Cerdo de 1.2kg", "precio": "90.00", "categoria": "Carnes & Parrillas", "sub_categoria": "Cerdo a la Parrilla" },
    { "id": 61, "nombre": "1/4 de Pollo a la Parrilla", "precio": "24.00", "categoria": "Carnes & Parrillas", "sub_categoria": "Pollo a la Parrilla" },
    { "id": 62, "nombre": "1/2 de Pollo a la Parrilla", "precio": "44.00", "categoria": "Carnes & Parrillas", "sub_categoria": "Pollo a la Parrilla" },
    { "id": 63, "nombre": "Filete de Pollo", "precio": "24.00", "categoria": "Carnes & Parrillas", "sub_categoria": "Pollo a la Parrilla" },
    { "id": 64, "nombre": "Alitas a la Parrilla", "precio": "24.00", "categoria": "Carnes & Parrillas", "sub_categoria": "Pollo a la Parrilla" },
    { "id": 65, "nombre": "Filete de Pollo c/Queso y Tocino", "precio": "27.00", "categoria": "Carnes & Parrillas", "sub_categoria": "Pollo a la Parrilla" },
    { "id": 66, "nombre": "Limonada Cherry o Frozen (Personal)", "precio": "6.00", "categoria": "Bebidas", "sub_categoria": "Limonadas y Frozen" },
    { "id": 67, "nombre": "Limonada Cherry o Frozen (Jarra)", "precio": "18.00", "categoria": "Bebidas", "sub_categoria": "Limonadas y Frozen" },
    { "id": 68, "nombre": "Limonada (Personal)", "precio": "4.00", "categoria": "Bebidas", "sub_categoria": "Limonadas y Frozen" },
    { "id": 69, "nombre": "Limonada (Jarra)", "precio": "15.00", "categoria": "Bebidas", "sub_categoria": "Limonadas y Frozen" },
    { "id": 70, "nombre": "Maracuyá (Personal)", "precio": "4.00", "categoria": "Bebidas", "sub_categoria": "Limonadas y Frozen" },
    { "id": 71, "nombre": "Maracuyá (Jarra)", "precio": "15.00", "categoria": "Bebidas", "sub_categoria": "Limonadas y Frozen" },
    { "id": 72, "nombre": "Chicha Morada (Personal)", "precio": "4.00", "categoria": "Bebidas", "sub_categoria": "Limonadas y Frozen" },
    { "id": 73, "nombre": "Chicha Morada (Jarra)", "precio": "15.00", "categoria": "Bebidas", "sub_categoria": "Limonadas y Frozen" },
    { "id": 74, "nombre": "Pilsen Callao", "precio": "10.00", "categoria": "Bebidas", "sub_categoria": "Cervezas" },
    { "id": 75, "nombre": "Corona", "precio": "10.00", "categoria": "Bebidas", "sub_categoria": "Cervezas" },
    { "id": 76, "nombre": "Cusqueña", "precio": "10.00", "categoria": "Bebidas", "sub_categoria": "Cervezas" },
    { "id": 77, "nombre": "Manzanilla", "precio": "4.00", "categoria": "Bebidas", "sub_categoria": "Infusiones" },
    { "id": 78, "nombre": "Hierba Luisa", "precio": "4.00", "categoria": "Bebidas", "sub_categoria": "Infusiones" },
    { "id": 79, "nombre": "Anís", "precio": "4.00", "categoria": "Bebidas", "sub_categoria": "Infusiones" },
    { "id": 80, "nombre": "Café", "precio": "4.00", "categoria": "Bebidas", "sub_categoria": "Infusiones" },
    { "id": 81, "nombre": "San Luis", "precio": "3.00", "categoria": "Bebidas", "sub_categoria": "Agua" },
    { "id": 82, "nombre": "San Mateo", "precio": "3.00", "categoria": "Bebidas", "sub_categoria": "Agua" },
    { "id": 83, "nombre": "Copa de Vino", "precio": "13.00", "categoria": "Bebidas", "sub_categoria": "Cócteles" },
    { "id": 84, "nombre": "Copa de Sangría", "precio": "15.00", "categoria": "Bebidas", "sub_categoria": "Cócteles" },
    { "id": 85, "nombre": "Jarra de Sangría", "precio": "55.00", "categoria": "Bebidas", "sub_categoria": "Cócteles" },
    { "id": 86, "nombre": "Pisco Sour", "precio": "15.00", "categoria": "Bebidas", "sub_categoria": "Cócteles" },
    { "id": 87, "nombre": "Chilcano", "precio": "15.00", "categoria": "Bebidas", "sub_categoria": "Cócteles" },
    { "id": 88, "nombre": "Mojito Rubio", "precio": "15.00", "categoria": "Bebidas", "sub_categoria": "Cócteles" },
    { "id": 89, "nombre": "Marquez de Riscal Reserva", "precio": "125.00", "categoria": "Vinos", "sub_categoria": "Españoles" },
    { "id": 90, "nombre": "Marquez de Riscal Tempranillo", "precio": "80.00", "categoria": "Vinos", "sub_categoria": "Españoles" },
    { "id": 91, "nombre": "Intipalka Rosé", "precio": "60.00", "categoria": "Vinos", "sub_categoria": "Peruanos" },
    { "id": 92, "nombre": "Intipalka Reserva Syrah", "precio": "70.00", "categoria": "Vinos", "sub_categoria": "Peruanos" },
    { "id": 93, "nombre": "Intipalka Reserva Cabernet Souvignon", "precio": "70.00", "categoria": "Vinos", "sub_categoria": "Peruanos" },
    { "id": 94, "nombre": "Cousiño Macul Antiguas Reservas Cabernet Souvignon", "precio": "95.00", "categoria": "Vinos", "sub_categoria": "Chilenos" },
    { "id": 95, "nombre": "Cousiño Macul Don Matías - Reserva Cabernet Souvignon", "precio": "80.00", "categoria": "Vinos", "sub_categoria": "Chilenos" },
    { "id": 96, "nombre": "Casillero del Diablo Reserva Red Blend", "precio": "65.00", "categoria": "Vinos", "sub_categoria": "Chilenos" },
    { "id": 97, "nombre": "Navarro Correas Colección Privada Merlot", "precio": "70.00", "categoria": "Vinos", "sub_categoria": "Argentinos" },
    { "id": 98, "nombre": "Navarro Correas Colección Privada Malbec", "precio": "70.00", "categoria": "Vinos", "sub_categoria": "Argentinos" },
    { "id": 99, "nombre": "Navarro Correas Los Arboles Cabernet Souvignon", "precio": "60.00", "categoria": "Vinos", "sub_categoria": "Argentinos" },
    { "id": 100, "nombre": "Rutini Cabernet Souvignon", "precio": "175.00", "categoria": "Vinos", "sub_categoria": "Argentinos" },
    { "id": 101, "nombre": "Rutini Malbec", "precio": "175.00", "categoria": "Vinos", "sub_categoria": "Argentinos" }
  ];

  const [productos, setProductos] = useState(productosData);
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
    const categoriasUnicas = [...new Set(productos.map(producto => producto.categoria))];
    setCategorias(categoriasUnicas);

    const pedidoGuardado = localStorage.getItem(`pedido_mesa_${id}`);
    if (pedidoGuardado) {
      setTablaProductos(JSON.parse(pedidoGuardado));
    }
  }, [id, productos]);

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

    const total = tablaProductos.reduce((total, producto) => total + producto.cantidad * producto.precio, 0);
    alert(`Pedido guardado correctamente. Total: S/ ${total.toFixed(2)}`);

    const estadoMesa = { id, status: 'Atendido' };
    localStorage.setItem(`estado_mesa_${id}`, JSON.stringify(estadoMesa));

    localStorage.removeItem(`pedido_mesa_${id}`);
    navigate('/gestionMesas');
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
