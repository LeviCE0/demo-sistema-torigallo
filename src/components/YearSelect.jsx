import React, { useState } from 'react';
import '../styles/CustomSelect.css';

const YearSelect = ({ selectedYear, onChange }) => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 2023 }, (v, k) => k + 2024);

    const [isOpen, setIsOpen] = useState(false);
    const [currentValue, setCurrentValue] = useState(selectedYear);

    const handleOptionClick = (year) => {
        setCurrentValue(year);
        onChange(year);
        setIsOpen(false);
    };

    return (
        <div className={`custom-select ${isOpen ? 'active' : ''}`}>
            <button
                className="select-button"
                onClick={() => setIsOpen(!isOpen)}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                aria-controls="year-dropdown"
            >
                <span className="selected-value">{currentValue}</span>
                <span className="arrow"></span>
            </button>
            {isOpen && (
                <ul className="select-dropdown" role="listbox" id="year-dropdown">
                    {years.map((year) => (
                        <li key={year} role="option" onClick={() => handleOptionClick(year)}>
                            <label>{year}</label>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default YearSelect;
