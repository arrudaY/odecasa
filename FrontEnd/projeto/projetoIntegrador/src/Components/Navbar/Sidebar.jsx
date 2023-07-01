import React, { useEffect, useRef, useState } from 'react'
import styles from './Sidebar.module.css'
import CloseIcon from '@mui/icons-material/Close';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import api from "../../Services/api";
import AddHomeOutlinedIcon from '@mui/icons-material/AddHomeOutlined';


const Sidebar = () => {
  const { removeUserStorage, stsLogin, setEstadoLogin, nome, sobreNome } = useContext(AuthContext); 
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const sidebarRef = useRef();

  useEffect( () => {

    let closeSidebar = (e) => {
        if (!sidebarRef.current.contains(e.target)) {
          setIsOpen(false);
        }
    };

    document.addEventListener("mousedown", closeSidebar);
    return () => document.removeEventListener("mousedown", closeSidebar);
  
  }, []);

  function cadastrarEncerrar() {
    if(stsLogin === "Login")
    {
      navigate("/cadastro");
      setIsOpen(prev => !prev);
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
      setIsOpen(prev => !prev);
      
  }

  const redirectReservas = () => {
    navigate("/minhas-reservas")
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
    <div ref={sidebarRef} className={isOpen ? styles.sidebarOpen : styles.sidebarClosed}>
      
      <button className={styles.closeBtn} onClick={ () => setIsOpen(prev => !prev)}>
        <CloseIcon />  
      </button>
  
      <div className={styles.menu}>

        <div className={stsLogin === "Login" ? styles.headline : styles.headlineLogged}>
          <span className={stsLogin === "Login" ? styles.secao : styles.avatar}>
            {stsLogin === "Login" ? "Entre para ver suas reservas, favoritos e ofertas" : nome.charAt(0) + sobreNome.charAt(0)}
          </span>
  
          <div className={styles.sidebarBotoes}>

            <button onClick={logar} className={stsLogin === "Login" ? styles.sidebarBtn : styles.navBarMensagem}>
              {stsLogin === "Login" ? "Entrar" : "Olá, " + nome + " " + sobreNome} </button>

            <button onClick={cadastrarEncerrar} className={styles.sidebarBtn}>
              {stsLogin === "Login" ? "" : <LogoutIcon />}
              {stsLogin === "Login" ? "Criar conta" : "Sair"}</button>

          </div>
        </div>
      
        <div className={styles.divisor}></div>

        <span className={styles.secao}>Minhas reservas</span>

        <nav className={styles.navItem}>
          <ul>
            <li onClick={redirectReservas}><EventAvailableOutlinedIcon /><span>Ver minhas reservas</span></li>
            <li onClick={validarUsuario}><AddHomeOutlinedIcon/><span>Adicionar produto</span></li>
          </ul>
        </nav>

        <div className={styles.divisor}></div>

        <span className={styles.secao}>Redes Sociais</span>

        <nav className={styles.navItem}>
          <ul>
            <li><InstagramIcon /><span>Instagram</span></li>
            <li><TwitterIcon /><span>Twitter</span></li>
            <li><YouTubeIcon /><span>YouTube</span></li>
            <li><FacebookRoundedIcon /><span>Facebook</span></li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Sidebar;