import React, { useState } from 'react';
import '../styles/CustomSelect.css';

const months = [
  { id: 1, name: 'Enero' },
  { id: 2, name: 'Febrero' },
  { id: 3, name: 'Marzo' },
  { id: 4, name: 'Abril' },
  { id: 5, name: 'Mayo' },
  { id: 6, name: 'Junio' },
  { id: 7, name: 'Julio' },
  { id: 8, name: 'Agosto' },
  { id: 9, name: 'Septiembre' },
  { id: 10, name: 'Octubre' },
  { id: 11, name: 'Noviembre' },
  { id: 12, name: 'Diciembre' },
];

const CustomSelect = ({ selectedMonth, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState(selectedMonth);

  const handleOptionClick = (month) => {
    setCurrentValue(month.id);
    onChange(month.id);
    setIsOpen(false);
  };

  return (
    <div className={`custom-select ${isOpen ? 'active' : ''}`}>
      <button
        className="select-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls="select-dropdown"
      >
        <span className="selected-value">{months.find(m => m.id === currentValue)?.name}</span>
        <span className="arrow"></span>
      </button>
      {isOpen && (
        <ul className="select-dropdown" role="listbox" id="select-dropdown">
          {months.map((month) => (
            <li key={month.id} role="option" onClick={() => handleOptionClick(month)}>
              <label>{month.name}</label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
