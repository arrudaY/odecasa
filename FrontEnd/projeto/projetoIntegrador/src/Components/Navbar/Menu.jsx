import React, { useEffect, useRef, useState } from 'react';
import styles from './Menu.module.css';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext";


const Menu = () => {
  const { removeUserStorage, stsLogin, setEstadoLogin } = useContext(AuthContext); 
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const menuRef = useRef();

  useEffect( () => {

    let closeMenu = (e) => {
        if (!menuRef.current.contains(e.target)) {
          setIsOpen(false);
        }
    };

    document.addEventListener("mousedown", closeMenu);
    return () => document.removeEventListener("mousedown", closeMenu);
  
  }, []);

  function logout() {
    removeUserStorage();
    setEstadoLogin("Login");
    setIsOpen(prev => !prev);
    navigate("/");
  }

  return (
    <div ref={menuRef} className={isOpen ? styles.menuOpen : styles.menuClosed}>
        <nav className={styles.navItem}>
          <ul>
            <li>Reservas</li>
            <li>Favoritos</li>
            <li onClick={logout}>Sair</li>
          </ul>
        </nav>
    </div>
  )
}

export default Menu;