import React from 'react';
import '../styles/CardDashboard.css';

function CardDashboard({ title, value, image }) {
    return (
        <div className="card-dashboard">
        <img src={image} alt={title} className="card-icon" />
        <div className="card-content">
            <h3>{title}</h3>
            <p>{value}</p>
        </div>
        </div>
    );
}

export default CardDashboard;
