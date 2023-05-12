import styles from "./Footer.module.css";
import facebook from "../Data/no_image.png"
import linkedin from "../Data/no_image.png"
import twiter from "../Data/no_image.png"
import instagram from "../Data/no_image.png"

const Footer = () => {

  return (
      <footer>
        <div className={`back-color-4 ${styles.footerContainer}`}>
          <p className={styles.footerCopyright}>Copyright e ano</p>
          <div className={styles.footerRedes}>
            <img className={styles.footerRedesImg} src={facebook}/>
            <img className={styles.footerRedesImg} src={linkedin}/>
            <img className={styles.footerRedesImg} src={twiter}/>
            <img className={styles.footerRedesImg} src={instagram}/>
          </div>
        </div>
      </footer>
  );
};

export default Footer;