import styles from "./CategProds.module.css";
import api from "../../Services/api";
import { useEffect , useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import CardBusca from "../CardBusca/CardBusca"
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';

const CategProds = () => {    
  const { id } = useParams();
  const navigate = useNavigate();

  const [produtos, setProdutos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [nomeCat, setNomeCat] = useState("");
  const [bannerCat, setBannerCat] = useState("");

  function voltar(){
    navigate("/");
  }

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
      setBannerCat(response.data[0].categoria.urlImagem);
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
    <div>

      <div className={styles.banner}>
        <img className={styles.bannerImg} src={bannerCat}/>
      </div>

      <div className={styles.banner}>
        <div className={styles.bannerTop}>
          <button onClick={voltar} className={styles.backBtn}><KeyboardArrowLeftOutlinedIcon/></button>
          <h2>Categoria</h2>
        </div>
        <h1 className={styles.categTitulo}>{nomeCat}</h1>
      </div>

      <div className={styles.productCards}>
        {produtos.map((item) => (
          <CardBusca key={item.id} produto={item} />
        ))}
      </div>
    </div>
  );
};

export default CategProds;