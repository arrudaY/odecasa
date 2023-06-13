import styles from "./LocalProd.module.css";
import { useContext } from "react";
import { ProdContext } from "../../Contexts/ProdContext";

const LocalProd = () => {    
    const { id, produto } = useContext(ProdContext);

    function verificarAvalicao(){
        if((produto.qualificacao > 4.0) && (produto.qualificacao <= 5.0))
            return "Maravilhoso";
        else if((produto.qualificacao > 3.0) && (produto.qualificacao <= 4.0))
            return "Muito bom";
        else if((produto.qualificacao > 2.0) && (produto.qualificacao <= 3.0))
            return "Razoável";
        else if((produto.qualificacao > 1.0) && (produto.qualificacao <= 2.0))
            return "Regular";
        else if(produto.qualificacao <= 1.0)
            return "Ruim";
    }

    return (
        <div className={styles.localContainer}>
            <div className={styles.localCidade}>
                <p>{produto.cidade.nome}, {produto.cidade.pais}</p>
            </div>
            <div className={styles.localAvaliacao}>
                <div className={styles.localAvaliacao1}>
                    <p>{verificarAvalicao()}</p>
                    <div className="stars"> 
                        <span className={`star ${produto.qualificacao >= 1.0 ? "on" : produto.qualificacao == 0.0 ? "" : "half"}`}></span>
                        <span className={`star ${produto.qualificacao >= 2.0 ? "on" : produto.qualificacao <= 1.0 ? "" : "half"}`}></span>
                        <span className={`star ${produto.qualificacao >= 3.0 ? "on" : produto.qualificacao <= 2.0 ? "" : "half"}`}></span>
                        <span className={`star ${produto.qualificacao >= 4.0 ? "on" : produto.qualificacao <= 3.0 ? "" : "half"}`}></span>
                        <span className={`star ${produto.qualificacao == 5.0 ? "on" : produto.qualificacao <= 4.0 ? "" : "half"}`}></span>
                    </div>
                </div>
                <div className={styles.localAvaliacao2}>
                    {produto.qualificacao * 2.0}
                </div>
            </div>
            <div className={styles.localProdImagemContainer}>
                <img className={styles.localProdImagem} src={produto.imagemList[0].url} />
            </div>
        </div>
    );
};

export default LocalProd;