import styles from "./CaractProd.module.css";
import { useContext } from "react";
import { ProdContext } from "../../Contexts/ProdContext";

const CaractProd = () => {    
    const { id, produto } = useContext(ProdContext);

    return (
        <div className={styles.caractContainer}>
            Hello World Caracteristicas - ID: {id}
        </div>
    );
};

export default CaractProd;