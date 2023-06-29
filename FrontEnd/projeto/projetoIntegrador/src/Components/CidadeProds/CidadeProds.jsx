import styles from "./CidadeProds.module.css";
import api from "../../Services/api";
import { useEffect , useState} from "react";
import { useParams } from "react-router-dom";
import CardBusca from "../CardBusca/CardBusca"

const CidadeProds = () => {    
    const { id } = useParams();
    const [produtos, setProdutos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [nomeCidade, setNomeCidade] = useState("");
  
    async function getProdutos(idAux){
        try {
          const response = await api.get("/produto/findByCidade", { params: { id: idAux }},
          { headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          }});
          console.log(response.data);
          setProdutos(response.data);
          setNomeCidade(response.data[0].cidade.nome + ", " + response.data[0].cidade.pais);
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
        <div className={styles.cidadeContainer}></div>
      );
    }

    return (
        <div className={produtos.length > 1 ? styles.cidadeContainer2 : styles.cidadeContainer1}>
          <div className={styles.cidadeTitulo}>
            <h1>Explore</h1> 
            <h1>{nomeCidade}</h1>
          </div>
            <div className={styles.cidadeCards}>
                {produtos.map((item) => (
                  <CardBusca key={item.id} produto={item} />
                ))}
            </div>
        </div>
    );
};

export default CidadeProds;