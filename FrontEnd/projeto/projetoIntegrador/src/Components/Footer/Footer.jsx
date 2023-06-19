import styles from "./Footer.module.css";
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';


const Footer = () => {

  return (
      <footer className="sticky-bottom">
        <div className={styles.footerContainer}>
          <p className={styles.footerCopyright}>© 2023 - Digital Booking</p>
          <div className={styles.footerRedes}>
            <InstagramIcon        sx={{ color: "black" }}/>
            <TwitterIcon          sx={{ color: "black" }}/>
            <YouTubeIcon          sx={{ color: "black" }}/>
            <FacebookRoundedIcon  sx={{ color: "black" }}/>
          </div>
        </div>
      </footer>
  );
};

export default Footer;