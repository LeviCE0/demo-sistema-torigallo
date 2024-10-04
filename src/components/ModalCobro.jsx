import React, { useState } from 'react';
import '../styles/ModalCobro.css'; // Asegúrate de importar el CSS

const ModalCobro = ({ onClose, onCobrar }) => {
    const [tipoComprobante, setTipoComprobante] = useState('Boleta');
    const [fecha] = useState(new Date().toISOString().split('T')[0]); // Fecha actual
    const [tipoPago, setTipoPago] = useState('Efectivo');
    const [monto, setMonto] = useState('');
    const [tipoDocumento, setTipoDocumento] = useState('DNI');
    const [numeroDocumento, setNumeroDocumento] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Crear un objeto con la información del cobro
        const cobroData = {
            tipoComprobante,
            fecha,
            tipoPago,
            monto: parseFloat(monto), // Asegúrate de que sea un número
            tipoDocumento,
            numeroDocumento,
        };

        onCobrar(cobroData);
        onClose();
    };

    return (
        <div className="modal-overlay"> {/* Contenedor que cubre toda la pantalla */}
            <div className="modal-cobro">
                <h2>Cobrar</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Tipo de Comprobante:
                        <select value={tipoComprobante} onChange={(e) => setTipoComprobante(e.target.value)}>
                            <option value="Boleta">Boleta</option>
                            <option value="Factura">Factura</option>
                        </select>
                    </label>

                    <label>
                        Fecha:
                        <input type="date" value={fecha} readOnly />
                    </label>

                    <label>
                        Tipo de Pago:
                        <select value={tipoPago} onChange={(e) => setTipoPago(e.target.value)}>
                            <option value="Efectivo">Efectivo</option>
                            <option value="Yape">Yape</option>
                            <option value="Plin">Plin</option>
                        </select>
                    </label>

                    <label>
                        Monto:
                        <input type="number" value={monto} onChange={(e) => setMonto(e.target.value)} required />
                    </label>

                    <label>
                        Tipo de Documento:
                        <select value={tipoDocumento} onChange={(e) => setTipoDocumento(e.target.value)}>
                            <option value="DNI">DNI</option>
                            <option value="RUC">RUC</option>
                        </select>
                    </label>

                    <label>
                        Número de Documento:
                        <input
                            type="text"
                            value={numeroDocumento}
                            onChange={(e) => setNumeroDocumento(e.target.value)}
                            maxLength={tipoDocumento === 'DNI' ? 8 : 11}
                            pattern="[0-9]*"
                            required
                        />
                    </label>

                    <button type="submit">PAGAR</button>
                    <button type="button" onClick={onClose}>Cerrar</button>
                </form>
            </div>
        </div>
    );
};

export default ModalCobro;
