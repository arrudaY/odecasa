import styles from "./DescProd.module.css";
import { useContext } from "react";
import { ProdContext } from "../../Contexts/ProdContext";

const DescProd = () => {    
    const { id, produto } = useContext(ProdContext);

    return (
        <div className={styles.descContainer}>
            Hello World Descricao - ID: {id}
        </div>
    );
};

export default DescProd;