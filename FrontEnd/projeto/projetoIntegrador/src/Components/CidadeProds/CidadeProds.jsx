import styles from "./CidadeProds.module.css";
import api from "../../Services/api";
import { useEffect , useState} from "react";
import { useParams } from "react-router-dom";
import CardBusca from "../CardBusca/CardBusca"
import { useContext } from "react";
import { ProdContext } from "../../Contexts/ProdContext";

const CidadeProds = (props) => {    
    const { id } = useParams();
    const { produtos, produtosBusca } = useContext(ProdContext);
    const [isLoading, setIsLoading] = useState(true);
    const [nomeCidade, setNomeCidade] = useState("");
  
    async function getCidade(idAux){
        try {
          const response = await api.get("/cidade",
          { headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          }});
          const cidades = response.data;
          for(var i = 0; i < cidades.length; i++){
            if(cidades[i].id == idAux)
            {
              setNomeCidade(cidades[i].nome + ", " + cidades[i].pais);
              break;
            }
          }
          setIsLoading(false);
        } catch (error) {
          console.log(error)
        }
    }
    
    useEffect(() => {
        if(id != undefined)
          getCidade(id);  
        else
          setIsLoading(true);  
    }, [id]);
  
    if(isLoading){
      return(
        <div className={styles.cidadeContainer}></div>
      );
    }

    return (
        <div className={produtosBusca.length > 1 ? styles.cidadeContainer2 : styles.cidadeContainer1}>
            <h1 className={styles.cidadeTitulo}>{nomeCidade}</h1>
            <div className={styles.cidadeCards}>
                {produtosBusca.map((item) => (
                  <CardBusca key={item.id} produto={item} />
                ))}
            </div>
        </div>
    );
};

export default CidadeProds;