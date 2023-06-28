import styles from "./ImgProd.module.css";
import GaleriaProdutos from "../GaleriaProdutos/GaleriaProdutos";

const ImgProd = () => {    

    return (
        <div className={styles.imgContainer}>
            <GaleriaProdutos />
        </div>
    );
};

export default ImgProd;