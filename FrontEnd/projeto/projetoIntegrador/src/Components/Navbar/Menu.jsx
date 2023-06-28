import React, { useEffect, useRef, useState } from 'react';
import styles from './Menu.module.css';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import AddHomeOutlinedIcon from '@mui/icons-material/AddHomeOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

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
            <li><EventAvailableOutlinedIcon/> Minhas reservas</li>
            <li><AddHomeOutlinedIcon/> Adicionar produto</li>
            <div className={styles.divisor}></div>
            <li onClick={logout}><LogoutOutlinedIcon/>Sair</li>
          </ul>
        </nav>
    </div>
  )
}

export default Menu;