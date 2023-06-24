import styles from "./Categorias.module.css";
import api from "../../Services/api";
import { useEffect , useState, useRef} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ProdContext } from "../../Contexts/ProdContext";

import { register } from "swiper/element/bundle";
register();

const Categorias = () => {
  const { produtos } = useContext(ProdContext);
  const [categorias, setCategorias] = useState([]);
  const navigate = useNavigate();
  const swiperRef = useRef(null);

  async function getCategorias(){
    try {
      const response = await api.get("/categoria",
      { headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }});
      console.log(response.data);
      setCategorias(response.data);
    } catch (error) {
      console.log(error)
    }
  }

  function getNumProds(idCat){
    var numProds = 0;
    for(var i = 0; i < produtos.length; i++){
      if(produtos[i].categoria.id == idCat)
        numProds++;
    }
    return numProds;
  }
    
  useEffect(() => {
    getCategorias();
    const swiperContainer = swiperRef.current;
    const params = {
    
      pagination: {
        clickable: true},
      spaceBetween: 10,
      navigation: true,
      mousewheel: true,

      breakpoints: {
        360: {
          slidesPerView: 1.5,
        },
        470: {
          slidesPerView: 2.5,
        },
        650: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        1020:{
          slidesPerView: 4,
          spaceBetween: 10,
        },
        1450:{
          slidesPerView: 5,
          spaceBetween: 10,
        }
      },
      
      injectStyles: [
        `
          .swiper-button-next,
          .swiper-button-prev {
            background-color: white;
            padding:          9px 14px;
            border-radius:    100%;
            color:            black;
          }

          .swiper-button-next:hover,
          .swiper-button-prev:hover {
            box-shadow:       0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15);
            -webkit-transition: 0.2s;
            transition: 0.2s;
          }
         
        `,
      ],
    };
    
    Object.assign(swiperContainer, params);
    swiperContainer.initialize();
  }, []);

  return (
    <div className={styles.categoriasContainer}>
      <h1>Buscar por tipo de acomodação</h1>
      <p>De acomodações para toda a família a ambientes de luxo e muito mais</p>

      <swiper-container ref={swiperRef} init="false">
        {categorias.map((item) => (
          getNumProds(item.id) > 0 ? (
            <swiper-slide>
              <div key={item.id} className={styles.categoriasCard}>
                <Link to={`/categoria/${item.id}`} className={styles.link}>
                  <img className={styles.categoriasImg} src={item.urlImagem}/>
                  <h1>{item.descricao}</h1>
                  <p>{getNumProds(item.id) == 1 ? getNumProds(item.id) + " acomodação" : getNumProds(item.id) + " acomodações"}</p>
                </Link>
              </div>
            </swiper-slide>
            ) : (
              <swiper-slide>
                <div key={item.id} className={styles.categoriasCard}>
                  <img className={styles.categoriasImg} src={item.urlImagem}/>
                  <h1>{item.descricao}</h1>
                  <p>{getNumProds(item.id) == 1 ? getNumProds(item.id) + " acomodação" : getNumProds(item.id) + " acomodações"}</p>
                </div>
              </swiper-slide>
          )))}
      </swiper-container>

      
    </div>
  );
};

export default Categorias;