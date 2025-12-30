import React, { useState } from "react";
import "./ContactUs.css";   // ⬅ مهم

function ContactUs({ orders }) {
  const [name, setName] = useState("");
  const [table, setTable] = useState("");

  const totalPrice = orders.reduce((sum, item) => sum + item.price, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !table) {
      alert("Please fill in all fields.");
      return;
    }
    alert("Order sent successfully!");
  };

  return (
    <div className="contact-wrapper">
      <div className="contact-card">

        <h1 className="contact-title">Order Summary</h1>

        <form onSubmit={handleSubmit} className="contact-form">

          <label>Customer Name</label>
          <input 
            type="text"
            placeholder="Enter customer name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Table Number</label>
          <input 
            type="number"
            min="1"
            placeholder="Enter table number"
            value={table}
            onChange={(e) => setTable(e.target.value)}
            required
          />

          <h2 className="items-title">Selected Items</h2>

          {orders.length === 0 ? (
            <p className="no-items">No items selected yet.</p>
          ) : (
            <ul className="items-list">
              {orders.map((item, index) => (
                <li key={index} className="item-row">
                  <span>{item.name}</span>
                  <span>${item.price}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="total-line">
            <span>Total:</span>
            <strong>${totalPrice}</strong>
          </div>

          <button type="submit" className="submit-btn">
            Submit Order
          </button>

        </form>
      </div>
    </div>
  );
}

export default ContactUs;