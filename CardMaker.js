import React, { useState } from 'react';
import './CardMaker.css';

function CardMaker(props) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [rooms, setRooms] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  function addProperty() {
    if (!name || !image || !rooms || !price || !description) {
      alert("Please fill in all fields.");
      return;
    }

    const newCard = { name, image, rooms: Number(rooms), price: Number(price), description };
    props.onCreate(newCard);

    setName(""); setImage(""); setRooms(""); setPrice(""); setDescription("");
  }

  return (
    <div className="cardmaker-wrapper">
      <div className="form-section">
        <h2 className="section-title">Create Card Entry</h2>
        <div className="form-grid">
          <div className="form-group">
            <label>Property Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter property name" />
          </div>
          <div className="form-group">
            <label>Image URL</label>
            <input type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Enter image URL" />
          </div>
          <div className="form-group">
            <label>Rooms</label>
            <input type="number" value={rooms} onChange={(e) => setRooms(e.target.value)} placeholder="Enter number of rooms" />
          </div>
          <div className="form-group">
            <label>Price (KES)</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Enter price" />
          </div>
          <div className="form-group full-width">
            <label>Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter property description" />
          </div>
        </div>
        <button className="add-btn" onClick={addProperty}>Add Card</button>
      </div>

      <h2 className="section-title">Owner's Properties</h2>
      <div className="card-container">
        {props.cards.map((card, index) => (
          <div key={index} className="card">
            <h3>{card.name}</h3>
            <img src={card.image} alt={card.name} />
            <p><strong>Rooms:</strong> {card.rooms}</p>
            <p><strong>Price:</strong> KES {Number(card.price).toFixed(2)}</p>
            <p className="description">{card.description}</p>
            <button className="delete-btn" onClick={() => props.onDelete(index)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardMaker;
