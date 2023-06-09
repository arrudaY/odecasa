import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import logo from "../../Data/logo.png"
import avatar from "../../Data/3d_avatar_3.png"
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import Sidebar from './Sidebar';
import { FaBars } from 'react-icons/fa'

const Navbar = () => {
  const { removeUserStorage, stsLogin, setEstadoLogin } = useContext(AuthContext); 
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const showSidebar = () => setSidebar(!sidebar)

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

  
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };
  
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
      <nav className="sticky-top">
        <div className={styles.navBarContainer}>
            <div className={styles.navBarLogo}>
              <Link className={styles.link} to="/">
                {/* <img className={styles.navBarLogoImg} src={logo}/> */}
              </Link>
              <Link className={styles.link} to="/">
                <h2>ôdecasa</h2>
              </Link>
            </div>
            {windowWidth <= 414 ? (
          <FaBars className={styles.navBarIcon} onClick={showSidebar} />
        ) : (
          <div className={styles.navBarBotoes}>
            <button onClick={cadastrarEncerrar} className={styles.navBarBtn}>{stsLogin === "Login" ? "Criar conta" : "Finalizar sessao"}</button>
            {stsLogin === "Login" ? (
              <button onClick={logar} className={styles.navBarBtn}>Iniciar sessão</button>
            ) : (
              <div className={styles.navBarAvatar}>
                <p>Olá, Fulana</p>
                <img className={styles.navBarAvatarImg} src={avatar}></img>
              </div>
            )}
          </div>
        )}

        {sidebar && (
          <Sidebar className={styles.sidebar} active={setSidebar} />
        )}
        </div>
      </nav>
  );
};

export default Navbar;
