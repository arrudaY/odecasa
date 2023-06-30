import { Carousel } from 'react-carousel-minimal';
import { useState, useEffect, useContext } from 'react';
import styles from './GaleriaProdutos.module.css';
import { GrClose } from  'react-icons/gr';
import { useMediaQuery } from 'react-responsive';
import { ProdContext } from '../../Contexts/ProdContext';

const GaleriaProdutos = () => {
  const [showDetails, setShowDetails] = useState(false);
  const { produto } = useContext(ProdContext);
  const [mostrarImagens, setMostrarImagens] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  const handleDetailsClick = () => {
    setShowDetails(true);
    setMostrarImagens(false);
  };

  const handleCloseClick = () => {
    setShowDetails(false);
    setMostrarImagens(true);
  };

  const isMobileOrTablet = useMediaQuery({ maxWidth: 719 });

  const captionStyle = {
    fontSize: '2em',
    fontWeight: 'bold',
  }
  const slideNumberStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={styles.gallery}>
      {(showDetails || (windowWidth <= 719)) ? 
      (<div className={styles.carousel}>
        <div style={{
          padding: "0 20px"
        }}>
          <Carousel
            data={produto.imagemList.map((image, index) => ({
              image: image.url,
              caption: image.titulo,
            }))}
            time={3000}
            width="100%"
            captionStyle={captionStyle}
            radius="10px"
            slideNumber={true}
            slideNumberStyle={slideNumberStyle}
            captionPosition="bottom"
            automatic={true}
            dots={true}
            pauseIconColor="white"
            pauseIconSize="40px"
            slideBackgroundColor="darkgrey"
            slideImageFit="cover"
            thumbnails={true}
            thumbnailWidth="100px"
            style={{
              textAlign: "center",
              maxWidth: "850px",
              maxHeight: "600px",
              margin: "40px auto",
            }}
          />
          {(windowWidth > 719) && <div className={styles.closeButton} onClick={handleCloseClick}>
            <GrClose />
          </div>}
        </div>
      </div>
    ) : (
    <div className={styles.imageGrid}>
      {produto.imagemList.slice(0, 5).map((item, index) => (
        <img key={item.id} src={item.url} alt={produto.titulo} className={index == 0 ? styles.mainImage : ""}/>
      ))}
      {/*mostrarImagens &&
        produto.imagemList.slice(5).map((item, index) => (
          <img key={item.id} src={item.url} alt={produto.titulo} />
        ))*/}
      {produto.imagemList.length > 5 && mostrarImagens && (
        <div className={styles.detailsLink} onClick={handleDetailsClick}>
          Ver mais
        </div>
      )}
    </div>
    )}
  </div>
)}

export default GaleriaProdutos;
