import styles from "./Footer.module.css";
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';


const Footer = () => {

  return (
      <footer className="sticky-bottom">
        <div className={styles.footerContainer}>
          <p className={styles.footerCopyright}>© 2023 ôdecasa</p>
          <div className={styles.footerRedes}>
            <InstagramIcon        sx={{ color: "rgb(34,34,34)" }}/>
            <TwitterIcon          sx={{ color: "rgb(34,34,34)" }}/>
            <YouTubeIcon          sx={{ color: "rgb(34,34,34)" }}/>
            <FacebookRoundedIcon  sx={{ color: "rgb(34,34,34)" }}/>
          </div>
        </div>
      </footer>
  );
};

export default Footer;