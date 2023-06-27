import React, { useEffect, useRef, useState } from 'react';
import styles from './Menu.module.css';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import api from "../../Services/api";


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

  function validarUsuario(){
    setIsOpen(false);
    const token = localStorage.getItem("ctd_token");
    if(token != null)
        getUsuarios(token);
    else
        alert("Você precisa estar logado para acessar o Formulário de Cadastro de Produtos");
  }

  async function getUsuarios(token){
    try{
        const response = await api.get("/usuario", {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          }});
        const u = response.data;
        const email = localStorage.getItem("ctd_email");
        let ehADM = false;
        for(var i = 0; i < u.length; i++){
          if((u[i].username == email) && (u[i].funcao.nome == "ROLE_ADMIN")){
            {
              ehADM = true;
              navigate("/form-produto");
              break;
            }
          }
        }
        if(!ehADM)
          alert("Você não tem permissão para acessar essa página!");
    } catch (error) {
        console.log(error);
        alert("Você precisa estar logado para acessar o Formulário de Cadastro de Produtos");
    }
}

  return (
    <div ref={menuRef} className={isOpen ? styles.menuOpen : styles.menuClosed}>
        <nav className={styles.navItem}>
          <ul>
            <li>Reservas</li>
            <li>Favoritos</li>
            <li onClick={validarUsuario}>Criar Produto</li>
            <li onClick={logout}>Sair</li>
          </ul>
        </nav>
    </div>
  )
}

export default Menu;