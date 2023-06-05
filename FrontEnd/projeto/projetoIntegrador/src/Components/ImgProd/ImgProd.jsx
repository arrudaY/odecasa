import styles from "./ImgProd.module.css";
import { useContext } from "react";
import { ProdContext } from "../../Contexts/ProdContext";
import  GaleriaProdutos from "../GaleriaProdutos/GaleriaProdutos";

const ImgProd = () => {    
    const { id, produto } = useContext(ProdContext);

    return (
        <div className={styles.imgContainer}>
            <GaleriaProdutos id={id} produto={produto} />
        </div>
    );
};

export default ImgProd;