import styles from "./CardBusca.module.css";
import imagem from "../../Data/no_image.png"

const CardBusca = () => {

  return (
    <div className={styles.cardBuscaContainer}>
        <img src={imagem} className={styles.cardBuscaImg}/>
        <div className={styles.cardBuscaDetalhes}>
          <div className={styles.cardBuscaInfo}>
            <h3>Categoria</h3>
            <h2>Nome da acomodação</h2>
            <p>Local</p>
            <p className={styles.cardBuscaDescricao}>Descrição do lugar</p>
          </div>
            <button className={styles.cardBuscaBtn}>Ver mais detalhes</button>
        </div>
    </div>
  );
};

export default CardBusca;