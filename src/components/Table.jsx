import React from 'react';

const Table = ({ columns, data }) => {
    return (
        <table className="table-main">
            <thead>
                <tr>
                    {columns.map((column, index) => (
                        <th key={index}>{column}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.length > 0 ? (
                    data.map((item, index) => (
                        <tr key={index}>
                            {columns.map((column, colIndex) => (
                                <td key={colIndex}>{item[column]}</td>
                            ))}
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={columns.length}>No hay datos disponibles.</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default Table;
