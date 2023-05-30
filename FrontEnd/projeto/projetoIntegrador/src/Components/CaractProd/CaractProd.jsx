import styles from "./CaractProd.module.css";
import { useContext } from "react";
import { ProdContext } from "../../Contexts/ProdContext";

const CaractProd = () => {    
    const { id, produto } = useContext(ProdContext);

    return (
        <div className={styles.caractContainer}>
            <h2>O que esta acomodação oferece?</h2>
            <div className="divisoria"></div>
            <div className={styles.caractCaracteristicas}>
                {produto.caracteristicas.map((item) => (
                <div className={styles.caractCaracteristica} key={item.id}>
                    <span className="material-symbols-rounded">{item.icone}</span>
                    <p>{item.nome}</p>
                </div>
                ))}
            </div>
        </div>
    );
};

export default CaractProd;