import styles from "./Categorias.module.css";
import api from "../../Services/api";
import { useEffect , useState} from "react";
import { Link, useNavigate } from "react-router-dom";

const Categorias = () => {
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
                      <p>X acomodações</p>
                    </Link>
                </div>
            ))}
        </div>
    </div>
  );
};

export default Categorias;