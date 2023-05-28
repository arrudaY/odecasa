import styles from "./HeaderProd.module.css";
import { useContext } from "react";
import { ProdContext } from "../../Contexts/ProdContext";
import imgVoltar from "../../Data/btnVoltar.png"
import { useNavigate } from "react-router-dom";


const HeaderProd = () => {    
    const { id, produto } = useContext(ProdContext);
    const navigate = useNavigate();

    function voltar(){
        navigate("/");
    }
    
    return (
        <div className={styles.headerContainer}>
            <div className={styles.headerNomes}>
                <p className={styles.headerCategoria}>{produto.categoria}</p>
                <p className={styles.headerNome}>{produto.nome}</p>
            </div>
            <img onClick={voltar} className={styles.headerVoltar} src={imgVoltar}></img>
        </div>
    );
};

export default HeaderProd;