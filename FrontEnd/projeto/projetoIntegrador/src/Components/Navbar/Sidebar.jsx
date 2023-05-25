import React from 'react'
import styles from './Sidebar.module.css'
import { 
  FaTimes, 
  FaHouseUser, 
  FaUserCheck
} from 'react-icons/fa'
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext";

import SidebarItem from './SidebarItem'


const Sidebar = ({ active }) => {
  const { removeUserStorage, stsLogin, setEstadoLogin } = useContext(AuthContext); 
  const navigate = useNavigate();

  const closeSidebar = () => {
    active(false)
  }

  function cadastrarEncerrar() {
    if(stsLogin === "Login")
    {
      navigate("/cadastro");
    }
    else
    {
      removeUserStorage();
      setEstadoLogin("Login");
      navigate("/");
    }
  }

  function logar() {
    if(stsLogin === "Login")
      navigate("/login");
  }

  return (
    <div className={styles.container} sidebar={active}>
      <FaTimes onClick={closeSidebar} />  
      <div>
        <SidebarItem funcao={logar} Icon={FaHouseUser} Text={stsLogin === "Login" ? "Logar" : "Olá Fulana"} />
        <SidebarItem funcao={cadastrarEncerrar} Icon={FaUserCheck} Text={stsLogin === "Login" ? "Cadastrar" : "Finalizar sessao"} />
      </div>
    </div>
  )
}

export default Sidebar