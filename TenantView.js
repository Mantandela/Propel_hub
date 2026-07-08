import React from 'react';

function TenantView({ cards, onAdd }) {
  return (
    <div className="tenant-section">
      <h2 className="section-title">Available Properties for Tenant:</h2>
      <div className="card-container">
        {cards.map((card, index) => (
          <div key={index} className="card">
            <h3>{card.name}</h3>
            <img src={card.image} alt={card.name} />
            <p><strong>Rooms:</strong> {card.rooms}</p>
            <p><strong>Price:</strong> KES {Number(card.price).toFixed(2)}</p>
            <p className="description">{card.description}</p>
            <button className="action-btn" onClick={() => onAdd(index)}>ADD</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TenantView;
