import styles from "./LocalReservaProd.module.css";
import { useContext } from "react";
import { ProdContext } from "../../Contexts/ProdContext";

const LocalReservaProd = () => {    
    const { id, produto } = useContext(ProdContext);

    return (
        <div className={styles.localContainer}>
            <div className={styles.localProdImagemContainer}>
                <img className={styles.localProdImagem} src={produto.imagemList[0].url} />
                <div className={styles.localReserva}>
                    <div className={styles.headerNomes}>
                        <p className={styles.headerCategoria}>{produto.categoria.descricao}</p>
                        <p className={styles.headerNome}>{produto.nome}</p>
                    </div>
                    <div className={styles.localAvaliacao1}>
                        <div className="stars"> 
                            <span className={`star ${produto.qualificacao >= 1.0 ? "on" : produto.qualificacao == 0.0 ? "" : "half"}`}></span>
                            <span className={`star ${produto.qualificacao >= 2.0 ? "on" : produto.qualificacao <= 1.0 ? "" : "half"}`}></span>
                            <span className={`star ${produto.qualificacao >= 3.0 ? "on" : produto.qualificacao <= 2.0 ? "" : "half"}`}></span>
                            <span className={`star ${produto.qualificacao >= 4.0 ? "on" : produto.qualificacao <= 3.0 ? "" : "half"}`}></span>
                            <span className={`star ${produto.qualificacao == 5.0 ? "on" : produto.qualificacao <= 4.0 ? "" : "half"}`}></span>
                        </div>
                    </div>
                </div>
            </div>  
        </div>
    );
};

export default LocalReservaProd;


