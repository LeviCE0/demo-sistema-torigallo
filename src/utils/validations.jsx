
export const validateNombre = (nombre) => {
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(nombre) ? '' : 'El nombre solo debe contener letras y espacios.';
};

export const validateDni = (dni) => {
    const regex = /^\d{8}$/;
    return regex.test(dni) ? '' : 'El DNI debe contener exactamente 8 dígitos numéricos.';
};

export const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com|hotmail\.com)$/;
    return regex.test(email) ? '' : 'El correo debe ser de un dominio válido (gmail.com, outlook.com, hotmail.com).';
};

export const validateCelular = (celular) => {
    const regex = /^\d{9}$/;
    return regex.test(celular) ? '' : 'El número de celular debe contener exactamente 9 dígitos numéricos.';
};

export const validateCapacidad = (capacidad) => {
    const value = parseInt(capacidad, 10);
    return value > 0 && value <= 15 ? '' : 'La capacidad máxima permitida es de 15 personas.';
};
