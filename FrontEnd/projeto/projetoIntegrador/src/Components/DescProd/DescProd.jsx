import styles from "./DescProd.module.css";
import { useContext } from "react";
import { ProdContext } from "../../Contexts/ProdContext";

const DescProd = () => {    
    const { id, produto } = useContext(ProdContext);

    return (
        <div className={styles.descContainer}>
            <h2>{produto.titulo}</h2>
            <p>{produto.descricao}</p>
        </div>
    );
};

export default DescProd;