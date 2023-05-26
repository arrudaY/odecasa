import styles from "./PoliticaProd.module.css";
import { useContext } from "react";
import { ProdContext } from "../../Contexts/ProdContext";

const PoliticaProd = () => {    
    const { id, produto } = useContext(ProdContext);

    return (
        <div className={styles.politicaContainer}>
            Hello World Politica - ID: {id}
        </div>
    );
};

export default PoliticaProd;