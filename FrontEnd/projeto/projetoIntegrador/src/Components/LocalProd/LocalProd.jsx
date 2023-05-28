import styles from "./LocalProd.module.css";
import { useContext } from "react";
import { ProdContext } from "../../Contexts/ProdContext";

const LocalProd = () => {    
    const { id, produto } = useContext(ProdContext);

    function verificarAvalicao(){
        if((produto.avaliacao > 4.0) && (produto.avaliacao <= 5.0))
            return "Maravilhoso";
        else if((produto.avaliacao > 3.0) && (produto.avaliacao <= 4.0))
            return "Muito bom";
        else if((produto.avaliacao > 2.0) && (produto.avaliacao <= 3.0))
            return "Razoável";
        else if((produto.avaliacao > 1.0) && (produto.avaliacao <= 2.0))
            return "Regular";
        else if(produto.avaliacao <= 1.0)
            return "Ruim";
    }

    return (
        <div className={styles.localContainer}>
            <div className={styles.localCidade}>
                <p>{produto.cidade}</p>
            </div>
            <div className={styles.localAvaliacao}>
                <div className={styles.localAvaliacao1}>
                    <p>{verificarAvalicao()}</p>
                    <div className="stars"> 
                        <span className={`star ${produto.avaliacao >= 1.0 ? "on" : produto.avaliacao == 0.0 ? "" : "half"}`}></span>
                        <span className={`star ${produto.avaliacao >= 2.0 ? "on" : produto.avaliacao <= 1.0 ? "" : "half"}`}></span>
                        <span className={`star ${produto.avaliacao >= 3.0 ? "on" : produto.avaliacao <= 2.0 ? "" : "half"}`}></span>
                        <span className={`star ${produto.avaliacao >= 4.0 ? "on" : produto.avaliacao <= 3.0 ? "" : "half"}`}></span>
                        <span className={`star ${produto.avaliacao == 5.0 ? "on" : produto.avaliacao <= 4.0 ? "" : "half"}`}></span>
                    </div>
                </div>
                <div className={styles.localAvaliacao2}>
                    {produto.avaliacao * 2.0}
                </div>
            </div>
        </div>
    );
};

export default LocalProd;