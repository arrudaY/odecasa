import Buscador from "../Buscador/Buscador";
import Categorias from "../Categorias/Categorias";
import CardBusca from "../CardBusca/CardBusca"
import styles from "./Body.module.css";
import api from "../../Services/api";
import { useEffect , useState} from "react";
import { useContext } from "react";
import { ProdContext } from "../../Contexts/ProdContext";

const Body = () => {
  const { produtos, setProdutos } = useContext(ProdContext);
  const [isLoading, setIsLoading] = useState(true);

  async function getProdutos(){
    try {
      const response = await api.get("/produto",
      { headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }});
      console.log("Body", response.data);
      setProdutos(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error)
    }
  }
  
  useEffect(() => {
    getProdutos();    
  }, []);

  if(isLoading){
    return(
      <div className={styles.bodyContainer}></div>
  )}

  return (
    <body>
      <div className={styles.bodyContainer}>

        <div className={styles.banner}>
          <div className={styles.bannerTxt}>
            <h2>Encontre sua próxima estadia</h2>
            <h3>De acomodações para toda a família a ambientes de luxo e muito mais</h3>
          </div>
        </div>

        <Buscador />

        <h2 className={styles.sectionTitle}>Buscar por tipo de acomodação</h2>

        <Categorias />

        <h2 className={styles.sectionTitle}>Recomendações</h2>
        <p className={styles.sectionDescription}>Explore acomodações incríveis</p>
        <div className={styles.bodyCards}>
          {produtos.map((item) => (
                <CardBusca key={item.id} produto={item} />
          ))}
        </div>
      </div>
    </body>
  );
};

export default Body;
