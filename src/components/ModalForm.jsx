import React from 'react';
import '../styles/ModalForm.css';

function ModalForm({ formData, handleChange, handleSubmit, closeModalForm }) {
 
    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        handleChange(e);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        handleSubmit(e);
    };

    const handleKeyPress = (e) => {
        const { name, value } = e.target;
        
        if (name === 'nombre') {
            const validChars = /^[A-Za-z\s]*$/;
            if (!validChars.test(e.key)) {
                e.preventDefault();
            }
        }
        
        if (name === 'dni') {
            const validChars = /^[0-9]*$/;
            if (!validChars.test(e.key) || value.length >= 8) {
                e.preventDefault();
            }
        }
        
        if (name === 'celular') {
            const validChars = /^[0-9]*$/;
            if (!validChars.test(e.key) || value.length >= 9) {
                e.preventDefault();
            }
        }
    };    

    return (
        <div className="modalForm">
            <div className="modalForm-content">
                <h3>Crear Nueva Reserva</h3>
                <form className="reservas-form" onSubmit={handleFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre Completo:</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleFieldChange}
                            onKeyPress={handleKeyPress} // Maneja la entrada
                            required
                            pattern="[A-Za-z\s]+"
                            title="Solo se permiten letras y espacios."
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="dni">DNI:</label>
                        <input
                            type="text"
                            id="dni"
                            name="dni"
                            value={formData.dni}
                            onChange={handleFieldChange}
                            onKeyPress={handleKeyPress} // Maneja la entrada
                            required
                            pattern="\d{1,8}" // Solo dígitos, máximo 8
                            title="Solo se permiten hasta 8 dígitos."
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleFieldChange}
                            required
                            pattern="^[a-zA-Z0-9._%+-]+@(gmail.com|hotmail.com|outlook.com)$"
                            title="Por favor, ingrese un correo electrónico válido (gmail.com, hotmail.com, outlook.com)."
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="celular">Celular:</label>
                        <input
                            type="text"
                            id="celular"
                            name="celular"
                            value={formData.celular}
                            onChange={handleFieldChange}
                            onKeyPress={handleKeyPress} // Maneja la entrada
                            required
                            pattern="\d{1,9}" // Solo dígitos, máximo 9
                            title="Solo se permiten hasta 9 dígitos."
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
                            onChange={handleFieldChange}
                            required
                            min="1" // Mínimo 1 persona
                            max="15" // Máximo 15 personas
                        />
                    </div>

                    <div className='button-container'>
                        <button className="button-modalForm-confirm" type="submit">Confirmar Reserva</button>
                        <button className="button-modalForm-cancel" type="button" onClick={closeModalForm}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModalForm;
