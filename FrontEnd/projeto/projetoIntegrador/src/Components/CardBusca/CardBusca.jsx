import styles from "./CardBusca.module.css";
import { useNavigate } from "react-router-dom";

const CardBusca = (props) => {
  const navigate = useNavigate();

  function acessar() {
    navigate(`/detalhes/${props.produto.id}`);
  }

  return (
    <div className={styles.cardBuscaContainer}>
        <img src={props.produto.imagemList[0].url} className={styles.cardBuscaImg}/>
        <div className={styles.cardBuscaDetalhes}>
          <div className={styles.cardBuscaInfo}>
            <h3>{props.produto.categoria.descricao}</h3>
            <h2>{props.produto.nome}</h2>
            <p>{props.produto.cidade.nome}, {props.produto.cidade.pais}</p>
            <p className={styles.cardBuscaDescricao}>{props.produto.descricao}</p>
          </div>
            <button onClick={acessar} className={styles.cardBuscaBtn}>Ver mais detalhes</button>
        </div>
    </div>
  );
};

export default CardBusca;