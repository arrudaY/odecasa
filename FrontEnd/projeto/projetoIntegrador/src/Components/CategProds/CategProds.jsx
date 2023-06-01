import styles from "./CategProds.module.css";
import api from "../../Services/api";
import { useEffect , useState} from "react";
import { useParams } from "react-router-dom";
import CardBusca from "../CardBusca/CardBusca"

const CategProds = () => {    
    const { id } = useParams();
    const [produtos, setProdutos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [nomeCat, setNomeCat] = useState("");
  
    async function getProdutos(idAux){
        try {
          const response = await api.get("/produto/findByCategoria", { params: { id: idAux }},
          { headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          }});
          console.log(response.data);
          setProdutos(response.data);
          setNomeCat(response.data[0].categoria.descricao);
          setIsLoading(false);
        } catch (error) {
          console.log(error)
        }
    }
    
    useEffect(() => {
        if(id !== undefined)
          getProdutos(id);  
        else
            setIsLoading(true);  
    }, [id, isLoading]);
  
    if(isLoading){
      return(
        <div className={styles.categContainer}></div>
      );
    }

    return (
        <div className={produtos.length > 1 ? styles.categContainer2 : styles.categContainer1}>
            <h1 className={styles.categTitulo}>{nomeCat}</h1>
            <div className={styles.categCards}>
                {produtos.map((item) => (
                  <CardBusca key={item.id} produto={item} />
                ))}
            </div>
        </div>
    );
};

export default CategProds;