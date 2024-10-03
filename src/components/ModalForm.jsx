// src/components/ModalForm.js
import React from 'react';

function ModalForm({ formData, handleChange, handleSubmit, closeModalForm }) {
    return (
        <div className="modal">
            <div className="modal-content">
                <h3>Crear Nueva Reserva</h3>
                <form className="reservas-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre Completo:</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="dni">DNI:</label>
                        <input
                            type="text"
                            id="dni"
                            name="dni"
                            value={formData.dni}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="celular">Celular:</label>
                        <input
                            type="text"
                            id="celular"
                            name="celular"
                            value={formData.celular}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="fecha">Fecha de la Reserva:</label>
                        <input
                            type="date"
                            id="fecha"
                            name="fecha"
                            value={formData.fecha}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="turno">Turno:</label>
                        <select id="turno" name="turno" value={formData.turno} onChange={handleChange}>
                            <option value="tarde">Tarde</option>
                            <option value="noche">Noche</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="capacidad">Capacidad:</label>
                        <input
                            type="number"
                            id="capacidad"
                            name="capacidad"
                            value={formData.capacidad}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit">Confirmar Reserva</button>
                    <button type="button" onClick={closeModalForm}>Cancelar</button>
                </form>
            </div>
        </div>
    );
}

export default ModalForm;
