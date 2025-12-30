import React, { useEffect, useState } from "react";
import { api, authHeaders } from "../api";
import ItemModal from "../Components/ItemModal";
import "./DessertMenu.css";

import cake from "../assets/cake.jpg";
import donut from "../assets/donut.jpg";
import brownie from "../assets/brownie.jpg";
import lotuscake from "../assets/lotuscake.jpg";
import crepe from "../assets/crepe.jpg";
import tiramisu from "../assets/tiramisu.jpg";
import cinnamonrolls from "../assets/cinnamonrolls.jpg";
import cupcake from "../assets/cupcake.jpg";
import pannacota from "../assets/pannacota.jpg";
import lemontart from "../assets/lemontart.jpg";

const imageMap = {
  cake,
  donut,
  brownie,
  lotuscake,
  crepe,
  tiramisu,
  cinnamonrolls,
  cupcake,
  pannacota,
  lemontart,
};

function DessertMenu({ addOrder }) {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState(0);
  const [total, setTotal] = useState(0);

  const [createOpen, setCreateOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const isAdmin = !!localStorage.getItem("token");

  const load = async () => {
    const res = await api.get("/items?menu_type=dessert");
    setItems(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const addToCart = (item) => {
    setCart((prev) => prev + 1);
    setTotal((prev) => prev + Number(item.price));
    addOrder?.({ name: item.name, price: Number(item.price) });
  };

  const createItem = async (data) => {
    await api.post("/items", data, authHeaders());
    setCreateOpen(false);
    await load();
  };

  const updateItem = async (data) => {
    await api.put(`/items/${editItem.id}`, data, authHeaders());
    setEditItem(null);
    await load();
  };

  const deleteItem = async (id) => {
    await api.delete(`/items/${id}`, authHeaders());
    await load();
  };

  return (
    <div className="menu-container">
      <h1 className="menu-title">Our Dessert Menu</h1>

      {/* ✅ تحت العنوان */}
      <div className="menu-cart under-title">
        🛒 Items: {cart} | Total: ${total}
      </div>

      {/* ✅ زر Create على اليمين */}
      {isAdmin && (
        <div className="menu-topbar">
          <button className="menu-create-btn" onClick={() => setCreateOpen(true)}>
            Create Items +
          </button>
        </div>
      )}

      <div className="menu-grid">
        {items.map((item) => (
          <div
            className="card"
            key={item.id}
            onClick={() => addToCart(item)}
            style={{ cursor: "pointer" }}
          >
            <img
              src={imageMap[item.image_key]}
              alt={item.name}
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
            <h3>{item.name}</h3>
            <p>${item.price}</p>

            {/* ✅ Edit/Delete بالنص */}
            {isAdmin && (
              <div className="card-actions">
                <button
                  className="card-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditItem(item);
                  }}
                >
                  Edit
                </button>

                <button
                  className="card-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteItem(item.id);
                  }}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Create Modal */}
      <ItemModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onSubmit={createItem}
        initial={null}
        menu_type="dessert"
      />

      {/* Edit Modal */}
      <ItemModal
        open={!!editItem}
        onClose={() => setEditItem(null)}
        onSubmit={updateItem}
        initial={editItem}
        menu_type="dessert"
      />
    </div>
  );
}

export default DessertMenu;
