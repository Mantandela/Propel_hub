import React, { useState } from "react";
import "./CardMaker.css";

function CardMaker({ cards, onCreate, onDelete }) {

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [rooms, setRooms] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");


  const addProperty = (e) => {
    e.preventDefault();
    if ( !name.trim() || !image.trim() || !rooms || !price || !description.trim())
    {
      alert("Please fill in all fields.");
      return;
    }
    const newCard = {
      id: Date.now(),
      name,
      image,
      rooms: Number(rooms),
      price: Number(price),
      description
    };

    onCreate(newCard);

    setName("");
    setImage("");
    setRooms("");
    setPrice("");
    setDescription("");
  };

  return (

    <div className="cardmaker-wrapper">
      <div className="form-section">
        <h2 className="section-title"> Create Property Card</h2>
        <form className="form-grid" onSubmit={addProperty}>
          <div className="form-group">
            <label>Property Name</label>
            <input type="text" placeholder="Enter property name" value={name}onChange={(e)=> setName(e.target.value)}/>
          </div>
          <div className="form-group">
            <label>Image URL</label>
            <input type="text" placeholder="Enter image URL" value={image} onChange={(e)=> setImage(e.target.value)}/>
          </div>
          <div className="form-group">
            <label>Number of Rooms</label>
            <input type="number" placeholder="Enter rooms" value={rooms} onChange={(e)=> setRooms(e.target.value)}/>
          </div>
          <div className="form-group">
            <label>Price (KES)</label>
            <input type="number" placeholder="Enter price" value={price} onChange={(e)=> setPrice(e.target.value)}/>
          </div>
          <div className="form-group full-width">
            <label>Description</label>
            <textarea placeholder="Enter description" value={description} onChange={(e)=> setDescription(e.target.value)}/>
          </div>
          <button className="add-btn" type="submit">Add Card</button>
        </form>
      </div>
      <h2 className="section-title">Owner's Properties</h2>
      <div className="card-container">
        {cards.length === 0 ? 
        ( <p>No properties created yet.</p> )
        :
        (cards.map((card)=> 
          ( <div key={card.id} className="card">
              <h3>{card.name}</h3>
              <img src={card.image} alt={card.name} />
              <p>
                <strong>Rooms:</strong>
                {" "}
                {card.rooms}
              </p>
              <p>
                <strong>Price:</strong>
                {" "}
                KES {card.price.toFixed(2)}
              </p>
              <p className="description">{card.description}</p>
              <button className="delete-btn" onClick={() => onDelete(card.id)}>
                Delete
              </button>
            </div>
          )
        )
        )}

      </div>
    </div>
  );
}

export default CardMaker;
