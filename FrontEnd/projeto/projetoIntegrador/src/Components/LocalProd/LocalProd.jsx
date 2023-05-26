import styles from "./LocalProd.module.css";
import { useContext } from "react";
import { ProdContext } from "../../Contexts/ProdContext";

const LocalProd = () => {    
    const { id, produto } = useContext(ProdContext);

    return (
        <div className={styles.localContainer}>
            Hello World Localizacao - ID: {id}
        </div>
    );
};

export default LocalProd;