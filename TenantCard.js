import React from "react";

function TenantCard({ tenantCards, onRemove }) {

  return (
    <div className="tenant-section">
      <h2 className="section-title">
        Tenant's Selected Properties
      </h2>
      <div className="card-container">
        {tenantCards.length === 0 ? (
          <p>You have not selected any properties yet.</p>
        )
        :
        (
          tenantCards.map((card) => (
            <div className="card" key={card.id}>
              <h3>{card.name}</h3>
              <img src={card.image} alt={card.name}/>
              <p>
                <strong>Rooms:</strong>
                {" "}
                {card.rooms}
              </p>
              <p>
                <strong>Price:</strong>{" "}
                KES {Number(card.price).toFixed(2)}
              </p>
              <p className="description">
                {card.description}
              </p>
              <button className="action-btn remove" onClick={() => onRemove(card.id)}>
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TenantCard;
