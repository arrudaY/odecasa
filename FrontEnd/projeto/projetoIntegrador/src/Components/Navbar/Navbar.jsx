import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import logo from "../../Data/no_image.png"
import { Link, useNavigate } from "react-router-dom";
import Sidebar from './Sidebar';
import { FaBars } from 'react-icons/fa'

const Navbar = () => {
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const showSidebar = () => setSidebar(!sidebar)

  function cadastrar() {
    navigate("/cadastro");
  }

  function logar() {
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
              <Link className="link" to="/">
                <img className={styles.navBarLogoImg} src={logo}/>
              </Link>
              <Link className="link" to="/">
                <h2>Tralala</h2>
              </Link>
            </div>
            {windowWidth <= 414 ? (
          <FaBars className={styles.navBarIcon} onClick={showSidebar} />
        ) : (
          <div className={styles.navBarBotoes}>
            <button onClick={cadastrar} className={styles.navBarBtn}>
              Criar conta
            </button>
            <button onClick={logar} className={styles.navBarBtn}>
              Iniciar sessão
            </button>
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
