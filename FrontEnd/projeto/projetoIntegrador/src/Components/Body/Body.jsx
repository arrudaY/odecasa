import Categorias from "../Categorias/Categorias";
import styles from "./Body.module.css";
import CardBusca from "../CardBusca/CardBusca"
import api from "../../Services/api";
import { useEffect , useState} from "react";
import { useContext } from "react";
import { ProdContext } from "../../Contexts/ProdContext";

const Body = () => {
  const { produtos, setProdutos, setProdutosBusca } = useContext(ProdContext);
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
      setProdutosBusca(response.data);
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
