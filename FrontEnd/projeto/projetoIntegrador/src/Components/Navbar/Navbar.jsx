import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import Sidebar from './Sidebar';
import Menu from "./Menu";
import MenuIcon from '@mui/icons-material/Menu';
import api from "../../Services/api";

const Navbar = () => {
  const { removeUserStorage, stsLogin, setEstadoLogin, saveIdUsuario, nome, sobreNome, setNome, setSobreNome } = useContext(AuthContext); 
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [sidebar, setSidebar] = useState(false);
  const [menu, setMenu] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [ idUsuario, setIdUsuario ] = useState(0);
  const [ isAdmin, setIsAdmin ] = useState(false);
  const [navbar, setNavbar] = useState(false);


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

  function changeNavbarColor() {
    if (window.scrollY >= 40) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  }

  window.addEventListener('scroll', changeNavbarColor);

  
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  async function getUsuarioLogado(token){
    try{
        const response = await api.get("/usuario", {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          }});
        const u = response.data;
        console.log("users", u)
        const email = localStorage.getItem("ctd_email");
        for(var i = 0; i < u.length; i++){
          if(u[i].username == email){
            saveIdUsuario(u[i].id)
            setNome(u[i].nome);
            setSobreNome(u[i].sobreNome);
            setIsLoading(false);
            setIdUsuario(u[i].id);
            if(u[i].funcao.nome == "ROLE_ADMIN") {
              setIsAdmin(true);
            } else {
              setIsAdmin(false);
            }
            break;
          }
        }
      } catch (error) {
        console.log(error);
        alert("Erro ao tentar carregar dados do Usuário");
        if(stsLogin == "Logout"){
          setEstadoLogin("Login");
          removeUserStorage();
        }
      }
    }
  
  useEffect(() => {    
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
    
  }, []);
  
  useEffect(() => {
    const token = localStorage.getItem("ctd_token");
  
    if ((token != null) && (stsLogin == "Logout")) {
      getUsuarioLogado(token);
    } else if (stsLogin == "Login"){
      setIsLoading(false);
    }

  }, [idUsuario, stsLogin, isLoading, isAdmin]);

  if(isLoading) {
    return (<div></div>)
  }

  return (
      <nav className="sticky-top">
        <div className={navbar ? styles.navbarContainerActive : styles.navbarContainer}>
            <div className={styles.navBarLogo}>
              <Link className={styles.link} to="/">
                <h2>ôdecasa</h2>
              </Link>
            </div>
            
            {windowWidth <= 414 ? (

              <button className={styles.sidebarBTN} onClick={showSidebar}><MenuIcon /></button>
        
            ) : (

              <>
              {stsLogin == "Login" ? (
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
                  {isAdmin && <span className={styles.adminLabel}>Administrador</span>}
                  <span>Olá, {nome} {sobreNome}</span>
                  <button onClick={showMenu} className={styles.avatar}>{nome.charAt(0)}{sobreNome.charAt(0)}</button>
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
