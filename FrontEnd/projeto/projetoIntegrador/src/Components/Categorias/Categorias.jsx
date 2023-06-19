import styles from "./Categorias.module.css";
import api from "../../Services/api";
import { useEffect , useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ProdContext } from "../../Contexts/ProdContext";

const Categorias = () => {
    const { produtos } = useContext(ProdContext);
    const [categorias, setCategorias] = useState([]);
    const navigate = useNavigate();

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
    }, []);

  return (
    <div className={styles.categoriasContainer}>
        <h2>Buscar por tipo de acomodação</h2>
        <div className={styles.categoriasCards}>
            {categorias.map((item) => (
                <div key={item.id} className={styles.categoriasCard}>
                    <Link to={`/categoria/${item.id}`}>
                      <img className={styles.categoriasImg} src={item.urlImagem}/>
                      <h2>{item.descricao}</h2>
                      <p>{getNumProds(item.id) == 1 ? getNumProds(item.id) + " acomodação" : getNumProds(item.id) + " acomodações"}</p>
                    </Link>
                </div>
            ))}
        </div>
    </div>
  );
};

export default Categorias;