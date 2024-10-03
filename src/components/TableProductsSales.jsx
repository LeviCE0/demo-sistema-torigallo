import React from 'react';
import '../styles/TableProductsSales.css';

function TableProductsSales({ products }) {
  return (
    <table className="table-products-sales">
      <thead>
        <tr>
          <th>Producto</th>
          <th>Ventas</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product, index) => (
          <tr key={index}>
            <td>{product.name}</td>
            <td>{product.sales}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableProductsSales;
