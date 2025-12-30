import React, { useState } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

export default function AdminLogin({ onAuthChange }) {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const isAdmin = !!localStorage.getItem("token");

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      if (isRegister) {
        await api.post("/admin/register", { username, email, password });
        setMsg("✅ Registered! Now login.");
        setIsRegister(false);
        return;
      }

      const res = await api.post("/admin/login", { username, password });
      localStorage.setItem("token", res.data.token);
      onAuthChange?.();
      navigate("/menu");
    } catch (err) {
      const m =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Something went wrong";
      setMsg(m);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    onAuthChange?.();
    setMsg("✅ Logged out");
  };

  return (
    <div className="admin-page">
      <div className="admin-card">
        <h2 className="admin-title">{isRegister ? "Admin Register" : "Admin Login"}</h2>

        {isAdmin ? (
          <>
            <button className="admin-btn admin-btn-primary" onClick={logout}>
              Logout
            </button>
            {msg && <div className="admin-msg">{msg}</div>}
          </>
        ) : (
          <form onSubmit={submit}>
            <label className="admin-label">Username</label>
            <input
              className="admin-input"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            {isRegister && (
              <>
                <label className="admin-label">Email</label>
                <input
                  className="admin-input"
                  placeholder="email (optional)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </>
            )}

            <label className="admin-label">Password</label>
            <input
              className="admin-input"
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="admin-btn admin-btn-primary" type="submit">
              {isRegister ? "Register" : "Login"}
            </button>

            <button
              className="admin-btn admin-btn-secondary"
              type="button"
              onClick={() => setIsRegister((x) => !x)}
            >
              {isRegister ? "Go to Login" : "Go to Register"}
            </button>

            {msg && <div className="admin-msg">{msg}</div>}
          </form>
        )}
      </div>
    </div>
  );
}
