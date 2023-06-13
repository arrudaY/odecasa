import { Carousel } from 'react-carousel-minimal';
import { useState, useEffect, useContext } from 'react';
import styles from './GaleriaProdutos.module.css';
import { GrClose } from  'react-icons/gr';
import { useMediaQuery } from 'react-responsive';
import { ProdContext } from '../../Contexts/ProdContext';
import api from "../../Services/api";

const GaleriaProdutos = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [images, setImages] = useState([]);
  const { id, produto } = useContext(ProdContext);
  const [mostrarImagens, setMostrarImagens] = useState(false);

  const handleDetailsClick = () => {
    setShowDetails(true);
  };

  const handleCloseClick = () => {
    setShowDetails(false);
    setMostrarImagens(true);
  };

  const isMobileOrTablet = useMediaQuery({ maxWidth: 719 });

  async function obterImagemProduto(idAux) {
    try {
      const response = await api.get("/produto/findById", { params: { id: idAux } },
      { headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }});

      const produto = {
        id: response.data.id,
        imagemList: response.data.imagemList,
        titulo: response.data.titulo,
      }
      setImages(produto.imagemList);
      console.log(produto);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if(id >= 0) obterImagemProduto(id)
  }, [id])

  const captionStyle = {
    fontSize: '2em',
    fontWeight: 'bold',
  }
  const slideNumberStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
  }

  return (
    <div className={styles.gallery}>
      {showDetails || isMobileOrTablet ? 
      (<div style={{ textAlign: "center" }}>
        <div style={{
          padding: "0 20px"
        }}>
          <Carousel
            data={images.map((image, index) => ({
              image: image.url,
              caption: image.caption,
            }))}
            time={3000}
            width="850px"
            height="600px"
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
              maxHeight: "700px",
              margin: "40px auto",
            }}
          />
          {isMobileOrTablet ? "" : <div className={styles.closeButton} onClick={handleCloseClick}>
            <GrClose />
          </div>}
        </div>
      </div>
    ) : 
    <div className={styles.imageGrid}>
      {produto.imagemList.slice(0, 5).map((item, index) => (
        <img key={item.id} src={item.url} alt={produto.titulo} className={index == 0 ? styles.mainImage : ""}/>
      ))}
      {mostrarImagens &&
        produto.imagemList.slice(5).map((item, index) => (
          <img key={item.id} src={item.url} alt={produto.titulo} />
        ))}
      {produto.imagemList.length > 5 && !mostrarImagens && (
        <div className={styles.detailsLink} onClick={handleDetailsClick}>
          Ver mais
        </div>
      )}
    </div>
    }
  </div>
)}

export default GaleriaProdutos;
