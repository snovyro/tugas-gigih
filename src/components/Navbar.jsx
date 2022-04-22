import React from "react";
import { useState, useContext } from "react";
import ContextToken from "../context/ContextToken";
import "./CSS/Navbar.css";

export default function Navbar() {
  const { token, setToken } = useContext(ContextToken);
  const [ tracks, setTracks] = useState([]);

  const logoutSpotify = () => {
    setToken("");
    setTracks([]);
    window.localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="nav">
      <p>create - a - playlist // SpotiVai</p>
      <div className="logout-btn">
        <button onClick={logoutSpotify}>
          Logout
        </button>
      </div>
    </div>
  );
}
