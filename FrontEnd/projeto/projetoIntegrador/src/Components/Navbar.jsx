import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import logo from "../Data/no_image.png"

const Navbar = () => {

  return (
      <nav>
        <div className={styles.navBarContainer}>
          <div className={styles.navBarLogo}>
            <img className={styles.navBarLogoImg} src={logo}/>
            <h2>Tralala</h2>
          </div>
          <div className={styles.navBarBotoes}>
            <button className={styles.navBarBtn}>Criar conta</button>
            <button className={styles.navBarBtn}>Iniciar sessão</button>
          </div>
        </div>
      </nav>
  );
};

export default Navbar;
