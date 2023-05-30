import styles from "./ImgProd.module.css";
import { useContext } from "react";
import { ProdContext } from "../../Contexts/ProdContext";

const ImgProd = () => {    
    const { id, produto } = useContext(ProdContext);

    return (
        <div className={styles.imgContainer}>
            Hello World Img - ID: {id}
        </div>
    );
};

export default ImgProd;