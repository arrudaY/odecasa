import styles from "./LocalReservaProd.module.css";
import { useContext } from "react";
import { ProdContext } from "../../Contexts/ProdContext";

const LocalReservaProd = () => {    
    const { id, produto } = useContext(ProdContext);

    return (
        <div className={styles.localContainer}>

            <img className={styles.localProdImagem} src={produto.imagemList[0].url} />
            
            <div className={styles.headerNomes}>
                <p className={styles.headerCategoria}>{produto.categoria.descricao}</p>
                <p className={styles.headerNome}>{produto.nome}</p>
            </div>
            
        </div>
    );
};

export default LocalReservaProd;


