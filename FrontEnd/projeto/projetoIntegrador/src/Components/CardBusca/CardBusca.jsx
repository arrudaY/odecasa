import styles from "./CardBusca.module.css";
import imagem from "../../Data/no_image.png"
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ProdContext } from "../../Contexts/ProdContext";

const CardBusca = () => {
  const navigate = useNavigate();
  const { saveId, obterProduto, produto } = useContext(ProdContext);

  function acessar() {
    saveId(50);
    obterProduto();
    console.log(produto);
    navigate("/detalhes/:50");
  }

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
            <button onClick={acessar} className={styles.cardBuscaBtn}>Ver mais detalhes</button>
        </div>
    </div>
  );
};

export default CardBusca;