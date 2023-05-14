import styles from "./Footer.module.css";
import facebook from "../../Data/facebook.png"
import linkedin from "../../Data/linkedin.png"
import twiter from "../../Data/twiter.png"
import instagram from "../../Data/instagram.png"

const Footer = () => {

  return (
      <footer className="sticky-bottom">
        <div className={styles.footerContainer}>
          <p className={styles.footerCopyright}>© 2023 - Digital Booking</p>
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