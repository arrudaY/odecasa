import styles from "./CardBusca.module.css";
import { useNavigate } from "react-router-dom";
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import StarRateIcon from '@mui/icons-material/StarRate';

const CardBusca = (props) => {
  const navigate = useNavigate();

  function acessar() {
    navigate(`/detalhes/${props.produto.id}`);
  }

  return (

    <div className={styles.cardBuscaContainer}>

      <img src={props.produto.imagemList[0].url} className={styles.cardBuscaImg}/>
      
      <div className={styles.cardDetalhes}>

        <div className={styles.cardHeader}>

          <div className={styles.cardSubHeader}>

            <h3>{props.produto.categoria.descricao}</h3>
            
            <div className={styles.cardAvaliacao}>

              <div className={styles.cardClassificacao}>
                <span>Excelente</span>
                <div className={styles.cardStarsRate}>
                  <StarRateIcon sx={{ fontSize: 12 }}/>
                  <StarRateIcon sx={{ fontSize: 12 }}/>
                  <StarRateIcon sx={{ fontSize: 12 }}/>
                  <StarRateIcon sx={{ fontSize: 12 }}/>
                  <StarRateIcon sx={{ fontSize: 12 }}/>
                </div>
              </div>

              <div className={styles.cardNota}>
                <span>9.0</span>
              </div>
            </div>
          </div>

          <div className={styles.cardTitulo}>
            <h2>{props.produto.nome}</h2>
          </div>

          <div className={styles.cardEndereco}>
            <PlaceOutlinedIcon />
            <p>{props.produto.cidade.nome}, {props.produto.cidade.pais}</p>
          </div>

        </div>

        <div className={styles.cardDescricao}>
          <p>{props.produto.descricao}</p>
        </div>

        <div className={styles.cardBtn}>
          <button onClick={acessar}>Ver mais</button>
        </div>
      </div>
    </div>
  );
};

export default CardBusca;