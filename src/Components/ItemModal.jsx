import React, { useEffect, useState } from "react";

export default function ItemModal({ open, onClose, onSubmit, initial, menu_type }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image_key, setImageKey] = useState("");

  useEffect(() => {
    if (initial) {
      setName(initial.name || "");
      setPrice(String(initial.price ?? ""));
      setImageKey(initial.image_key || "");
    } else {
      setName("");
      setPrice("");
      setImageKey("");
    }
  }, [initial, open]);

  if (!open) return null;

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim()) return alert("Name is required");
    if (price === "" || Number.isNaN(Number(price))) return alert("Price must be a number");

    onSubmit({
      menu_type,
      name: name.trim(),
      price: Number(price),
      image_key: image_key.trim()
    });
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999
      }}
      onClick={onClose}
    >
      <div
        style={{ background: "#fff", padding: 16, width: 380, borderRadius: 12 }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 style={{ marginTop: 0 }}>{initial ? "Edit Item" : "Create Item"}</h3>

        <form onSubmit={submit}>
          <div style={{ marginBottom: 10 }}>
            <label>Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} style={{ width: "100%", padding: 8 }} />
          </div>

          <div style={{ marginBottom: 10 }}>
            <label>Price</label>
            <input value={price} onChange={(e) => setPrice(e.target.value)} style={{ width: "100%", padding: 8 }} />
          </div>

          <div style={{ marginBottom: 10 }}>
            <label>Image Key ( latte / cake)</label>
            <input value={image_key} onChange={(e) => setImageKey(e.target.value)} style={{ width: "100%", padding: 8 }} />
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <button type="submit" style={{ flex: 1 }}>
              {initial ? "Save" : "Create"}
            </button>
            <button type="button" onClick={onClose} style={{ flex: 1 }}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
