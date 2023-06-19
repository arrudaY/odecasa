import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import Sidebar from './Sidebar';
import Menu from "./Menu";
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  const { removeUserStorage, stsLogin, setEstadoLogin } = useContext(AuthContext); 
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false);
  const [menu, setMenu] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const showSidebar = () => setSidebar(!sidebar);
  const showMenu = () => setMenu(!menu);

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
                <h2>ôdecasa</h2>
              </Link>
            </div>
            
            {windowWidth <= 414 ? (

              <button className={styles.sidebarBTN} onClick={showSidebar}><MenuIcon /></button>
        
            ) : (

              <>
              {stsLogin === "Login" ? (
                <div className={styles.navBarBotoes}>
                  <button onClick={cadastrarEncerrar}>
                    Criar conta
                  </button>

                  <button onClick={logar}>
                    Entrar
                  </button>
                </div>

                ) : (
                  <div className={styles.wcMessage}>
                  <span>Olá, Paula Furlan</span>

                  <button onClick={showMenu} className={styles.avatar}>PF</button>
                  </div>
                )}
              </>
            )}

        {sidebar && (
          <Sidebar className={styles.sidebar} active={setSidebar} />
        )}
        {menu && (
          <Menu className={styles.menu} active={setMenu} />
        )}
        </div>
      </nav>
  );
};

export default Navbar;
