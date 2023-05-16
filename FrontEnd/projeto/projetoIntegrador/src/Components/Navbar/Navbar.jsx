import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import logo from "../../Data/no_image.png"
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext";

const Navbar = () => {
  const { removeUserStorage, stsLogin, setEstadoLogin } = useContext(AuthContext); 
  const navigate = useNavigate();

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
      <nav className="sticky-top">
        <div className={styles.navBarContainer}>
            <div className={styles.navBarLogo}>
              <Link className="link" to="/">
                <img className={styles.navBarLogoImg} src={logo}/>
              </Link>
              <Link className="link" to="/">
                <h2>Tralala</h2>
              </Link>
            </div>
          <div className={styles.navBarBotoes}>
            <button onClick={cadastrarEncerrar} className={styles.navBarBtn}>{stsLogin === "Login" ? "Criar conta" : "Finalizar sessao"}</button>
            <button onClick={logar} className={stsLogin === "Login" ? styles.navBarBtn : styles.navBarAvatar}>
              {stsLogin === "Login" ? "Iniciar sessão" : "Olá Fulana"}</button>
          </div>
        </div>
      </nav>
  );
};

export default Navbar;
